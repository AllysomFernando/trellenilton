import { type InferSelectModel } from "drizzle-orm";
import { card } from "./card";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { board } from "./board";

export const boardCards = pgTable("boardCards", {
	idCard: uuid("idCategory")
		.references(() => card.id)
		.notNull(),
	idBoard: uuid("idBoard")
		.references(() => board.id)
		.notNull(),
});

export type BoardCards = InferSelectModel<typeof boardCards>;
export type NewBoardCards = InferSelectModel<typeof boardCards>;
