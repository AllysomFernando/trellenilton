import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { priority } from "./priority";
import { category } from "./category";
import { status } from "./status";


export const card = sqliteTable('card', {
  id: text('id').primaryKey(),
  idPriority: text("idPriority").references(() => priority.id).notNull(),
  idCategory: text("idCategory").references(() => category.id).notNull(),
  idStatus: text("idStatus").references(() => status.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt").notNull(),
  endedAt: text("endedAt").notNull(),
  deleted: int("deleted").notNull()
});
