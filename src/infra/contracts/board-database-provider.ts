export interface IBoardDatabaseProvider {
  loadAllBoards: () => Promise<any[]>;
  createBoard: (board: any) => Promise<any>;
  deleteBoard: (id: string) => Promise<void>;
  updateBoard: (board: any, id: string) => Promise<any>;
}
