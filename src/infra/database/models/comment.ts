import { sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { card } from "./card";
import { user } from "./profile";

export const comment = sqliteTable('comment', {
  id: text('id').primaryKey(),
  idCard: text("idCard").references(() => card.id).notNull(),
  idUser: text("idUser").references(() => user.id).notNull(), 
  text: text("text").notNull(),
  createdAt: text("createAt").notNull()
});
