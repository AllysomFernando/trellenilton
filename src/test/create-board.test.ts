import {describe, test, expect} from 'bun:test';

type Card = {
    name: string,
    description: string,
    deadLine: Date
}
type Board = {
    cards?: Card[],
    name: string
    deleted: number
}

type CreateBoard = (dto: Board) => Pick<Board, "cards" | "name">
const createBoard: CreateBoard = (dto) => {
    if(dto.name.length < 5){
        throw new Error("The name must be at least with 5 characters ")
    }
    return {
        name: dto.name,
        cards: dto.cards ?? []
    }
}

describe("CreateBoard", () => {
    test("Should create a board", ()=> {
        const goodPath = {
            name: "DiegoBoard",
            deleted: 0
        }
        const response = createBoard(goodPath)
        expect(response).toEqual({
            name: "DiegoBoard",
            cards: []
        })
    })
    test("should throws if pass a name with less than 5 characters", ()=> {
        const badInput = {
            name: "Di",
            deleted: 0
        }
        try{
            createBoard(badInput)
        }catch(error){
            expect(error).toEqual(new Error("Name must be at least 5 characters"));
        }
    })
})