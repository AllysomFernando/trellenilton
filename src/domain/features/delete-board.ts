import type { IBoardRepository } from "../contracts/board-repository";
import type { Board } from "../entities/board";

type Input = {
  board: Board;
  id: string;
};
type Output = {
  statusCode: number;
  message: string;
};
type DeleteBoard = (input: Input) => Promise<Output>;
type SetupDeleteBoard = {
  repository: IBoardRepository;
};
type Setup = (props: SetupDeleteBoard) => DeleteBoard;

export const setupDeleteBoard: Setup =
  ({ repository }) =>
  async ({ board, id }) => {
    try {
      await repository.deleteBoard(board, id);
      return {
        statusCode: 200,
        message: "Board deleted successfully",
      };
    } catch (error) {
      throw new Error("Could not delete the board", {
        cause: "delete-board",
      });
    }
  };
