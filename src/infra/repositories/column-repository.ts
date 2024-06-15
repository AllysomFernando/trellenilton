import type { IColumnRepository } from "../../domain/contracts/column-repository";
import type { Column } from "../../domain/entities/column";
import type { IColumnDatabseProvider } from "../contracts/column-database-provider";

export class ColumnRepository implements IColumnRepository {
    constructor(private readonly db: IColumnDatabseProvider) { }
    public async createColumn(deleted: boolean): Promise<Column> {
        const data = await this.db.createColumn(deleted);
        return {
            id: data.id,
            ordernation: data.ordernation,
            cards: [],
            deleted: data.deleted,
        }
    }
    public async loadAllColumns(): Promise<Column[]> {
        const data = await this.db.loadAllColumns();
        return data.map((column) => ({
            id: column.id,
            ordernation: column.ordernation,
            cards: column.cards,
            deleted: column.deleted,
        }));
    }
}