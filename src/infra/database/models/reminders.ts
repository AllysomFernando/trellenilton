import { int, sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { card } from "./card";

export const reminders = sqliteTable('reminders', {
  id: text('id').primaryKey(),
  idCard: text("idCard").references(() => card.id).notNull(),
  active: int("active").notNull()
});
