import type { Card } from "../entities/card";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
    id: string,
    description: string,
    deleted: boolean,
};

type Output = Card;

type InsertCardDescriptionCard = (input: Input) => Promise<Output>;

type SetupInsertCardDescriptionCard = {
    repository: ICardRepository;
};

type Setup = (props: SetupInsertCardDescriptionCard) => InsertCardDescriptionCard;

export const setupInsertCardDescriptionCard: Setup =
    ({ repository }) =>
        async ({ id, description, deleted }) => {
            try {
                const cards = await repository.loadAllCards();
                const card = cards.find(card => card.id === id);
                if (!card) {
                    throw new Error(`Card with the id ${id} not found`, {
                        cause: "card-not-found",
                    });
                }

                if (description && description.length < 3) {
                    throw new Error("Description must be at least 3 characters long", {
                        cause: "invalid-card-description"
                    });
                }

                const renameCard: Card = {
                    ...card,
                    description: description ?? card.description,
                    deleted: deleted ?? card.deleted
                }

                return await repository.insertCardDescription(renameCard, id, description);

            } catch (error) {
                throw new Error("Could not insert a description in card", {
                    cause: "insert-description-card",
                });
            }
        }