import type { Card } from "../domain/card.entity";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
    Cards: Card;
    title: string;
};
type Output = boolean;
type FindCardByTitle = (input: Input) => Promise<Output>;
type SetupFindCardByTitle = {
    repository: ICardRepository;
};
type Setup = (props: SetupFindCardByTitle) => FindCardByTitle;

export const setupFindCardByTitle: Setup =
    ({ repository }) =>
        async ({ Cards }) => {
            try {
                const title = Cards.title; // Assuming Cards has a property called title
                const existingCard = await repository.findCardByTitle(title);
                return !!existingCard;
            } catch (error) {
                throw new Error("Could not find card by title", {
                });
            }
        };