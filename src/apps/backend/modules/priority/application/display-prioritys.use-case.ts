import type { IPriorityRepository } from "domain/contracts/priority-repository";
import type { Priority } from "domain/entities/priority";

type Input = {};
type Output = Priority[];
type DisplayPrioritys = (input: Input) => Promise<Output>;
type SetupDisplayPrioritys = {
	repository: IPriorityRepository;
};
type Setup = (props: SetupDisplayPrioritys) => DisplayPrioritys;

export const setupDisplayPrioritys: Setup =
	({ repository }) =>
	async (input) => {
		try {
			const priorityResponse = await repository.loadAllPriority();
			console.log(priorityResponse);
			// if (priority.length === 0)
			// 	throw new Error("No priority found", {
			// 		cause: "no-priority",
			// 	});
			return priorityResponse;
		} catch (error) {
			throw new Error("Could not load all priority", {
				cause: "display-priority",
			});
		}
	};
