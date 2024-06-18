import React, { Component, ReactElement } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { colors } from "@atlaskit/theme";
import type {
	DropResult,
	DraggableLocation,
	DroppableProvided,
} from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { QuoteMap, Quote } from "@/types/board";
import { reorderQuoteMap, reorder } from "@/services/reorder";
import Column from "@/components/Column/Column";
import AddColumnForm from "@/components/Column/AddColumnForm";
import { grid } from "@/utils/constants";

interface ParentContainerProps {
	height: string;
}

const ParentContainer = styled.div<ParentContainerProps>`
	height: ${({ height }) => height};
	overflow-x: hidden;
	overflow-y: auto;
`;

const Container = styled.div`
	background-color: ${colors.B100};
	min-height: 100vh;
	display: flex;
	padding: ${grid}px;
	gap: ${grid}px;
	align-items: flex-start; /* align items at the top */
`;

interface Props {
	initial: QuoteMap;
	withScrollableColumns?: boolean;
	isCombineEnabled?: boolean;
	containerHeight?: string;
	useClone?: boolean;
	applyGlobalStyles?: boolean;
}

interface State {
	columns: QuoteMap;
	ordered: string[];
}

export class Board extends Component<Props, State> {
	static defaultProps = {
		isCombineEnabled: false,
		applyGlobalStyles: true,
	};

	state: State = {
		columns: this.props.initial,
		ordered: Object.keys(this.props.initial),
	};

	onDragEnd = (result: DropResult): void => {
		if (result.combine) {
			if (result.type === "COLUMN") {
				const shallow: string[] = [...this.state.ordered];
				shallow.splice(result.source.index, 1);
				this.setState({ ordered: shallow });
				return;
			}

			const column: Quote[] = this.state.columns[result.source.droppableId];
			const withQuoteRemoved: Quote[] = [...column];
			withQuoteRemoved.splice(result.source.index, 1);
			const columns: QuoteMap = {
				...this.state.columns,
				[result.source.droppableId]: withQuoteRemoved,
			};
			this.setState({ columns });
			return;
		}

		if (!result.destination) {
			return;
		}

		const source: DraggableLocation = result.source;
		const destination: DraggableLocation = result.destination;

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		if (result.type === "COLUMN") {
			const ordered: string[] = reorder(
				this.state.ordered,
				source.index,
				destination.index
			);

			this.setState({
				ordered,
			});

			return;
		}

		const data = reorderQuoteMap({
			quoteMap: this.state.columns,
			source,
			destination,
		});

		this.setState({
			columns: data.quoteMap,
		});
	};

	handleAddColumn = (title: string) => {
		this.setState((prevState) => {
			const newColumn: Quote[] = [];
			const newColumns = {
				...prevState.columns,
				[title]: newColumn,
			};
			const newOrdered = [...prevState.ordered, title];
			return {
				columns: newColumns,
				ordered: newOrdered,
			};
		});
	};

	handleAddCard = (columnId: string, card: Quote) => {
		this.setState((prevState) => {
			const newColumns = {
				...prevState.columns,
				[columnId]: [...prevState.columns[columnId], card],
			};
			return {
				columns: newColumns,
			};
		});
	};

	render(): ReactElement {
		const columns: QuoteMap = this.state.columns;
		const ordered: string[] = this.state.ordered;
		const {
			containerHeight,
			useClone,
			isCombineEnabled,
			withScrollableColumns,
			applyGlobalStyles,
		} = this.props;

		const board = (
			<Droppable
				droppableId="board"
				type="COLUMN"
				direction="horizontal"
				ignoreContainerClipping={Boolean(containerHeight)}
				isCombineEnabled={isCombineEnabled}
			>
				{(provided: DroppableProvided) => (
					<Container ref={provided.innerRef} {...provided.droppableProps}>
						{ordered.map((key: string, index: number) => (
							<Column
								key={key}
								index={index}
								title={key}
								quotes={columns[key]}
								isScrollable={withScrollableColumns}
								isCombineEnabled={isCombineEnabled}
								useClone={useClone}
								onAddCard={this.handleAddCard}
							/>
						))}
						{provided.placeholder}
						<div className="m-2 p-2 bg-gray-300 rounded">
							<AddColumnForm onAddColumn={this.handleAddColumn} />
						</div>
					</Container>
				)}
			</Droppable>
		);

		return (
			<React.Fragment>
				<DragDropContext onDragEnd={this.onDragEnd}>
					{containerHeight ? (
						<ParentContainer height={containerHeight}>{board}</ParentContainer>
					) : (
						board
					)}
				</DragDropContext>
				{applyGlobalStyles ? (
					<Global
						styles={css`
							body {
								background: ${colors.B200};
							}
						`}
					/>
				) : null}
			</React.Fragment>
		);
	}
}
