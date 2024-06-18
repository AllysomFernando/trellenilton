import type { IColumnRepository } from "domain/contracts/column-repository";
import type { IBoardRepository } from "../contracts/board-repository";
import type { Board } from "../entities/board";

type Input = {
	id: string;
};
type Output = Board;
type DisplayBoard = (input: Input) => Promise<Output>;
type SetupDisplayBoardsProps = {
	repository: IBoardRepository;
};
type Setup = (props: SetupDisplayBoardsProps) => DisplayBoard;

export const setupDisplayBoard: Setup =
	({ repository }) =>
	async ({ id }: Input) => {
		try {
			const board = await repository.loadSpecificBoard(id);
			if (board.id !== id)
				throw new Error(`No boards found with this id: ${id}`, {
					cause: "no-boards",
				});

			return board;
		} catch (error) {
			throw new Error(`Could not load this board: ${id}`, {
				cause: "display-board",
			});
		}
	};
