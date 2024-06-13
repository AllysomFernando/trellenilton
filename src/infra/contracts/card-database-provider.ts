import type { Card } from "../../domain/entities/card";

export interface ICardDatabaseProvider {

    loadAllCards: () => Promise<any[]>;
    createCard: (card: any) => Promise<any>;
    deleteCard: (id: string) => Promise<any>;
    findCardByTitle: (title: string) => Promise<any>;
}
  