import type { IBoardRepository } from "../contracts/board-repository";
import type { Board } from "../entities/board";


type Input = {
    id: string;
    board: Pick<Board, "name">;
}

type Output = Board;
type UpdateBoard = (input: Input) => Promise<Output>;
type SetupUpdateBoard = {
    repository: IBoardRepository
}
type Setup = (props: SetupUpdateBoard) => UpdateBoard;

export const setupUpdateBoard: Setup = ({ repository }) => async ({ id, board }) => {
    try {
        const boards = await repository.loadAllBoards();
        const boardFind = boards.find(board => board.id === id);
        if (!boardFind) {
            throw new Error(`Board with the id ${id} not found`, {
                cause: "board-not-found"
            });
        }
        if(board.name && board.name.length < 3) {
            throw new Error("Name must be at least 3 characters long", {
                cause: "invalid-board-name"
            });
        }
        console.log("board.name", board.name);
        const updateBoard: Board = {
            ...boardFind,
            name: board.name ?? boardFind.name
        }
        return await repository.updateBoard(id, updateBoard.name);
    }catch(error) {
        console.log(error);
        throw new Error("Could not update board", {
            cause: "update-board"
        });
    }
};