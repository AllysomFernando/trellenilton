export interface ICardDatabaseProvider {
    loadAllCards: () => Promise<any[]>;
    createCard: (card: any) => Promise<any>;
    //deleteCard: (card: any) => Promise<any>;
}
  