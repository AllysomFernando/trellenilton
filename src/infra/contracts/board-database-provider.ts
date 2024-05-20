export interface IBoardDatabaseProvider {
  loadAllBoards: () => Promise<any[]>
  createBoard: (board: any) => Promise<any> 
}