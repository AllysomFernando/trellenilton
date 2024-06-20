import type { IPriorityRepository } from "domain/contracts/priority-repository";
import type { Priority } from "domain/entities/priority";


type Input = {
	id: string;
};
type Output = Priority;
type DisplayPriority = (input: Input) => Promise<Output>;
type SetupDisplayPriority = {
	repository: IPriorityRepository;
};
type Setup = (props: SetupDisplayPriority) => DisplayPriority;

export const setupDisplayPriority: Setup =
	({ repository }) =>
	async ({ id }: Input) => {
		try {
			const board = await repository.loadSpecificPriority(id);
			if (board.id !== id)
				throw new Error(`No priority found with this id: ${id}`, {
					cause: "no-priority",
				});

			return board;
		} catch (error) {
			throw new Error(`Could not load this priority: ${id}`, {
				cause: "display-priority",
			});
		}
	};
