import type { Card } from "../domain/card.entity";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
    id: string,
};

type Output = Card;

type DisplayCard = (input: Input) => Promise<Output>;

type SetupDisplayCard = {
    repository: ICardRepository;
};

type Setup = (props: SetupDisplayCard) => DisplayCard;

export const setupDisplayCard: Setup =
    ({ repository }) =>
        async ({ id }) => {
            try {
                const cards = await repository.loadAllCards();
                const card = cards.find(card => card.id === id);
                if (!card) {
                    throw new Error(`Card with the id ${id} not found`, {
                        cause: "card-not-found",
                    });
                }

                const displayCard: Card = {
                    ...card,
                }

                return await repository.displayCard(displayCard.id);

            } catch (error) {
                throw new Error("Could not find a card", {
                    cause: "card-not-found",
                });
            }
        }