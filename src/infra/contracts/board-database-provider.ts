import type { Board } from "../../domain/entities/board";

export interface IBoardDatabaseProvider {
	loadAllBoards: () => Promise<any[]>;
	createBoard: (name: string, deleted: boolean, createdAt: string) => Promise<Board>;
	deleteBoard: (id: string) => Promise<void>;
	updateBoard: (board: Board, id: string) => Promise<any>;
}
