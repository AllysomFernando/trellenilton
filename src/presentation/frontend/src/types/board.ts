import type { DraggableId, DraggableLocation } from "@hello-pangea/dnd";
import { Column } from "./column";

export type Id = string;

export interface Board {
	id: string;
	name: string;
	deleted: boolean;
	column: Column[];
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
	deleted: boolean;
}
export interface Dragging {
	id: DraggableId;
	location: DraggableLocation;
}
export interface QuoteMap {
	[key: string]: {
		title: string;
		quotes: Quote[];
		deleted: boolean;
	};
}
export interface Task {
	id: Id;
	content: string;
}
