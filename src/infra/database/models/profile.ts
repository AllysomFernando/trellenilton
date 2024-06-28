import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";
import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";
import { comment } from "./comment";

export const profile = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	nome: varchar("nome").notNull(),
	email: varchar("email").notNull(),
	deleted: boolean("deleted").notNull(),
});

export const profileRelations = relations(profile, ({ many }) => ({
	comments: many(comment),
}));

export type Profile = InferSelectModel<typeof profile>;
export type NewUser = InferInsertModel<typeof profile>;
