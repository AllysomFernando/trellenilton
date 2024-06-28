import type { Card } from "../entities/card";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
    id: string,
    title: string,
    deleted: boolean,
};

type Output = Card;

type RenameCard = (input: Input) => Promise<Output>;

type SetupRenameCard = {
    repository: ICardRepository;
};

type Setup = (props: SetupRenameCard) => RenameCard;

export const setupRenameCard: Setup =
    ({ repository }) =>
        async ({ title, id, deleted }) => {
            try {
                const cards = await repository.loadAllCards();
                const card = cards.find(card => card.id === id);
                if (!card) {
                    throw new Error(`Card with the id ${id} not found`, {
                        cause: "card-not-found",
                    });
                }

                if (title && title.length < 3) {
                    throw new Error("Name must be at least 3 characters long", {
                        cause: "invalid-card-title"
                    });
                }

                const renameCard: Card = {
                    ...card,
                    title: title ?? card.title,
                    deleted: deleted ?? card.deleted
                }

                return await repository.renameCard(renameCard, id);

            } catch (error) {
                throw new Error("Could not rename card", {
                    cause: "rename-card",
                });
            }
        }