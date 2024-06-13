import type { Card } from "./card";

export type Board = {
  cards: Card[],
  id: string,
  name: string
  deleted: boolean
  createdAt: string
}
