import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";

export const profile = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	nome: varchar("nome").notNull(),
	email: varchar("email").notNull(),
	deleted: boolean("deleted").notNull(),
});

export type Profile = InferSelectModel<typeof profile>;
export type NewUser = InferInsertModel<typeof profile>;
