import type { Card } from "../../domain/entities/card";

export interface ICardDatabaseProvider {

    loadAllCards: () => Promise<any[]>;
    createCard: (card: any) => Promise<any>;
    deleteCard: (id: string) => Promise<any>;
    renameCard: (card: any, id: string) => Promise<any>
}
  