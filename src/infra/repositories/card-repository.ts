import type { ICardRepository } from "../../domain/contracts/card-repository";
import type { Card } from "../../domain/entities/card";
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
    public async createCard(card: Card): Promise<Card> {
        const data = await this.db.createCard(card);
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

    public async deleteCard(card: Card, id: string): Promise<void> {
        const data = await this.db.deleteCard(card, id);
        return data;
    }
    
}