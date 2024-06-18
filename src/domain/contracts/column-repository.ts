import type { Column } from "../entities/column";

export interface IColumnRepository {
	createColumn: (
		name: string,
		deleted: boolean,
		description: string
	) => Promise<Column>;
	loadAllColumns: () => Promise<Column[]>;
	deleteColumn: (id: string) => Promise<void>;
	updateColumn: (id: string, name: string) => Promise<Column>;
	loadSpecificColumn: (id: string) => Promise<Column>;
}
