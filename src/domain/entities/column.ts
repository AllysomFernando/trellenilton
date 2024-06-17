import type { Card } from "./card";

export type Column = {
    id: string;
    ordernation: string;
    cards: Card[];
    deleted: boolean;
}