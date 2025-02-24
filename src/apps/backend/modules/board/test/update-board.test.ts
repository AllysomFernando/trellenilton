import {describe, test, expect} from 'bun:test';

type Card = {
  id: string,
  name: string,
  description: string,
  deadLine: Date
}

type Board = {
  id: string,
  cards: Card[],
  name: string,
  deleted: number
}

type UpdateBoard = (dto: Partial<Board> & { id: string }) => Board
const updateBoard: UpdateBoard = (dto) => {
  if (!dto.id) {
    throw new Error("Board id is required");
  }
  if (dto.name && dto.name.length < 3) {
    throw new Error("Board name must be at least 3 characters long");
  }
  const existingBoard: Board = {
    id: dto.id,
    name: "Existing Board",
    cards: [],
    deleted: 0
  };

  return {
    ...existingBoard,
    ...dto
  }
}

describe("UpdateBoard", () => {
  test("Should update a board", () => {
    const goodInput = {
      id: "random_id",
      name: "Updated Board Name",
      cards: [],
      deleted: 0
    }
    const response = updateBoard(goodInput);
    expect(response).toEqual({
      id: "random_id",
      name: "Updated Board Name",
      cards: [],
      deleted: 0
    });
  });

  test("Should throw if id is missing", () => {
    const badInput = {
      name: "Updated Board Name",
      cards: [],
      deleted: 0
    };
    try {
      updateBoard(badInput as any);
    } catch (error) {
      expect(error).toEqual(new Error("Board id is required"));
    }
  });
  test("Should throw if name has less than 3 characters", () => {
    const badInput = {
      id: "random_id",
      name: "Up",
      cards: [],
      deleted: 0
    };
    try {
      updateBoard(badInput);
    } catch (error) {
      expect(error).toEqual(new Error("Board name must be at least 3 characters long"));
    }
  });
});