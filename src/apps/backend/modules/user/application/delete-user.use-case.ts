import type { IProfileRepository } from "../contracts/user-repository"
import type { Profile } from "./User"

type Input = {
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

export const setupDeleteProfile: Setup = ({ repository }) => async ({ id }) => {
    try {
        await repository.deleteProfile(id)
        return {
            statusCode: 200,
            message: "Profile deleted successfully",
        }
    } catch (error) {
        throw new Error("Could not delete profile",
            { cause: "delete-profile" })
    }
}