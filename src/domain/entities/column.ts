import type { Card } from "./card";

export type Column = {
    id: string;
    name: string;
    ordernation: string;
    cards: Card[];
    deleted: boolean;
    description: string;
}