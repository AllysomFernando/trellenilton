import { relations } from "drizzle-orm";
import { sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { card } from "./card";
import { category } from "./category";
import { priority } from "./priority";


export const board = sqliteTable('board', {
  id: text('id').primaryKey(),
  idCategory: text("idCategory").references(() => category.id).notNull(),
  idPriority: text("idPriority").references(() => priority.id).notNull(),
  name: text("name").notNull(),
  createdAt: text("createAt").notNull()
});

export const boardRelations = relations(board, ({ many }) => ({
  cards: many(card),
}));