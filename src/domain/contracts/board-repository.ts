import type { Board } from "../entities/board";

export interface IBoardRepository {
	loadAllBoards: () => Promise<Board[]>;
	createBoard: (name: string) => Promise<Board>;
	deleteBoard: (id: string) => Promise<void>;
	updateBoard: (board: Board, id: string) => Promise<Board>;
}
