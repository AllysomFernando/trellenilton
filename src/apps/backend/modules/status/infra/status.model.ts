import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const status = pgTable('status', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    description: varchar("description", {length: 255}).notNull(),
    deleted: boolean("deleted").notNull()
});

export type Status = InferSelectModel<typeof status>;
export type NewStatus = InferInsertModel<typeof status>;