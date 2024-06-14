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
            cards: data.cards.map((card: any) => ({
                id: card.id,
                name: card.name,
                description: card.description,
                deadLine: new Date(card.deadLine),
            })),
                deleted: data.deleted,
        }
    }
}