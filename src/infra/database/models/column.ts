import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";
import { board } from "./board";
import { columnCard } from "./columnCard";

export const column = pgTable("column", {
	id: uuid("id").defaultRandom().primaryKey(),
	idBoard: uuid("idBoard")
		.references(() => board.id)
		.notNull(),
	name: varchar("name").notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	deleted: boolean("deleted").notNull(),
});

export const columnRelations = relations(column, ({ one, many }) => ({
	board: one(board, {
		fields: [column.idBoard],
		references: [board.id],
	}),
	columnCard: many(columnCard),
}));

export type Column = InferSelectModel<typeof column>;
export type NewColumn = InferInsertModel<typeof column>;
