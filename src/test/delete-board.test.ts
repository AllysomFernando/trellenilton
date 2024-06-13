import {describe, test, expect} from 'bun:test';

type Card = {
    name: string,
    description: string,
    deadLine: Date
}
type Board = {
    id: string,
    cards?: Card[],
    name?: string
    deleted: number
}

type DeleteBoard = (dto: Board) => Pick<Board, 'id' | 'deleted'>
const deleteBoard: DeleteBoard = (dto) => {
    if(dto.deleted === 0){
        throw new Error("Something went wrong trying to delete the board")
    }
    return {
        id: dto.id,
        deleted: dto.deleted
    }
}

describe("Deleted", () => {
    test("Should deleted a board", ()=> {
        const goodPath = {
            id: "random_id",
            deleted: 1
        }
        const response = deleteBoard(goodPath)
        expect(response).toEqual({
            id: 'random_id',
            deleted: 1
        })
    })
    test("should throws if deleted equals 0", ()=> {
        const badInput = {
            id: 'random_id',
            deleted: 0
        }
        try{
            deleteBoard(badInput)
        }catch(error){
            expect(error).toEqual(new Error("Something went wrong trying to delete the board"));
        }
    })
})