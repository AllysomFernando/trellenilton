type Input = {
    name: string
}
type Output = {}

type CreateColumn = ( input: Input)=> Promise<Output>

type SetupCreateColumnProps = {
    repository: IColumnRepository
}

type Setup = (props: SetupCreateColumnProps) => CreateColumn

export const setupCreateColumn: Setup = ({ repository }) => async ({ name }) => {

return {}

}
