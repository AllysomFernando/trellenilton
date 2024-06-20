import type { IStatusRepository } from "domain/contracts/status-repository";
import type { Status } from "domain/entities/status";

type Input = {
	status: Pick<Status, "deleted">;
	id: string;
};
type Output = {
	statusCode: number;
	message: string;
};
type DeleteStatus = (input: Input) => Promise<Output>;
type setupDeleteStatus = {
	repository: IStatusRepository;
};
type Setup = (props: setupDeleteStatus) => DeleteStatus;

export const setupDeleteStatus: Setup =
	({ repository }) =>
	async ({ status, id }) => {
		try {
			if (status.deleted === false) {
				throw new Error("Status must be marked as deleted before deletion", {
					cause: "status-not-deleted",
				});
			}
			await repository.deleteStatus(id);
			return {
				statusCode: 200,
				message: "Status deleted successfully",
			};
		} catch (error) {
			throw new Error("Could not delete the status", {
				cause: "delete-status",
			});
		}
	};
