import type { ICategoryRepository } from "domain/contracts/category-repository";

type Input = {
	name: string;
	description: string;
	deleted: boolean;
};
type Output = {};
type CreateCategory = (input: Input) => Promise<Output>;
type SetupCreateCategory = {
	repository: ICategoryRepository;
};
type Setup = (props: SetupCreateCategory) => CreateCategory;

export const setupCreateCategory: Setup =
	({ repository }) =>
	async ({ name, description, deleted }: Input) => {
		try {
			if (name.length < 3) {
				throw new Error("Name must have at least 3 characters");
			}
			return await repository.createCategory(
				name,
				deleted || false,
				description
			);
		} catch (error) {
			throw new Error("Não foi possivel criar a categoria", {
				cause: "create-category",
			});
		}
	};
