import type { Column } from "../entities/column";
import type { IColumnRepository } from "../contracts/column-repository";

type Input = {
	name: string;
	deleted?: boolean;
	description: string;
};
type Output = Column;
type CreateColumn = (input: Input) => Promise<Output>;
type SetupCreateColumn = {
	repository: IColumnRepository;
};

type Setup = (props: SetupCreateColumn) => CreateColumn;

export const setupCreateColumn: Setup =
	({ repository }) =>
	async ({ name, deleted, description }: Input) => {
		try {
			return await repository.createColumn(name, deleted || false, description);
		} catch (error) {
			console.log(error);
			throw new Error("Could not create column", {
				cause: "create-column",
			});
		}
	};
