import type { IColumnRepository } from "../contracts/column-repository";

type Input = {

}
type Output = {}
type DisplayColumn = (input: Input) => Promise<Output>;

type SetupDisplayColumnProps = {
    repository: IColumnRepository
}

type Setup = (props: SetupDisplayColumnProps) => DisplayColumn

export const setupDisplayColumn: Setup = ({ repository }) => async input => {
    try {
        const columns = await repository.loadAllColumns()
        if (columns.length === 0) throw new Error("No columns found", {
            cause: "no columns found"
        })
        return columns
    } catch (error) {
        throw new Error("Could not load all columns", {
            cause: "display-columns"
        })
    }

}