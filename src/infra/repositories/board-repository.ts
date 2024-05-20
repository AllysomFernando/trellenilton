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
      cards: board.cards.map((card: any) => ({
        id: card.id,
        name: card.name,
        description: card.description,
        deadLine: new Date(card.deadLine),
      })),
      deleted: board.deleted,
    }));
  }
  public async createBoard(board: Board): Promise<Board> {
    const data = await this.db.createBoard(board);
    return {
      id: data.id,
      name: data.name,
      cards: data.cards.map((card: any) => ({
        id: card.id,
        name: card.name,
        description: card.description,
        deadLine: new Date(card.deadLine),
      })),
      deleted: board.deleted,
    };
  }
  public async deleteBoard(board: Board, id: string): Promise<void> {
    const data = await this.db.deleteBoard(board, id);
    return data;
  }
}
