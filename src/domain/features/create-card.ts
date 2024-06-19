import type { Card } from "../entities/card";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
	id: string;
	idPriority: string;
	idCategory: string;
	idStatus: string;
	title: string;
	description?: string;
	createdAt: string;
	updatedAt?: string;
	endedAt?: string;
	deleted: boolean;
};
type Output = Card;
type CreateCard = (input: Input) => Promise<Output>;
type SetupCreateCard = {
	repository: ICardRepository;
};
type Setup = (props: SetupCreateCard) => CreateCard;

export const SetupCreateCard: Setup =
	({ repository }) =>
	async ({
		id,
		idPriority,
		idCategory,
		idStatus,
		title,
		description,
		createdAt,
		updatedAt,
		endedAt,
		deleted,
	}) => {
		if (title.length < 3)
			throw new Error("Title must be at least 3 characters long", {
				cause: "invalid-card-title",
			});

		const existingCard = await repository.findCardByTitle(title);
		if (existingCard) {
			throw new Error("Another card with the same title already exists", {
				cause: "duplicate-card-title",
			});
		}

		try {
			return await repository.createCard({
				id,
				idPriority,
				idCategory,
				idStatus,
				title,
				description,
				createdAt,
				updatedAt,
				endedAt,
				deleted,
			});
		} catch (error) {
			throw new Error("Could not create card", {
				cause: "create-card",
			});
		}
	};
