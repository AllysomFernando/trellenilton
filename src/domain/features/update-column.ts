import type { IColumnRepository } from "domain/contracts/column-repository";
import type { Column } from "../entities/column";


type Input = {
    id: string;
    column: Pick<Column, "name">;
}

type Output = Column;
type UpdateColumn = (input: Input) => Promise<Output>;
type SetupUpdateColumn = {
    repository: IColumnRepository
}
type Setup = (props: SetupUpdateColumn) => UpdateColumn;

export const setupUpdateColumn: Setup = ({ repository }) => async ({ id, column }) => {
    try {
        const columns = await repository.loadAllColumns();
        const columnFind = columns.find(column => column.id === id);
        if (!columnFind) {
            throw new Error(`Column with the id ${id} not found`, {
                cause: "column-not-found"
            });
        }
        if(column.name && column.name.length < 3) {
            throw new Error("Name must be at least 3 characters long", {
                cause: "invalid-column-name"
            });
        }
        console.log("column.name", column.name);
        const updateColumn: Column = {
            ...columnFind,
            name: column.name ?? columnFind.name
        }
        return await repository.updateColumn(id, updateColumn.name);
    }catch(error) {
        console.log(error);
        throw new Error("Could not update board", {
            cause: "update-board"
        });
    }
};