import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const category = pgTable("category", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name").notNull(),
	description: varchar("description").notNull(),
});

export type Category = InferSelectModel<typeof category>;
export type NewCategory = InferInsertModel<typeof category>;
