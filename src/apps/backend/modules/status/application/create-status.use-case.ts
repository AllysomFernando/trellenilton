import type { IStatusRepository } from "domain/contracts/status-repository";

type Input = {
	name: string;
	description: string;
	deleted: boolean;
};
type Output = {};
type CreateStatus= (input: Input) => Promise<Output>;
type SetupCreateStatus = {
	repository: IStatusRepository;
};
type Setup = (props: SetupCreateStatus) => CreateStatus;

export const setupCreateStatus: Setup =
	({ repository }) =>
	async ({ name, description, deleted }: Input) => {
		try {
			if (name.length < 3) {
				throw new Error("Name must have at least 3 characters");
			}
			return await repository.createStatus(
				name,
				deleted || false,
				description
			);
		} catch (error) {
			throw new Error("Não foi possivel criar o status", {
				cause: "create-status",
			});
		}
	};
