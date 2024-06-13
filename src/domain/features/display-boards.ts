import type { IBoardRepository } from "../contracts/board-repository"
import type { Board } from "../entities/board"

type Input = {}
type Output = Board[]
type DisplayBoards = (input: Input) => Promise<Output>
type SetupDisplayBoardsProps = {
  repository: IBoardRepository
}
type Setup = (props: SetupDisplayBoardsProps) => DisplayBoards

export const setupDisplayBoards: Setup = ({
  repository
}) => async input => {
  try {
    const boards = await repository.loadAllBoards()
    if(boards.length === 0) throw new Error("No boards found", {
      cause: "no-boards"
    })
    return boards
  } catch (error) {
    throw new Error("Could not load all boards", {
      cause: "display-boards"
    })
  }
}