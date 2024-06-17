import type { IColumnRepository } from "../../domain/contracts/column-repository";
import type { Column } from "../../domain/entities/column";
import type { IColumnDatabseProvider } from "../contracts/column-database-provider";

export class ColumnRepository implements IColumnRepository {
	constructor(private readonly db: IColumnDatabseProvider) {}
	public async createColumn(
		name: string,
		deleted: boolean,
		description: string
	): Promise<Column> {
		const data = await this.db.createColumn(name, deleted, description);
		return {
			id: data.id,
			name: data.name,
			ordernation: data.ordernation,
			cards: data.cards,
			deleted: data.deleted,
			description: data.description,
		};
	}
	public async loadAllColumns(): Promise<Column[]> {
		const data = await this.db.loadAllColumns();
		return data.map((column) => ({
			id: column.id,
			name: column.name,
			ordernation: column.ordernation,
			cards: column.cards,
			deleted: column.deleted,
			description: column.description,
		}));
	}
	public async deleteColumn(id: string): Promise<void> {
		const data = await this.db.deleteColumn(id);
		return data;
	}
    public async updateColumn(id: string, name: string): Promise<Column> {
        const data = await this.db.updateColumn(id, name);
        return {
            id: data.id,
			name: data.name,
            ordernation: data.ordernation,
            cards: data.cards,
            deleted: data.deleted,
            description: data.description,
        };
    }
}
