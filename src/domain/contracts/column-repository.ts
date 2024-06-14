import type { Column } from "../entities/column";

export interface IColumnRepository {
    createColumn: (deleted: boolean) => Promise<Column>
}