import type { Board } from "../entities/board";

export interface IBoardRepository {
  loadAllBoards: () => Promise<Board[]>
}