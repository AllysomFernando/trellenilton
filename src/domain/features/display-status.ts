import type { IStatusRepository } from "domain/contracts/status-repository";
import type { Status } from "domain/entities/status";

type Input = {};
type Output = Status[];
type DisplayStatus = (input: Input) => Promise<Output>;
type SetupDisplayStatus = {
	repository: IStatusRepository;
};
type Setup = (props: SetupDisplayStatus) => DisplayStatus;

export const SetupDisplayStatus: Setup =
	({ repository }) =>
	async (input) => {
		try {
			const StatusResponse = await repository.loadAllStatus();
			console.log(StatusResponse);

			return StatusResponse;
		} catch (error) {
			throw new Error("Could not load all status", {
				cause: "display-status",
			});
		}
	};
