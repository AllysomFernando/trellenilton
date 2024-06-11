type Input = {}
type Output = {}

type ChangeProfileName = (input: Input) => Promise<Output>

type SetupChangeProfileNameProps = {

}
type Setup = (props: SetupChangeProfileNameProps) => ChangeProfileName

export const setupChangeProfileName: Setup = ({ }) => async input => {

    return {}
}