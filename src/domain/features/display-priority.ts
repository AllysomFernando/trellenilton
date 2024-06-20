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
				throw new Error(`No Category found with this id: ${id}`, {
					cause: "no-Category",
				});

			return board;
		} catch (error) {
			throw new Error(`Could not load this Category: ${id}`, {
				cause: "display-Category",
			});
		}
	};
