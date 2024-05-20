import type { IBoardRepository } from "../contracts/board-repository";

type Input = {
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
  async ({ id }) => {
    try {
      await repository.deleteBoard(id);
      return {
        statusCode: 200,
        message: "Board deleted",
      };
    } catch (error) {
      throw new Error("Could not delete board", {
        cause: "delete-board",
      });
    }
  };
