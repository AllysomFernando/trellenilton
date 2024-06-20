import type { ICategoryRepository } from "domain/contracts/category-repository";
import type { Category } from "domain/entities/category";

type Input = {
	id: string;
};
type Output = Category;
type DisplayCategory = (input: Input) => Promise<Output>;
type SetupDisplayCategory = {
	repository: ICategoryRepository;
};
type Setup = (props: SetupDisplayCategory) => DisplayCategory;

export const setupDisplayCategory: Setup =
	({ repository }) =>
	async ({ id }: Input) => {
		try {
			const board = await repository.loadSpecificCategory(id);
			if (board.id !== id)
				throw new Error(`No Category found with this id: ${id}`, {
					cause: "no-Category",
				});

			return board;
		} catch (error) {
			throw new Error(`Could not load this Category: ${id}`, {
				cause: "display-Category",
			});
		}
	};
