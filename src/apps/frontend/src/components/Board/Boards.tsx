import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { colors } from "@atlaskit/theme";
import Column from "@/components/Column/Column";
import { fetchCards, createCard } from "@/services/cardService";
import { createColumn } from "@/services/columnService";
import { Board, Card, NewCard } from "@/types/board";
import { Column as ColumnType } from "@/types/column";
import AddColumnForm from "@/components/Column/AddColumnForm";

const Container = styled.div`
	background-color: ${colors.B100};
	min-height: 100vh;
	min-width: 100vw;
	display: inline-flex;
`;

interface Props {
	initialBoard: Board | undefined;
}

const BoardComponent: React.FC<Props> = ({ initialBoard }) => {
	const [columns, setColumns] = useState<ColumnType[]>(
		initialBoard?.column || []
	);
	const [cards, setCards] = useState<Card[]>([]);

	const fetchAllCards = async () => {
		try {
			const fetchedCards = await fetchCards();
			console.log("Fetched Cards:", fetchedCards);
			setCards(fetchedCards || []);
		} catch (error) {
			console.error("Failed to fetch cards", error);
			setCards([]);
		}
	};

	useEffect(() => {
		if (initialBoard) {
			fetchAllCards();
		}
	}, [initialBoard]);

	const handleAddCard = async (columnId: string, newCard: NewCard) => {
		if (!newCard.idPriority || !newCard.idStatus || !newCard.title) {
			console.error("Missing required fields");
			return;
		}
		try {
			const response = await createCard(newCard, columnId);
			setCards((prevCards) => [...prevCards, response]);
		} catch (error) {
			console.error("Failed to create card", error);
		}
	};

	const handleAddColumn = async (name: string) => {
		try {
			const response = await createColumn({
				name,
				description: "",
				idBoard: initialBoard?.id || "",
			});
			setColumns((prevColumns) => [...prevColumns, response]);
		} catch (error) {
			console.error("Failed to create column", error);
		}
	};

	const reorderCards = (
		list: Card[],
		startIndex: number,
		endIndex: number
	): Card[] => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result: DropResult): void => {
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const startColumn = columns.find(
			(column) => column.id === source.droppableId
		);
		const endColumn = columns.find(
			(column) => column.id === destination.droppableId
		);

		if (startColumn && endColumn) {
			const startCards = cards.filter(
				(card) => card.idCategory === startColumn.id && !card.deleted
			);
			const endCards = cards.filter(
				(card) => card.idCategory === endColumn.id && !card.deleted
			);

			if (startColumn === endColumn) {
				const reorderedCards = reorderCards(
					startCards,
					source.index,
					destination.index
				);
				setCards((prevCards) =>
					prevCards.map(
						(card) => reorderedCards.find((c) => c.id === card.id) || card
					)
				);
			} else {
				const startReordered = Array.from(startCards);
				const [movedCard] = startReordered.splice(source.index, 1);
				const endReordered = Array.from(endCards);
				endReordered.splice(destination.index, 0, movedCard);

				setCards((prevCards) =>
					prevCards.map(
						(card) =>
							startReordered.find((c) => c.id === card.id) ||
							endReordered.find((c) => c.id === card.id) ||
							card
					)
				);
			}
		}
	};

	if (!initialBoard) {
		return <div>Loading...</div>;
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="board" type="COLUMN" direction="horizontal">
				{(provided) => (
					<Container ref={provided.innerRef} {...provided.droppableProps}>
						{columns.map((column, index) => {
							const columnCards = cards.filter(
								(card) => card.idCategory === column.id && !card.deleted
							);
							console.log("Cards for column", column.id, columnCards);
							return (
								<Column
									key={column.id}
									columnId={column.id}
									title={column.name}
									quotes={columnCards}
									index={index}
									onAddCard={handleAddCard}
									onEdit={() => {
										// Lógica de edição aqui
									}}
									onDelete={() => {
										// Lógica de exclusão aqui
									}}
								/>
							);
						})}
						{provided.placeholder}
						<AddColumnForm
							onAddColumn={handleAddColumn}
							boardId={initialBoard.id}
						/>
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default BoardComponent;
