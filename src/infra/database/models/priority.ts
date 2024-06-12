import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const priority = pgTable("priority", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name").notNull(),
	level: varchar("level").notNull(),
});

export type Priority = InferSelectModel<typeof priority>;
export type NewPriority = InferInsertModel<typeof priority>;