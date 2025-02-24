import { type InferSelectModel } from "drizzle-orm";
import {
	boolean,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { column } from "./column";

export const board = pgTable("board", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	deleted: boolean("deleted"),
	createdAt: timestamp("createAt"),
});

export const boardRelations = relations(board, ({ many }) => ({
	column: many(column),
}));

export type Board = InferSelectModel<typeof board>;
export type NewBoard = InferSelectModel<typeof board>;
