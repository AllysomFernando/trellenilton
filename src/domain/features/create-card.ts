import type { Card } from "../entities/card";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
    id: string;
    idPriority: string;
    idCategory: string;
    idStatus: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    endedAt: string;
    deleted: number;
};
type Output = Card;
type CreateCard = (input: Input) => Promise<Output>;
type SetupCreateCard = {
    repository: ICardRepository;
};
type Setup = (props: SetupCreateCard) => CreateCard;

export const SetupCreateCard: Setup =
    ({ repository }) =>
        async () => {
            try {
                return await repository.createCard({
                    id: "",
                    idPriority: "any",
                    idCategory: "any",
                    idStatus: "any",
                    title: "any",
                    description: "any",
                    createdAt: "any",
                    updatedAt: "any",
                    endedAt: "any",
                    deleted: 0,
                });
            } catch (error) {
                throw new Error("Could not create card", {
                    cause: "create-card",
                });
            }
        };
