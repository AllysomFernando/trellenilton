import type { Card } from "../entities/card";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
    id: string,
    endedAt: string,
    deleted: boolean,
    createdAt: string,
};

type Output = Card;

type InsertCardDeadline = (input: Input) => Promise<Output>;

type SetupInsertCardDeadline = {
    repository: ICardRepository;
};

type Setup = (props: SetupInsertCardDeadline) => InsertCardDeadline;

export const setupInsertCardDeadline: Setup =
    ({ repository }) =>
        async ({ id, endedAt, deleted, createdAt }) => {
            try {
                const cards = await repository.loadAllCards();
                const card = cards.find(card => card.id === id);
                if (!card) {
                    throw new Error(`Card with the id ${id} not found`, {
                        cause: "card-not-found",
                    });
                }

                if (createdAt < endedAt) {
                    throw new Error("Needs to set a later deadline", {
                        cause: "invalid-deadline-card"
                    });
                }

                const insertCardDeadline: Card = {
                    ...card,
                    endedAt: endedAt ?? card.description,
                    deleted: deleted ?? card.deleted
                }

                return await repository.insertCardDescription(insertCardDeadline, id, endedAt);

            } catch (error) {
                throw new Error("Could not insert a deadline in card", {
                    cause: "insert-deadline-card",
                });
            }
        }