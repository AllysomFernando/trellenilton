import type { ICategoryRepository } from "domain/contracts/category-repository";
import type { Category } from "domain/entities/category";
import type { ICategoryDatabaseProvider } from "infra/contracts/category-database-provider";

export class CategoryRepository implements ICategoryRepository {
	constructor(private readonly db: ICategoryDatabaseProvider) {}

	public async loadAllCategory(): Promise<Category[]> {
		const data = await this.db.loadAllCategory();
		return data.map((category) => ({
			id: category.id,
			name: category.name,
			deleted: category.deleted,
			description: category.description,
		}));
	}
	public async loadSpecificCategory(id: string): Promise<Category> {
		const data = await this.db.loadSpecificCategory(id);
		return {
			id: data.id,
			name: data.name,
			deleted: data.deleted,
			description: data.description,
		};
	}
	public async createCategory(
		name: string,
		deleted: boolean,
		description: string
	): Promise<Category> {
		const data = await this.db.createCategory(name, deleted, description);
		return {
			id: data.id,
			name: data.name,
			deleted: deleted,
			description: data.description,
		};
	}
	public async deleteCategory(id: string): Promise<void> {
		const data = await this.db.deletedCategory(id);
		return data;
	}
}
