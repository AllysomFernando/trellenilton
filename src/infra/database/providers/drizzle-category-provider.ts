import type { ICategoryDatabaseProvider } from "infra/contracts/category-database-provider";
import { db } from "../../../main/drizzle";
import { eq } from "drizzle-orm";
import { category } from "@models/category";

export class DrizzleCategoryProvider implements ICategoryDatabaseProvider {
	public async createCategory(
		name: string,
		deleted: boolean,
		description: string
	): Promise<any> {
		const result = await db.insert(category).values({
			name: name,
			deleted: deleted,
			description: description,
		});
		return result;
	}
	public async loadAllCategory(): Promise<any[]> {
		try {
			const result = await db.query.category.findMany();
			return result;
		} catch (error) {
			throw new Error("Could not load all category", {
				cause: "load-all-category",
			});
		}
	}
	public async deletedCategory(id: string): Promise<void> {
		try {
			await db
				.update(category)
				.set({ deleted: true })
				.where(eq(category.id, id))
				.execute();
		} catch (error) {
			console.error(error);
		}
	}
	public async loadSpecificCategory(id: string): Promise<any> {
		try {
			const result = await db.query.category.findFirst({
				where: eq(category.id, id),
			});
			return result;
		} catch (error) {
			console.error(error);
		}
	}
}
