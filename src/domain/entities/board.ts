import type { Column } from "./column";

export type Board = {
	id: string;
	name: string;
	deleted: boolean;
	createdAt: string;
	column: Column[];
};
