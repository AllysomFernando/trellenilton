import { describe, test, expect } from 'bun:test'

type Card = {
    id?: string,
    idPriority?: string,
    idCategory?: string,
    idStatus?: string,
    title: string,
    description?: string,
    createdAt?: string,
    updatedAt?: string,
    endedAt?: string,
    deleted: number,
}

type CreateCard = (dto: Card) => Pick<Card, "title" | "deleted">
const createCard: CreateCard = (dto) => {
    if (dto.title.length < 5){
        throw new Error("Title must be at least 4 characters")
    }
    return {
        title: dto.title,
        description: dto.description,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        endedAt: dto.endedAt,
        deleted: dto.deleted,
        id: dto.id,
        idPriority: dto.idPriority,
        idCategory: dto.idCategory,
        idStatus: dto.idStatus,
    }
}

describe ("CreateCard", () => {
    test("should create a card", () => {
        const goodPath = {
            title: "teste",
            deleted: 0,
        }
        const response = createCard(goodPath)
        expect(response).toEqual({
            title: "teste",
            deleted: 0,
        })
    })
})