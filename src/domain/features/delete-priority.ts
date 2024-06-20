import type { IPriorityRepository } from "domain/contracts/priority-repository";

import type { Priority } from "domain/entities/priority";


type Input = {
	priority: Pick<Priority, "deleted">;
	id: string;
};
type Output = {
	statusCode: number;
	message: string;
};
type DeletePriority = (input: Input) => Promise<Output>;
type setupDeletePriority = {
	repository: IPriorityRepository;
};
type Setup = (props: setupDeletePriority) => DeletePriority;

export const setupDeletePriority: Setup =
	({ repository }) =>
	async ({ priority, id }) => {
		try {
			if (priority.deleted === false) {
				throw new Error("Priority must be marked as deleted before deletion", {
					cause: "priority-not-deleted",
				});
			}
			await repository.deletePriority(id);
			return {
				statusCode: 200,
				message: "Board deleted successfully",
			};
		} catch (error) {
			throw new Error("Could not delete the board", {
				cause: "delete-board",
			});
		}
	};
