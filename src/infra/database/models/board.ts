import { relations, type InferSelectModel } from "drizzle-orm";
import { card } from "./card";
import {
	boolean,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const board = pgTable("board", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	deleted: boolean("deleted").notNull(),
	createdAt: timestamp("createAt").notNull(),
});

export const boardRelations = relations(board, ({ many }) => ({
	cards: many(card),
}));

export type Board = InferSelectModel<typeof board>;
export type NewBoard = InferSelectModel<typeof board>;
