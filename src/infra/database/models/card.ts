import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { board } from "./board";

export const card = sqliteTable('profile_info', {
  id: text('id').primaryKey(),
  name: text('user_id').references(() => board.id).notNull(),
  description: text('description').notNull(),
  deadLine: text('deadLine').notNull(),
  createdAt: text('createAt').notNull()
});
