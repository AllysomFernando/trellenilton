import React, { useState, useCallback, useEffect } from "react";
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
import EditColumnModal from "../modal/NewColumnModal";

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
	priorities: string[];
	categories: string[];
	statuses: string[];
}

const Board: React.FC<Props> = ({
	initial,
	withScrollableColumns = false,
	isCombineEnabled = false,
	containerHeight,
	useClone = false,
	applyGlobalStyles = true,
	autoScrollerOptions,
	priorities,
	categories,
	statuses,
}) => {
	const [columns, setColumns] = useState<QuoteMap>(
		initial.column.reduce((acc, col) => {
			if (!col.deleted) {
				acc[col.id] = {
					title: col.name,
					quotes: col.quotes.filter((quote) => !quote.deleted),
					deleted: col.deleted,
				};
			}
			return acc;
		}, {} as QuoteMap)
	);

	const [ordered, setOrdered] = useState<string[]>(
		initial.column.filter((col) => !col.deleted).map((col) => col.id)
	);

	useEffect(() => {
		setColumns(
			initial.column.reduce((acc, col) => {
				if (!col.deleted) {
					acc[col.id] = {
						title: col.name,
						quotes: col.quotes.filter((quote) => !quote.deleted),
						deleted: col.deleted,
					};
				}
				return acc;
			}, {} as QuoteMap)
		);

		setOrdered(
			initial.column.filter((col) => !col.deleted).map((col) => col.id)
		);
	}, [initial.column]);

	const [isEditingColumn, setIsEditingColumn] = useState<boolean>(false);
	const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
	const [editingColumnTitle, setEditingColumnTitle] = useState<string>("");

	const handleColumnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditingColumnTitle(e.target.value);
	};

	const handleColumnTitleSave = () => {
		if (editingColumnId && editingColumnTitle.trim() !== "") {
			setColumns((prevColumns) => ({
				...prevColumns,
				[editingColumnId]: {
					...prevColumns[editingColumnId],
					title: editingColumnTitle,
				},
			}));
			setIsEditingColumn(false);
			setEditingColumnId(null);
			setEditingColumnTitle("");
		}
	};

	const handleColumnTitleCancel = () => {
		setIsEditingColumn(false);
		setEditingColumnId(null);
		setEditingColumnTitle("");
	};

	const handleAddColumn = (title: string) => {
		const newColumnId = `column-${Date.now()}`;
		setColumns((prevColumns) => ({
			...prevColumns,
			[newColumnId]: {
				title,
				quotes: [],
				deleted: false,
			},
		}));
		setOrdered((prevOrdered) => [...prevOrdered, newColumnId]);
	};

	const handleEditColumn = useCallback(
		(columnId: string, columnTitle: string) => {
			setIsEditingColumn(true);
			setEditingColumnId(columnId);
			setEditingColumnTitle(columnTitle);
		},
		[]
	);

	const handleDeleteColumn = (columnId: string) => {
		setColumns((prevColumns) => {
			const newColumns = { ...prevColumns };
			newColumns[columnId].deleted = true;
			return newColumns;
		});

		setOrdered((prevOrdered) => prevOrdered.filter((id) => id !== columnId));
	};

	const onDragEnd = (result: DropResult): void => {
		if (result.combine) {
			if (result.type === "COLUMN") {
				const shallow: string[] = [...ordered];
				shallow.splice(result.source.index, 1);
				setOrdered(shallow);
				return;
			}

			const column: Quote[] = columns[result.source.droppableId].quotes;
			const withQuoteRemoved: Quote[] = [...column];
			withQuoteRemoved.splice(result.source.index, 1);
			setColumns((prevColumns) => ({
				...prevColumns,
				[result.source.droppableId]: {
					...prevColumns[result.source.droppableId],
					quotes: withQuoteRemoved,
				},
			}));
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
			const newOrder: string[] = reorder(
				ordered,
				source.index,
				destination.index
			);

			setOrdered(newOrder);
			return;
		}

		const data = reorderQuoteMap({
			quoteMap: columns,
			source,
			destination,
		});

		setColumns(data.quoteMap);
	};

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
					{ordered
						.filter((key) => !columns[key].deleted)
						.map((key: string, index: number) => (
							<Column
								key={key}
								index={index}
								columnId={key}
								title={columns[key].title}
								quotes={columns[key]?.quotes || []}
								isScrollable={withScrollableColumns}
								isCombineEnabled={isCombineEnabled}
								useClone={useClone}
								onAddCard={(columnId, card) => {
									// Logic to add card to column
								}}
								onEdit={() => handleEditColumn(key, columns[key].title)}
								onDelete={() => handleDeleteColumn(key)}
							/>
						))}

					{provided.placeholder}
					<AddColumnForm onAddColumn={handleAddColumn} boardId={initial.id} />
				</Container>
			)}
		</Droppable>
	);

	return (
		<React.Fragment>
			<DragDropContext
				onDragEnd={onDragEnd}
				autoScrollerOptions={autoScrollerOptions}
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

			<EditColumnModal
				isOpen={isEditingColumn}
				onClose={handleColumnTitleCancel}
				onSubmit={handleColumnTitleSave}
				columnId={editingColumnId || ""}
				initialTitle={editingColumnTitle}
			/>
		</React.Fragment>
	);
};

export default Board;
