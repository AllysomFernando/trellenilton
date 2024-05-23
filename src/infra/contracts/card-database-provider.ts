export interface ICardDatabaseProvider {

    createCard: (card: any) => Promise<any>;
    
}
  