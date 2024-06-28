import type { IStatusRepository } from "domain/contracts/status-repository";
import type { Status } from "domain/entities/status";

type Input = {
	id: string;
};
type Output = Status;
type DisplayStatus = (input: Input) => Promise<Output>;
type SetupDisplayStatus = {
	repository: IStatusRepository;
};
type Setup = (props: SetupDisplayStatus) => DisplayStatus;

export const setupDisplaySingleStatus: Setup =
	({ repository }) =>
	async ({ id }: Input) => {
		try {
			const board = await repository.loadSpecificStatus(id);
			if (board.id !== id)
				throw new Error(`No Status found with this id: ${id}`, {
					cause: "no-Status",
				});

			return board;
		} catch (error) {
			throw new Error(`Could not load this Status: ${id}`, {
				cause: "display-Status",
			});
		}
	};
