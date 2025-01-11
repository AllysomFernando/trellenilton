import type { IUserRepository } from "domain/contracts/user-repository";
import type { User } from "domain/entities/user";
import type { Type } from "domain/enum/type";

type Input = {
	id: null;
	name: string;
	email: string;
	password: string;
	type: Type;
	deleted: false;
};
type Output = User;
type CreateUser = (user: Input) => Promise<Output>;
type SetupCreateUser = {
	repository: IUserRepository;
};
type Setup = (props: SetupCreateUser) => CreateUser;

export const setupCreateUser: Setup =
	({ repository }) =>
	async (user: Input) => {
		try {
			if (user.name.length < 3) {
				throw new Error("Name must have at least 3 characters");
			}
			if (user.email.length < 3) {
				throw new Error("The email is not valid");
			}
			return await repository.createUser(
				user.name,
				user.email,
				user.password,
				new Date().toISOString(),
				user.type
			);
		} catch (error) {
			throw new Error("Não foi possivel criar o usuario", {
				cause: "create-user",
			});
		}
	};
