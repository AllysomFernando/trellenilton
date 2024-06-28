import type { Board } from "../../domain/entities/board";

export interface IBoardDatabaseProvider {
	loadAllBoards: () => Promise<any[]>;
	loadSpecificBoard: (id: string) => Promise<Board>;
	createBoard: (
		name: string,
		deleted: boolean,
		createdAt: string
	) => Promise<Board>;
	deleteBoard: (id: string) => Promise<void>;
	updateBoard: (id: string, name: string) => Promise<Board>;
}
