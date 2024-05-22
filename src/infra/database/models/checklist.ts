import { int, sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { card } from "./card";


export const checklist = sqliteTable('checklist', {
  id: text('id').primaryKey(),
  idCard: text("idCard").references(() => card.id).notNull(),
  title: text("title").notNull(),
  quantity: int("quantity").notNull(),
  deleted: int("deleted").notNull(),
});
