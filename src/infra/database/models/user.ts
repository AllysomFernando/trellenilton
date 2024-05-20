import { sqliteTable, text, } from "drizzle-orm/sqlite-core";

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  nome: text("nome").notNull(),
  email: text("senha").notNull()
});
