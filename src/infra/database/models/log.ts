import { sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { user } from "./profile";

export const log = sqliteTable('log', {
  id: text('id').primaryKey(),
  idUser: text("idUser").references(() => user.id).notNull(), 
  table: text("table").notNull(),
  primaryKey: text("primaryKey").notNull(),
  date: text("date").notNull(),
  action: text("action").notNull(),
  command: text("command").notNull(),
  error: text("error").notNull(),
});
