import type { ICategoryRepository } from "domain/contracts/category-repository";
import type { Category } from "domain/entities/category";

type Input = {};
type Output = Category[];
type DisplayCategories = (input: Input) => Promise<Output>;
type SetupDisplayCategories = {
	repository: ICategoryRepository;
};
type Setup = (props: SetupDisplayCategories) => DisplayCategories;

export const SetupDisplayCategories: Setup =
	({ repository }) =>
	async (input) => {
		try {
			const categoryResponse = await repository.loadAllCategory();
			console.log(categoryResponse);

			return categoryResponse;
		} catch (error) {
			throw new Error("Could not load all category", {
				cause: "display-category",
			});
		}
	};
