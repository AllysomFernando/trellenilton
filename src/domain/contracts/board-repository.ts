import type { Board } from "../entities/board";

export interface IBoardRepository {
  loadAllBoards: () => Promise<Board[]>;
  createBoard: (board: Board) => Promise<Board>;
  deleteBoard: (id: string) => Promise<void>;
}
