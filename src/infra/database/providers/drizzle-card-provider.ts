import { eq } from "drizzle-orm";
import { db } from "../../../main/drizzle";
import { card, category, priority, status } from "../models";
import type { Card } from "../../../domain/entities/card";
import type { ICardDatabaseProvider } from "../../contracts/card-database-provider";


export class DrizzleCardProvider implements ICardDatabaseProvider {
  constructor(private readonly db: ICardDatabaseProvider) {}
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
      deleted: false,
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

  public async deleteCard(id: string): Promise<Card> {
    const result = await db
      .update(card)
      .set({ deleted: false })
      .where(eq(card.id, id))
      .execute();
    return result;
  }

  public async displayCard(id: string): Promise<Card> {
    const data = await db.query.card.findFirst({
      where: eq(card.id, id)
     })
     if (!data) {
      throw new Error("Card not found");
    }
    return {
      id: data.id,
      idPriority: data.idPriority,
      idCategory: data.idCategory,
      idStatus: data.idStatus,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      endedAt: data.endedAt,
      deleted: data.deleted,
    };
  }

  public async renameCard(card: any, id: string): Promise<Card> {
    const data = await this.db.renameCard(card, id)
    return {
      id: data.id,
      idPriority: data.idPriority,
      idCategory: data.idCategory,
      idStatus: data.idStatus,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      endedAt: data.endedAt,
      deleted: data.deleted,
    }
  }

  public async insertCardDescription(card: any, id: string): Promise<Card> {
    const data = await this.db.insertCardDescription(card, id)
    return {
      id: data.id,
      idPriority: data.idPriority,
      idCategory: data.idCategory,
      idStatus: data.idStatus,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      endedAt: data.endedAt,
      deleted: data.deleted,
    }
  }

  public async insertCardDeadline(card: any, id: string): Promise<Card> {
    const data = await this.db.insertCardDeadline(card, id)
    return {
      id: data.id,
      idPriority: data.idPriority,
      idCategory: data.idCategory,
      idStatus: data.idStatus,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      endedAt: data.endedAt,
      deleted: data.deleted,
    }
  }
}
