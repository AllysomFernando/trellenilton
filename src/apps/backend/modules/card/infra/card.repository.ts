import type { ICardRepository } from "../../domain/contracts/card-repository";
import type { Card } from "../domain/card.entity";
import type { ICardDatabaseProvider } from "../contracts/card-database-provider";

export class CardRepository implements ICardRepository {
	constructor(private readonly db: ICardDatabaseProvider) {}

	public async loadAllCards(): Promise<Card[]> {
		const data = await this.db.loadAllCards();
		return data.map((card) => ({
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
		const data = await this.db.createCard(
			title,
			idPriority,
			idCategory,
			idStatus,
			createdAt,
			deleted,
			description,
			updatedAt,
			endedAt
		);
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

	public async deleteCard(id: string): Promise<void> {
		await this.db.deleteCard(id);
	}

	public async displayCard(id: string): Promise<Card> {
		const data = await this.db.displayCard(id);
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

	public async insertCardDescription(
		id: string,
		description: string
	): Promise<Card> {
		const data = await this.db.insertCardDescription(id, description);
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

	public async insertCardDeadline(
		id: string,
		createAt: string,
		endedAt: string
	): Promise<Card> {
		const data = await this.db.insertCardDeadline(id, createAt, endedAt);
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

	public async renameCard(title: string, id: string): Promise<Card> {
		const data = await this.db.renameCard(id, title);
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
	public async createCardColumn(
		idColumn: string,
		idCard: string
	): Promise<any> {
		return this.db.createCardColumn(idColumn, idCard);
	}
}
