import type { Board } from "../entities/board";

export interface IBoardRepository {
	loadAllBoards: () => Promise<Board[]>;
	loadSpecificBoard: (id: string) => Promise<Board>;
	createBoard: (
		name: string,
		deleted: boolean,
		createdAt: string
	) => Promise<Board>;
	deleteBoard: (id: string) => Promise<void>;
	updateBoard: (id: string, name: string) => Promise<Board>;
}
