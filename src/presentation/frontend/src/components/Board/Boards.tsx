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
import type { QuoteMap, Quote, Board as BoardType } from "@/types/board";
import { PartialAutoScrollerOptions } from "@/components/auto-scroller/fluid-scroller/auto-scroller-options-types";
import { reorderQuoteMap, reorder } from "@/services/reorder";
import Column from "@/components/Column/Column";
import AddColumnForm from "../Column/AddColumnForm";

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
	/* like display:flex but will allow bleeding over the window width */
	min-width: 100vw;
	display: inline-flex;
`;

interface Props {
	initial: BoardType;
	withScrollableColumns?: boolean;
	isCombineEnabled?: boolean;
	containerHeight?: string;
	useClone?: boolean;
	applyGlobalStyles?: boolean;
	autoScrollerOptions?: PartialAutoScrollerOptions;
}

interface State {
	columns: QuoteMap;
	ordered: string[];
}

export class Board extends Component<Props, State> {
	/* eslint-disable react/sort-comp */
	static defaultProps = {
		isCombineEnabled: false,
		applyGlobalStyles: true,
	};

	state: State = {
		columns: this.props.initial.column.reduce((acc, col) => {
			acc[col.name] = {
				title: col.name,
				quotes: col.quotes,
			};
			return acc;
		}, {} as QuoteMap),
		ordered: this.props.initial.column.map((col) => col.name),
	};
	handleAddColumn = (title: string) => {
		const newColumnId = `column-${Date.now()}`;
		this.setState((prevState) => ({
			columns: {
				...prevState.columns,
				[newColumnId]: {
					title,
					quotes: [],
				},
			},
			ordered: [...prevState.ordered, newColumnId],
		}));
	};
	onDragEnd = (result: DropResult): void => {
		if (result.combine) {
			if (result.type === "COLUMN") {
				const shallow: string[] = [...this.state.ordered];
				shallow.splice(result.source.index, 1);
				this.setState({ ordered: shallow });
				return;
			}

			const column: Quote[] =
				this.state.columns[result.source.droppableId].quotes;
			const withQuoteRemoved: Quote[] = [...column];
			withQuoteRemoved.splice(result.source.index, 1);
			const columns: QuoteMap = {
				...this.state.columns,
				[result.source.droppableId]: {
					...this.state.columns[result.source.droppableId],
					quotes: withQuoteRemoved,
				},
			};
			this.setState({ columns });
			return;
		}

		// dropped nowhere
		if (!result.destination) {
			return;
		}

		const source: DraggableLocation = result.source;
		const destination: DraggableLocation = result.destination;

		// did not move anywhere - can bail early
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		// reordering column
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
								quotes={columns[key]?.quotes || []}
								isScrollable={withScrollableColumns}
								isCombineEnabled={isCombineEnabled}
								useClone={useClone}
								onAddCard={(columnId, card) => {
									// Logic to add card to column
								}}
							/>
						))}
						{provided.placeholder}
						<AddColumnForm
							onAddColumn={this.handleAddColumn}
							boardId={this.props.initial.id}
						/>
					</Container>
				)}
			</Droppable>
		);

		return (
			<React.Fragment>
				<DragDropContext
					onDragEnd={this.onDragEnd}
					autoScrollerOptions={this.props.autoScrollerOptions}
				>
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
