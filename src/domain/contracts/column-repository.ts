import type { Column } from "../entities/column";

export interface IColumnRepository{
    createColumn: (column: Column) => Promise<Column>
}