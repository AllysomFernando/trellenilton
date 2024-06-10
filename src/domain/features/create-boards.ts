import type { IBoardRepository } from "../contracts/board-repository";
import type { Board } from "../entities/board";

type Input = {
  name: string;
};
type Output = Board;
type CreateBoard = (input: Input) => Promise<Output>;
type SetupCreateBoard = {
  repository: IBoardRepository;
};
type Setup = (props: SetupCreateBoard) => CreateBoard;

export const SetupCreateBoard: Setup =
  ({ repository }) =>
  async ({name}) => {
    try {
      return await repository.createBoard({
        name: name,
        cards: [],
        id: "",
        deleted: 0,
      });
    } catch (error) {
      throw new Error("Could not create board", {
        cause: "create-board",
      });
    }
  };
