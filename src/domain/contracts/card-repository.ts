import type { Card } from "../entities/card";

export interface ICardRepository {
    createCard: (card: Card) => Promise<Card>;
    loadAllCards: () => Promise<Card[]>;
    displayCard: (id: string) => Promise<Card>;
    deleteCard: (id: string) => Promise<void>;
    findCardByTitle: (title: string) => Promise<Card>;
    renameCard: (card: Card, id: string) => Promise<Card>;
    insertCardDescription: (card: Card, id: string, description: string) => Promise<Card>;
    insertCardDeadline: (card: Card, id: string, endedAt: string, createdAt: string) => Promise<Card>;
}