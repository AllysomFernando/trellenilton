import { relations } from "drizzle-orm";
import { sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { card } from "./card";


export const board = sqliteTable('board', {
  id: text('id').primaryKey(),
  name: text("name").notNull(),
  createdAt: text("createAt").notNull()
});

export const boardRelations = relations(board, ({ many }) => ({
  cards: many(card),
}));