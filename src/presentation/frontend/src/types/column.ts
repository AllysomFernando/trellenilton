import { Quote } from "./board";

export type Id = string;

export interface Column {
	id: Id;
	name: string;
	quotes: Quote[];
	deleted: boolean;
}
export interface DeleteColumnData {
	deleted: boolean;
}
