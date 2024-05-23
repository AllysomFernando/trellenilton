import type { Board } from "../../domain/entities/board";

export interface IBoardDatabaseProvider {
  loadAllBoards: () => Promise<any[]>;
  createBoard: (board: Board) => Promise<any>;
  deleteBoard: (board: any, id: string) => Promise<any>;
}
