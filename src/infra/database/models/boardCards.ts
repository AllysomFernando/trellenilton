import { type InferSelectModel } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { board } from "./board";
import { column } from "./column";

export const boardColumn = pgTable("boardColumn", {
	idColumn: uuid("idColumn")
		.references(() => column.id)
		.notNull(),
	idBoard: uuid("idBoard")
		.references(() => board.id)
		.notNull(),
});

export type BoardColumn = InferSelectModel<typeof boardColumn>;
export type NewBoardColumn = InferSelectModel<typeof boardColumn>;
