import type { IProfileRepository } from "../contracts/profile-repository";

type Input = {
    id: string,
    name: string,
    funcao: string,
    deleted: boolean,
}
type Output = {}
type CreateProfile = (input: Input) => Promise<Output>
type SetupCreateProfileProps = {
    repository: IProfileRepository;
}
type Setup = (props: SetupCreateProfileProps) => CreateProfile

export const setupCreateProfile: Setup = ({ repository }) => async input => {
    try {
        return async () => {
            return await repository.createProfile({
                id: "id",
                name: "any_name",
                funcao: "any_function",
                deleted: false,
            })
        }
    } catch (error) {
        throw new Error("Não foi possivel criar o usuário", {
            cause: "create-profile"
        })
    }
}