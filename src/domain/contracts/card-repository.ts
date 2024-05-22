import type { Card } from "../entities/card";

export interface ICardRepository {
    loadAllCards: () => Promise<Card[]>;
    createCard: (card: Card) => Promise<Card>;
    deleteCard: (card: Card, id: string) => Promise<void>;
}