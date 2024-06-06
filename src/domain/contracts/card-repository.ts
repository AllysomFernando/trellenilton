import type { Card } from "../entities/card";

export interface ICardRepository {

    createCard: (card: Card) => Promise<Card>;
    loadAllCards: () => Promise<Card[]>;

}