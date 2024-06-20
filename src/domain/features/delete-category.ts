import type { ICategoryRepository } from "domain/contracts/category-repository";
import type { Category } from "domain/entities/category";

type Input = {
	category: Pick<Category, "deleted">;
	id: string;
};
type Output = {
	statusCode: number;
	message: string;
};
type DeleteCategory = (input: Input) => Promise<Output>;
type setupDeleteCategory = {
	repository: ICategoryRepository;
};
type Setup = (props: setupDeleteCategory) => DeleteCategory;

export const setupDeleteCategory: Setup =
	({ repository }) =>
	async ({ category, id }) => {
		try {
			if (category.deleted === false) {
				throw new Error("Category must be marked as deleted before deletion", {
					cause: "category-not-deleted",
				});
			}
			await repository.deleteCategory(id);
			return {
				statusCode: 200,
				message: "Category deleted successfully",
			};
		} catch (error) {
			throw new Error("Could not delete the Category", {
				cause: "delete-Category",
			});
		}
	};
