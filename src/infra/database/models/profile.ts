import { sqliteTable, text, numeric} from "drizzle-orm/sqlite-core";

export const profile = sqliteTable('user', {
  id: text('id').primaryKey(),
  nome: text("nome").notNull(),
  email: text("senha").notNull(),
  deleted: numeric("0").notNull()
});