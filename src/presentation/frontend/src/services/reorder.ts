import type { DraggableLocation } from "@hello-pangea/dnd";
import type { QuoteMap } from "@/types/board";

export const reorder = (
	list: any[],
	startIndex: number,
	endIndex: number
): any[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

interface ReorderQuoteMapArgs {
	quoteMap: QuoteMap;
	source: DraggableLocation;
	destination: DraggableLocation;
}

export const reorderQuoteMap = ({
	quoteMap,
	source,
	destination,
}: ReorderQuoteMapArgs): {
	quoteMap: QuoteMap;
} => {
	const current = [...quoteMap[source.droppableId]];
	const next = [...quoteMap[destination.droppableId]];
	const target = current[source.index];

	// moving to the same list
	if (source.droppableId === destination.droppableId) {
		const reordered = reorder(current, source.index, destination.index);
		const result: QuoteMap = {
			...quoteMap,
			[source.droppableId]: reordered,
		};
		return {
			quoteMap: result,
		};
	}
	current.splice(source.index, 1);
	next.splice(destination.index, 0, target);

	const result: QuoteMap = {
		...quoteMap,
		[source.droppableId]: current,
		[destination.droppableId]: next,
	};

	return {
		quoteMap: result,
	};
};
