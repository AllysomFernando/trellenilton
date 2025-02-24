import type { Column } from "../../entities/Column";

export type Board = {
	id: string;
	name: string;
	deleted: boolean;
	createdAt: string;
	column: Column[];
};
