import { sqliteTable, text, } from "drizzle-orm/sqlite-core";

export const priority = sqliteTable('priority', {
  id: text('id').primaryKey(),
  name: text("name").notNull(),
  level: text("level").notNull()
});
