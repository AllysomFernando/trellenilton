import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import type {
	DraggableProvided,
	DraggableStateSnapshot,
	DroppableProvided,
} from "@hello-pangea/dnd";
import { grid, borderRadius } from "@/utils/constants";
import Title from "@/components/primatives/title";
import AddCardForm from "@/components/Card/CardForm";
import type { Quote, NewCard } from "@/types/board";
import { Menu } from "@headlessui/react";
import { deleteColumn } from "@/services/columnService";
import NewCardModal from "@/components/modal/NewCardModal";

const Container = styled.div`
	margin: ${grid}px;
	display: flex;
	flex-direction: column;
	background-color: ${colors.N30};
	border-radius: ${borderRadius}px;
	width: 272px;
	height: 100%;
	position: relative;
`;

interface HeaderProps {
	isDragging: boolean;
}

const Header = styled.div<HeaderProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	border-top-left-radius: ${borderRadius}px;
	color: ${colors.N800};
	border-top-right-radius: ${borderRadius}px;
	background-color: ${({ isDragging }) =>
		isDragging ? colors.G50 : colors.N30};
	transition: background-color 0.2s ease;
	position: relative;

	&:hover {
		background-color: ${colors.G50};
	}
`;

const QuoteListContainer = styled.div`
	padding: ${grid}px;
	background-color: white;
	min-height: 100px;
`;

interface Props {
	columnId: string;
	title: string;
	quotes: Quote[];
	index: number;
	isScrollable?: boolean;
	isCombineEnabled?: boolean;
	useClone?: boolean;
	onAddCard: (columnId: string, card: Quote) => void;
	onEdit: () => void;
	onDelete: () => void;
}

const Column: React.FC<Props> = ({
	columnId,
	title,
	quotes,
	index,
	isScrollable,
	isCombineEnabled,
	useClone,
	onAddCard,
	onEdit,
	onDelete,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAddCard = (newCard: NewCard) => {
		const newQuote: Quote = {
			id: `quote-${Date.now()}`,
			content: newCard.title,
			deleted: false,
		};
		onAddCard(columnId, newQuote);
		setIsModalOpen(false);
	};

	const handleDelete = async () => {
		try {
			await deleteColumn(columnId, { deleted: true });
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const quotesList = Array.isArray(quotes) ? quotes : [];

	return (
		<>
			<Draggable draggableId={columnId} index={index}>
				{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
					<Container ref={provided.innerRef} {...provided.draggableProps}>
						<Header isDragging={snapshot.isDragging}>
							<Title
								{...provided.dragHandleProps}
								aria-label={`${title} quote list`}
							>
								{title}
							</Title>
							<Menu as="div" className="absolute top-2 right-2">
								<Menu.Button className="text-gray-500 hover:text-gray-700">
									•••
								</Menu.Button>
								<Menu.Items className="absolute right-0 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={onEdit}
												className={`${
													active ? "bg-gray-100" : ""
												} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
											>
												Editar
											</button>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={handleDelete}
												className={`${
													active ? "bg-gray-100" : ""
												} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
											>
												Excluir
											</button>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={() => setIsModalOpen(true)}
												className={`${
													active ? "bg-gray-100" : ""
												} block px-4 py-2 text-sm text-gray-700 w-full text-left`}
											>
												Adicionar Cartão
											</button>
										)}
									</Menu.Item>
								</Menu.Items>
							</Menu>
						</Header>
						<Droppable droppableId={columnId} type="QUOTE">
							{(provided: DroppableProvided, snapshot) => (
								<QuoteListContainer
									ref={provided.innerRef}
									{...provided.droppableProps}
									style={{
										backgroundColor: snapshot.isDraggingOver
											? colors.G50
											: "white",
									}}
								>
									{quotesList.map((quote, index) => (
										<Draggable
											key={quote.id}
											draggableId={quote.id}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														userSelect: "none",
														padding: 16,
														margin: "0 0 8px 0",
														minHeight: "50px",
														backgroundColor: snapshot.isDragging
															? "#263B4A"
															: "#456C86",
														color: "white",
														...provided.draggableProps.style,
													}}
												>
													{quote.content}
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</QuoteListContainer>
							)}
						</Droppable>
						<button
							className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
							onClick={() => setIsModalOpen(true)}
						>
							Adicionar Cartão
						</button>
					</Container>
				)}
			</Draggable>
			<NewCardModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleAddCard}
			/>
		</>
	);
};

export default Column;
