import type { Column } from "../entities/Column";
import type { IColumnRepository } from "../contracts/column-repository";

type Input = {
	name: string;
	deleted?: boolean;
	description: string;
	idBoard: string
};
type Output = Column;
type CreateColumn = (input: Input) => Promise<Output>;
type SetupCreateColumn = {
	repository: IColumnRepository;
};

type Setup = (props: SetupCreateColumn) => CreateColumn;

export const setupCreateColumn: Setup =
	({ repository }) =>
	async ({ name, deleted, description, idBoard }: Input) => {
		try {
			return await repository.createColumn(name, deleted || false, description, idBoard);
		} catch (error) {
			console.log(error);
			throw new Error("Could not create column", {
				cause: "create-column",
			});
		}
	};
