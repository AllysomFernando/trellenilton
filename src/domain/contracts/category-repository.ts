import type { Category } from "domain/entities/category";

export interface ICategoryRepository {
	createCategory: (
		name: string,
		deleted: boolean,
		description: string
	) => Promise<Category>;
	loadAllCategory: () => Promise<Category[]>;
	loadSpecificCategory: (id: string) => Promise<Category>;
	deleteCategory: (id: string) => Promise<void>;
}
