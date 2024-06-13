import type { Board } from "../../domain/entities/board";

export interface IBoardDatabaseProvider {
	loadAllBoards: () => Promise<any[]>;
	createBoard: (board: Board) => Promise<any>;
	deleteBoard: (id: string) => Promise<void>;
	updateBoard: (board: Board, id: string) => Promise<any>;
}
