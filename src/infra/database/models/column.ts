import { sqliteTable, text, int} from "drizzle-orm/sqlite-core";
import { card } from "./card";
export const column = sqliteTable('column', {
  id: text('id').primaryKey(),
  idCard: text("idCard").references(() => card.id).notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  deleted: int("deleted").notNull()
});
