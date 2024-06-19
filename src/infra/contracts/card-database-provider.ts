import type { Card } from "domain/entities/card";

export interface ICardDatabaseProvider {
	createCard: (
		title: string,
		idPriority: string,
		idCategory: string,
		idStatus: string,
		createdAt: string,
		deleted: boolean
	) => Promise<Card>;
	loadAllCards: () => Promise<Card[]>;
	displayCard: (id: string) => Promise<Card>;
	deleteCard: (id: string) => Promise<void>;
	findCardByTitle: (title: string) => Promise<Card>;
	renameCard: (id: string, title: string) => Promise<Card>;
	insertCardDescription: (id: string, description: string) => Promise<Card>;
	insertCardDeadline: (
		id: string,
		endedAt: string,
		createdAt: string
	) => Promise<Card>;
}
