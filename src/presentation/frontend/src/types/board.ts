import type { DraggableId, DraggableLocation } from "@hello-pangea/dnd";

export type Id = string;

export interface Board {
	id: string;
	name: string;
	deleted: boolean;
	column: Column[];
}

export interface Column {
	id: Id;
	name: string;
	quotes: Quote[];
}
export interface UpdateBoardData {
	name: string;
}
export interface DeleteBoardData {
	deleted: boolean;
}
export interface AuthorColors {
	soft: string;
	hard: string;
}
export interface Author {
	id: Id;
	name: string;
	url: string;
	colors: AuthorColors;
}
export interface Quote {
	id: string;
	content: string;
}
export interface Dragging {
	id: DraggableId;
	location: DraggableLocation;
}
export interface QuoteMap {
	[key: string]: Quote[];
}
export interface Task {
	id: Id;
	content: string;
}
