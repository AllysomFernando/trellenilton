import type { IColumnRepository } from "../../domain/contracts/column-repository";
import type { Column } from "../../domain/entities/column";
import type { IColumnDatabseProvider } from "../contracts/column-database-provider";

export class ColumnRepository implements IColumnRepository {
    constructor(private readonly db: IColumnDatabseProvider) { }
    public async createColumn(column: Column): Promise<Column> {
        const data = await this.db.createColumn(column);
        return {
            id: data.id,
            name: data.name,
            cards: column.cards.map((card: any) => ({
                id: card.id,
                name: card.name,
                description: card.description,
                deadLine: new Date(card.deadLine),
            }),
                deleted: data.deleted,
        };
    }
}