type Input = {}
type Output = {}
type CreateProfile = (input: Input) => Promise<Output>
type SetupCreateProfileProps = {}
type Setup = (props: SetupCreateProfileProps) => CreateProfile

export const setupCreateProfile: Setup = (props) => {
    return async () => {
        return {}
    }
}