import type { IPriorityRepository } from "domain/contracts/priority-repository";

type Input = {
	name: string;
	level: string;
	deleted: boolean;
};
type Output = {};
type CretePriority = (input: Input) => Promise<Output>;
type SetupCreatePriority = {
	repository: IPriorityRepository;
};
type Setup = (props: SetupCreatePriority) => CretePriority;

export const setupCreatePriority: Setup =
	({ repository }) =>
	async ({ name, level, deleted }: Input) => {
		try {
			if (name.length < 3) {
				throw new Error("Name must have at least 3 characters");
			}
			return await repository.createPriority(name, deleted || false, level);
		} catch (error) {
			throw new Error("Não foi possivel criar a prioridade", {
				cause: "create-priority",
			});
		}
	};
