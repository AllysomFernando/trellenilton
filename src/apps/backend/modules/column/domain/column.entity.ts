import type { Card } from "../modules/card/Card";

export type Column = {
	id: string;
	name: string;
	ordernation: string;
	status: string;
	cards: Card[];
	deleted: boolean;
	description: string;
};
