import type { Type } from "domain/enum/type";

/**
 * User entity
 * @property {string} id - User id
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} password - User password
 *  @property {string} createdAt - User creation date
 * @property {string} updatedAt - User update date
 * @property {boolean} deleted - User deletion status the default value is false
 * @property {Type} type - User type
 */

export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
	updatedAt?: string;
	deleted: boolean;
	type: Type;
};

