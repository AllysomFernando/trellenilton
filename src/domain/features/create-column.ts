import type { IColumnRepository } from "../contracts/column-repository"

type Input = {
    deleted: boolean,
}
type Output = {}

type CreateColumn = (input: Input) => Promise<Output>

type SetupCreateColumnProps = {
    repository: IColumnRepository
}

type Setup = (props: SetupCreateColumnProps) => CreateColumn

export const setupCreateColumn: Setup = ({ repository }) => async ({ deleted }) => {
    try {
        return await repository.createColumn(deleted || false)
    } catch (error) {
        throw new Error("Could not create column", {
            cause: "create-column",
        })
    }

}
