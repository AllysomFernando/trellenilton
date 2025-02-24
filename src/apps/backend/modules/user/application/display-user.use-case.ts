import type { IProfileRepository } from "../contracts/user-repository"
import type { Profile } from "./User"

type Input = {}
type Output = Profile[]
type DisplayProfile = (input: Input) => Promise<Output>
type SetupDisplayProfileProps = {
    repository: IProfileRepository
}
type Setup = (props: SetupDisplayProfileProps) => DisplayProfile

export const setupDisplayProfile: Setup = ({ repository }) => async input => {
    try {
        const profiles = await repository.loadAllProfile()
        return profiles
    } catch (error) {
        throw new Error("Coul not load all profiles",
            { cause: "display-profile" }
        )
    }
}