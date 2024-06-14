import type { Card } from "../entities/card";
import type { ICardRepository } from "../contracts/card-repository";

type Input = {
    title: string;
    id: string;
};
type Output = {
    card: Card;
};
type RenameCard = (input: Input) => Promise<Output>;
type SetupRenameCard = {
    repository: ICardRepository;
};
type Setup = (props: SetupRenameCard) => RenameCard;

export const setupRenameCard: Setup = 
    ({ repository }) =>
        async ({ title, id }) => {
            const renamedCard = await repository.renameCard(title, id);
            return { card: renamedCard };
        }