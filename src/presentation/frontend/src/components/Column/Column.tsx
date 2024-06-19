import React, { Component, ReactElement } from "react";
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
import type { Quote } from "@/types/board";

const Container = styled.div`
	margin: ${grid}px;
	display: flex;
	flex-direction: column;
	background-color: ${colors.N30};
	border-radius: ${borderRadius}px;
	width: 272px;
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
	title: string;
	quotes: Quote[];
	index: number;
	isScrollable?: boolean;
	isCombineEnabled?: boolean;
	useClone?: boolean;
	onAddCard: (columnId: string, card: Quote) => void;
}

export default class Column extends Component<Props> {
	render(): ReactElement {
		const { title, quotes, index } = this.props;

		// Ensure quotes is an array
		const quotesList = Array.isArray(quotes) ? quotes : [];

		return (
			<Draggable draggableId={title} index={index}>
				{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
					<Container ref={provided.innerRef} {...provided.draggableProps}>
						<Header isDragging={snapshot.isDragging}>
							<Title
								{...provided.dragHandleProps}
								aria-label={`${title} quote list`}
							>
								{title}
							</Title>
						</Header>
						<Droppable droppableId={title} type="QUOTE">
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
						<AddCardForm columnId={title} onAddCard={this.props.onAddCard} />
					</Container>
				)}
			</Draggable>
		);
	}
}
