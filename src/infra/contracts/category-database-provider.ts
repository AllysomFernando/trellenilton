import type { Category } from "domain/entities/category";

export interface ICategoryDatabaseProvider {
	createCategory: (
		name: string,
		deleted: boolean,
		description: string
	) => Promise<Category>;
	loadAllCategory: () => Promise<Category[]>;
	deletedCategory: (id: string) => Promise<void>;
	loadSpecificCategory: (id: string) => Promise<Category>;
}
