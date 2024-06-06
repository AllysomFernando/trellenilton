type Input = {

}
type Output = {}
type DisplayProfile = (input: Input) => Promise<Output>
type SetupDisplayProfileProps = {}
type Setup = (props: SetupDisplayProfileProps) => DisplayProfile

export const setupDisplayProfile: Setup = ({ }) => async input => {


    return {}
}