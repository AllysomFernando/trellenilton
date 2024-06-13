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

export const setupCreateUser: Setup =
  ({ repository }) =>
  async ({name}) => {
    if(name.length < 3) throw new Error("Name must be at least 3 characters long", {
      cause: "invalid-board-name",
    });
    try {
      return await repository.createBoard({
        name: name,
        cards: [],
        id: "",
        deleted: false,
      });
    } catch (error) {
      throw new Error("Could not create board", {
        cause: "create-board",
      });
    }
  };  
