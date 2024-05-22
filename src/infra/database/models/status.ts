import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const status = sqliteTable('status', {
    id: text('id').primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    deleted: int("deleted").notNull()
});
