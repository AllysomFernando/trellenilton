import type { Card } from "../entities/card";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
	idCard: string;
	idColumn: string;
};
type Output = Card;
type CreateCard = (input: Input) => Promise<Output>;
type SetupCreateCard = {
	repository: ICardRepository;
};
type Setup = (props: SetupCreateCard) => CreateCard;

export const SetupCreateCard: Setup =
	({ repository }) =>
	async ({ idCard, idColumn }: Input) => {
		try {
			return await repository.createCardColumn(idCard, idColumn);
		} catch (error) {
			console.log(error);
			throw new Error("Could not create card", {
				cause: "create-card",
			});
		}
	};
