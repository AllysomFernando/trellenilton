import type { IColumnRepository } from "domain/contracts/column-repository";
import type { Column } from "../entities/Column";

type Input = {
	column: Pick<Column, "deleted">;
	id: string;
};
type Output = {
	statusCode: number;
	message: string;
};
type DeleteColumn = (input: Input) => Promise<Output>;
type SetupDeleteColumn = {
	repository: IColumnRepository;
};
type Setup = (props: SetupDeleteColumn) => DeleteColumn;

export const SetupDeleteColumn: Setup =
	({ repository }) =>
	async ({ column, id }) => {
		try {
			console.log("id=====>", id);
			if (column.deleted === false) {
				throw new Error("Column must be marked as deleted before deletion", {
					cause: "column-not-deleted",
				});
			}
			await repository.deleteColumn(id);
			return {
				statusCode: 200,
				message: "Column deleted successfully",
			};
		} catch (error) {
			throw new Error("Could not delete the column", {
				cause: "delete-column",
			});
		}
	};
