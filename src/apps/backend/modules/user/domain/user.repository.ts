import type { User } from "../entities/User";

export interface IUserRepository {
	createUser: (
		name: string,
		deleted: boolean,
		email: string,
		password: string
	) => Promise<User>;
	loadAllUsers: () => Promise<User[]>;
	deleteUser: (id: string) => Promise<void>;
	renameUser: (id: string, name: string) => Promise<User>;
}
