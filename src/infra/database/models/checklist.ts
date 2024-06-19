import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";
import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";
import { card } from "./card";

export const checklist = pgTable("checklist", {
	id: uuid("id").defaultRandom().primaryKey(),
	idCard: uuid("idCard")
		.references(() => card.id)
		.notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	completed: boolean("completed").default(false),
	createdAt: varchar("createdAt", { length: 255 }).notNull(),
	updatedAt: varchar("updatedAt", { length: 255 }).notNull(),
});

export const checklistRelations = relations(checklist, ({ one }) => ({
	card: one(card, {
		fields: [checklist.idCard],
		references: [card.id],
	}),
}));

export type Checklist = InferSelectModel<typeof checklist>;
export type NewChecklist = InferInsertModel<typeof checklist>;
