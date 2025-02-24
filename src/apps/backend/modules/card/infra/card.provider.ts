import { eq } from "drizzle-orm";
import { db } from "../../../main/config/drizzle";
import { card, category, columnCard, priority, status } from "../models";
import type { Card } from "../../../domain/modules/card/domain/card.entity";
import type { ICardDatabaseProvider } from "../../contracts/card-database-provider";

export class DrizzleCardProvider implements ICardDatabaseProvider {
	public async createCard(
		title: string,
		idPriority: string,
		idCategory: string,
		idStatus: string,
		createdAt: string,
		deleted: boolean,
		description?: string,
		updatedAt?: string,
		endedAt?: string
	): Promise<Card> {
		const priorityReference = await db.query.priority.findFirst({
			where: eq(priority.id, idPriority),
		});
		if (!priorityReference) {
			throw new Error("Priority not found");
		}
		const categoryReference = await db.query.category.findFirst({
			where: eq(category.id, idCategory),
		});
		if (!categoryReference) {
			throw new Error("Category not found");
		}
		const statusReference = await db.query.status.findFirst({
			where: eq(status.id, idStatus),
		});
		if (!statusReference) {
			throw new Error("Status not found");
		}

		const result = await db
			.insert(card)
			.values({
				idPriority: idPriority,
				idCategory: idCategory,
				idStatus: idStatus,
				title: title,
				description: description || "",
				createdAt: createdAt,
				updatedAt: updatedAt || "",
				endedAt: endedAt || "",
				deleted: deleted,
			})
			.returning();

		return result[0] as Card;
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

	public async deleteCard(id: string): Promise<void> {
		await db
			.update(card)
			.set({ deleted: true })
			.where(eq(card.id, id))
			.execute();
	}

	public async displayCard(id: string): Promise<Card> {
		const data = await db.query.card.findFirst({
			where: eq(card.id, id),
		});
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

	public async renameCard(id: string, title: string): Promise<Card> {
		await db
			.update(card)
			.set({ title: title })
			.where(eq(card.id, id))
			.execute();
		return this.displayCard(id);
	}

	public async insertCardDescription(
		id: string,
		description: string
	): Promise<Card> {
		await db.update(card).set({ description }).where(eq(card.id, id)).execute();
		return this.displayCard(id);
	}

	public async insertCardDeadline(
		id: string,
		createdAt: string,
		endedAt: string
	): Promise<Card> {
		await db
			.update(card)
			.set({ createdAt, endedAt })
			.where(eq(card.id, id))
			.execute();
		return this.displayCard(id);
	}
	public async createCardColumn(
		idCard: string,
		idColumn: string
	): Promise<any> {
		const result = await db
			.insert(columnCard)
			.values({
				idCard: idCard,
				idColumn: idColumn,
			})
			.returning();
		return result[0];
	}
}
