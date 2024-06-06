import type { ICreateProfileRepository } from "../contracts/profile-repository";

type Input = {}
type Output = {}
type CreateProfile = (input: Input) => Promise<Output>
type SetupCreateProfileProps = {
    repository: ICreateProfileRepository;
}
type Setup = (props: SetupCreateProfileProps) => CreateProfile

export const setupCreateProfile: Setup = ({ repository }) => async input => {
    try {
        return async () => {
            return await repository.createProfile({
                name: "any_name",
                function: "any_function",
                image: "string",
                deleted: 0,
            })
        }
    } catch (error) {
        throw new Error("Não foi possivel criar o usuário", {
            cause: "create-profile"
        })
    }
}