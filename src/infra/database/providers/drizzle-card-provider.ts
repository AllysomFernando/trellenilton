import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import { card, category, priority, status } from "../models";
import type { Card } from "../../../domain/entities/card";
import type { ICardDatabaseProvider } from "../../contracts/card-database-provider";


export class DrizzleCardProvider implements ICardDatabaseProvider {

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

      public async loadAllCards(): Promise<Card[]> {
        const result = await db.query.card.findMany();
        return result.map((card) => ({
          id: card.id,
          idPriority: card.idPriority,
          idCategory: card.idCategory,
          idStatus: card.idStatus,
          title: card.title,
          description: card.description,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt,
          endedAt: card.endedAt,
          deleted: card.deleted,
        }));
      }

      public async deleteCard(id: string, card: any): Promise<Card> {
        const result = await db
        .update(card)
        .set({ deleted: 1 })
        .where(eq(card.id, id))
        .execute();
        return result;
      }
      
}

