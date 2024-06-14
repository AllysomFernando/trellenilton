import type { Column } from "@models/column";

export type Board = {
	id: string;
	name: string;
	deleted: boolean;
	createdAt: string;
	column?: Column[];
};
