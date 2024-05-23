import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import type { IBoardDatabaseProvider } from "../../contracts/board-database-provider";
import { card, priority } from "../models";

export class DrizzleBoardProvider implements IBoardDatabaseProvider {
  public async loadAllBoards(): Promise<any[]> {
    const result = await db.query.board.findMany({
      with: {
        cards: true,
      },
    });
    return result;
  }
  public async createBoard(board: any): Promise<any> {
    const result = await db.insert(board).values({
      name: board.name,
      cards: [],
    });
    return result;
  }
  public async deleteBoard(board: any, id: string): Promise<any> {
    const result = await db
      .update(board)
      .set({ deleted: "1" })
      .where(eq(board.id, id))
      .execute();
    return result;
  }


  public async createCard(_: any): Promise<any> {
    const priorityReference = await db.query.priority.findFirst({
      where: eq(priority.id, _.priorityid)
    })
    if(!priorityReference) {
      throw new Error("Priority not found")
    }
    await db.insert(card).values({
      idPriority: priorityReference.id,
      //all references in the db for the card need this changes
    })
  }
}
