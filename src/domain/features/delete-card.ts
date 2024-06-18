import type { ICardRepository } from "../contracts/card-repository";
import type { Card } from "../entities/card"

type Input = {
    card: Card;
    id: string;
};
type Output = {
    statusCode: number;
    message: string;
};
type DeleteCard = (input: Input) => Promise<Output>;
type SetupDeleteCard = {
    repository: ICardRepository;
};
type Setup = (props: SetupDeleteCard) => DeleteCard;

export const setupDeleteCard: Setup =
    ({ repository }) =>
        async ({ card, id }) => {
            try {
                if (card.deleted === false) {
                    throw new Error("Card must be marked as deleted before deletion", {
                        cause: "card-not-deleted",
                    });
                }
                await repository.deleteCard(id);
                return {
                    statusCode: 200,
                    message: "Card deleted successfully",
                };
            } catch (error) {
                throw new Error("Could not delete card", {
                    cause: "delete-card",
                })
            }
        }
