import type { IProfileRepository } from "../contracts/profile-repository";

type Input = {
    name: string;
}
type Output = {}

type RenameProfile = (input: Input) => Promise<Output>

type SetupRenameProfileProps = {
    repository: IProfileRepository
}
type Setup = (props: SetupRenameProfileProps) => RenameProfile

export const setupRenameProfile: Setup = ({ name }) => async input => {
    try {
        
    } catch (error) {

    }
    return {}
}