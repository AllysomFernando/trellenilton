import type { Card } from "domain/entities/card";

export interface ICardDatabaseProvider {
	createCard: (
		title: string,
		idPriority: string,
		idCategory: string,
		idStatus: string,
		createdAt: string,
		deleted: boolean,
		description?: string,
		updatedAt?: string,
		endedAt?: string
	) => Promise<Card>;
	loadAllCards: () => Promise<Card[]>;
	displayCard: (id: string) => Promise<Card>;
	deleteCard: (id: string) => Promise<void>;
	renameCard: (id: string, title: string) => Promise<Card>;
	insertCardDescription: (id: string, description: string) => Promise<Card>;
	insertCardDeadline: (
		id: string,
		endedAt: string,
		createdAt: string
	) => Promise<Card>;
	createCardColumn: (idCard: string, idColumn: string) => Promise<any>;
}
