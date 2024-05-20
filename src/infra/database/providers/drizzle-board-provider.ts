import { db } from "../../../main/drizzle";
import type { IBoardDatabaseProvider } from "../../contracts/board-database-provider";

export class DrizzleBoardProvider implements IBoardDatabaseProvider {
  public async loadAllBoards(): Promise<any[]> {
    const result = await db.query.board.findMany({
      with: {
        cards: true
      }
    })
    return result
  }
  public async createBoard(board: any): Promise<any> {
    const result = await db.insert(board).values({
      name: board.name,
      cards: []
    })
    return result
  }
}
