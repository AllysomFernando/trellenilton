export interface IBoardDatabaseProvider {
  loadAllBoards: () => Promise<any[]>
}