import type { IBoardRepository } from "../contracts/board-repository";
import type { Board } from "../entities/board";

type Input = {
	name: string;
	deleted?: boolean,
	createdAt?: string
};
type Output = Board;
type CreateBoard = (input: Input) => Promise<Output>;
type SetupCreateBoard = {
	repository: IBoardRepository;
};
type Setup = (props: SetupCreateBoard) => CreateBoard;

export const setupCreateBoards: Setup =
	({ repository }) =>
	async ({ name, deleted, createdAt }: Input) => {
		createdAt = new Date().toString();
		if (name.length < 3)
			throw new Error("Name must have at least 3 characters");
		try {
			return await repository.createBoard(name, deleted || false, createdAt); 
		} catch (error) {
			console.log(error)
			throw new Error("Could not create board", {
				cause: "create-board",
			});
		}
	};