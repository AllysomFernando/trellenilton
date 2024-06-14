import type { IColumnRepository } from "../contracts/column-repository"

type Input = {
}
type Output = {}

type CreateColumn = (input: Input) => Promise<Output>

type SetupCreateColumnProps = {
    repository: IColumnRepository
}

type Setup = (props: SetupCreateColumnProps) => CreateColumn

export const setupCreateColumn: Setup = ({ repository }) => async ({ }) => {

    return {}

}
