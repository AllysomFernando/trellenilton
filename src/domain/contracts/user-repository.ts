import type { User } from "domain/entities/user";

export interface IUserRepository {
	loadAllUsers: () => Promise<User[]>;
	loadSpecificUser: (id: string) => Promise<User>;
	createUser: (
		name: string,
		email: string,
		password: string,
		createdAt: string,
		type: string
	) => Promise<User>;
	deleteUser: (id: string) => Promise<void>;
	updateUser: (id: string, name: string) => Promise<User>;
	changeType: (id: string, type: string) => Promise<User>;
}
