import type { Card } from "../entities/card";

export interface ICardRepository {

    createCard: (card: Card) => Promise<Card>;
    loadAllCards: () => Promise<Card[]>;
    deleteCard: (card: Card, id: string) => Promise<void>;
    findCardByTitle: (title: string) => Promise<Card|null>;
}