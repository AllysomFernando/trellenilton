import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import type { IBoardDatabaseProvider } from "../../contracts/board-database-provider";
import { card, category, priority, status } from "../models";
import type { Card } from "../../../domain/entities/card";

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


  public async createCard(dto: Card): Promise<Card> {
    const priorityReference = await db.query.priority.findFirst({
      where: eq(priority.id, dto.idPriority)
    })
    if (!priorityReference) {
      throw new Error("Priority not found")
    }
    const categoryReference = await db.query.category.findFirst({
      where: eq(category.id, dto.idCategory)
    })
    if (!categoryReference) {
      throw new Error("Category not found")
    }
    const statusReference = await db.query.status.findFirst({
      where: eq(status.id, dto.idStatus)
    })
    if (!statusReference) {
      throw new Error("Status not found")
    }
    const result = await db.insert(card).values({

      id: dto.id,
      idPriority: priorityReference.id,
      idCategory: categoryReference.id,
      idStatus: statusReference.id,
      title: dto.title,
      description: dto.description,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      endedAt: dto.endedAt,
      deleted: 0,
    })
    return result;
  }
}
