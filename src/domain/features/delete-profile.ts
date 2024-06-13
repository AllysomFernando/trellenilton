import type { IProfileRepository } from "../contracts/profile-repository"
import type { Profile } from "../entities/profile"

type Input = {
    profile: Profile,
    id: string,
}
type Output = {
    statusCode: number,
    message: string,
}
type DeleteProfile = (input: Input) => Promise<Output>
type SetupDeleteProfileprops = {
    repository: IProfileRepository
}
type Setup = (props: SetupDeleteProfileprops) => DeleteProfile

export const setupDeleteProfile: Setup = ({ repository }) => async ({ profile, id }) => {
    try {
        await repository.deleteProfile(profile, id)
        return {
            statusCode: 200,
            message: "Profile deleted successfully",
        }
    } catch (error) {
        throw new Error("Could not delete profile",
            { cause: "delete-profile" })
    }
}