export interface IBoardDatabaseProvider {
  loadAllBoards: () => Promise<any[]>;
  createBoard: (board: any) => Promise<any>;
  deleteBoard: (board: any, id: string) => Promise<any>;
}
