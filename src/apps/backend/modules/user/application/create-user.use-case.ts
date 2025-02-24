import type { IProfileRepository } from "../contracts/user-repository";

type Input = {
	name: string;
	funcao: string;
	deleted: boolean;
};
type Output = {};
type CreateProfile = (input: Input) => Promise<Output>;
type SetupCreateProfileProps = {
	repository: IProfileRepository;
};
type Setup = (props: SetupCreateProfileProps) => CreateProfile;

export const setupCreateProfile: Setup =
	({ repository }) =>
	async ({ name, funcao, deleted }: Input) => {
		try {
			if (name.length < 3) {
				throw new Error("Name must have at least 3 characters");
			}
			return await repository.createProfile(name, deleted || false, funcao);
		} catch (error) {
			throw new Error("Não foi possivel criar o usuário", {
				cause: "create-profile",
			});
		}
	};
