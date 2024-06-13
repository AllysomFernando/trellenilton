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

//TODO: allocate correct types in setupCreateCard

export const SetupCreateCard: Setup =
    ({ repository }) =>
        async () => {
            try {
                return await repository.createCard({
                    id: "",
                    idPriority: "", 
                    idCategory: "",
                    idStatus: "",
                    title: "",
                    description: "",
                    createdAt: "",
                    updatedAt: "",
                    endedAt: "",
                    deleted: 0,
                });
            } catch (error) {
                throw new Error("Could not create card", {
                    cause: "create-card",
                });
            }
        };
