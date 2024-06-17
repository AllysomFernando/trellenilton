import type { IBoardRepository } from "../../domain/contracts/board-repository";
import type { Board } from "../../domain/entities/board";
import type { IBoardDatabaseProvider } from "../contracts/board-database-provider";

export class BoardRepository implements IBoardRepository {
	constructor(private readonly db: IBoardDatabaseProvider) {}

	public async loadAllBoards(): Promise<Board[]> {
		const data = await this.db.loadAllBoards();
		return data.map((board) => ({
			id: board.id,
			name: board.name,
			deleted: board.deleted,
			column: board.column,
			createdAt: board.createdAt,
		}));
	}
	public async createBoard(name: string, deleted: boolean, createdAt: string): Promise<Board> {
		const data = await this.db.createBoard(name, deleted, createdAt);
		return {
			id: data.id,
			name: data.name,
			column: [],
			deleted: deleted,
			createdAt: new Date().toString(),
		};
	}
	public async deleteBoard(id: string): Promise<void> {
		const data = await this.db.deleteBoard(id);
		return data;
	}
	public async updateBoard(id: string, name: string): Promise<Board> {
		const data = await this.db.updateBoard(id, name);
		return {
			id: data.id,
			name: data.name,
			column: data.column,
			deleted: data.deleted,
			createdAt: data.createdAt,
		};
	}
}
