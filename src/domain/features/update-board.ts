import type { IBoardRepository } from "../contracts/board-repository";
import type { Board } from "../entities/board";
import type { Card } from "../entities/card";


type Input = {
    id: string;
    name?: string;
    cards?: Card[];
    deleted?: number;
}

type Output = Board;
type UpdateBoard = (input: Input) => Promise<Output>;
type SetupUpdateBoard = {
    repository: IBoardRepository
}
type Setup = (props: SetupUpdateBoard) => UpdateBoard;

export const setupUpdateBoard: Setup = ({ repository }) => async ({ id, name, cards, deleted }) => {
    try {
        const boards = await repository.loadAllBoards();
        const board = boards.find(board => board.id === id);
        if (!board) {
            throw new Error(`Board with the id ${id} not found`, {
                cause: "board-not-found"
            });
        }
        const updateBoard: Board = {
            ...board,
            name: name ?? board.name,
            cards: cards ?? board.cards,
            deleted: deleted ?? board.deleted
        }

        return await repository.updateBoard(updateBoard, id);
    }catch(error) {
        throw new Error("Could not update board", {
            cause: "update-board"
        });
    }
};