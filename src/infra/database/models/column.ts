import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { card } from "./card";
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { board } from "./board";

export const column = pgTable("column", {
	id: uuid("id").defaultRandom().primaryKey(),
	idBoard: uuid("idBoard")
		.references(() => board.id)
		.notNull(),
	idCard: uuid("idCard").references(() => card.id),
	name: varchar("name").notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	deleted: boolean("deleted").notNull(),
});

export type Column = InferSelectModel<typeof column>;
export type NewColumn = InferInsertModel<typeof column>;
