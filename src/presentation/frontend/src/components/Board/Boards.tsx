import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { colors } from "@atlaskit/theme";
import Column from "@/components/Column/Column";
import { fetchCards, createCard } from "@/services/cardService";
import { Board, Card, NewCard } from "@/types/board";
import { Column as ColumnType } from "@/types/column";
const Container = styled.div`
	background-color: ${colors.B100};
	min-height: 100vh;
	min-width: 100vw;
	display: inline-flex;
`;

interface Props {
	initialBoard: Board;
}

const BoardComponent: React.FC<Props> = ({ initialBoard }) => {
	const [columns, setColumns] = useState<ColumnType[]>(initialBoard.column);
	const [cards, setCards] = useState<Card[]>([]);

	const fetchAllCards = async () => {
		const fetchedCards = await fetchCards();
		setCards(fetchedCards);
	};

	useEffect(() => {
		fetchAllCards();
	}, []);

	const handleAddCard = async (columnId: string, newCard: NewCard) => {
		if (!newCard.idPriority || !newCard.idStatus || !newCard.title) {
			console.error("Missing required fields");
			return;
		}
		try {
			const response = await createCard({
				...newCard,
				idCategory: columnId,
				idPriority: newCard.idPriority,
				idStatus: newCard.idStatus,
				createdAt: new Date().toISOString(),
				deleted: false,
			});
			setCards((prevCards) => [...prevCards, response]);
		} catch (error) {
			console.error("Failed to create card", error);
		}
	};

	return (
		<DragDropContext
			onDragEnd={(result) => {
				
			}}
		>
			<Droppable droppableId="board" type="COLUMN" direction="horizontal">
				{(provided) => (
					<Container ref={provided.innerRef} {...provided.droppableProps}>
						{columns.map((column, index) => (
							<Column
								key={column.id}
								columnId={column.id}
								title={column.name}
								quotes={cards.filter((card) => card.idCategory === column.id)} // Filtrar os cartões pela coluna correspondente
								index={index}
								onAddCard={handleAddCard}
								onEdit={() => {
									// Lógica de edição aqui
								}}
								onDelete={() => {
									// Lógica de exclusão aqui
								}}
							/>
						))}
						{provided.placeholder}
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default BoardComponent;
