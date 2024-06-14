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
	public async updateBoard(board: Board, id: string): Promise<Board> {
		const data = await this.db.updateBoard(board, id);
		return {
			id: data.id,
			name: data.name,
			column: data.column.map((column: any) => ({
				id: column.id,
				idCard: column.idCard,
				description: column.description,
				delete: column.delete,
			})),
			deleted: board.deleted,
			createdAt: board.createdAt,
		};
	}
}
