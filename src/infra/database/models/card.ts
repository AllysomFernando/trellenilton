import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";
import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";
import { columnCard } from "./columnCard";
import { priority } from "./priority";
import { category } from "./category";
import { status } from "./status";
import { checklist } from "./checklist";
import { comment } from "./comment";
import { recurringEvent } from "./recurringEvent";
import { reminders } from "./reminders";

export const card = pgTable("card", {
	id: uuid("id").defaultRandom().primaryKey(),
	idPriority: uuid("idPriority")
		.references(() => priority.id)
		.notNull()
		.unique(),
	idCategory: uuid("idCategory")
		.references(() => category.id)
		.notNull()
		.unique(),
	idStatus: uuid("idStatus")
		.references(() => status.id)
		.notNull()
		.unique(),
	title: varchar("title", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	createdAt: varchar("createdAt", { length: 255 }).notNull(),
	updatedAt: varchar("updatedAt", { length: 255 }).notNull(),
	endedAt: varchar("endedAt", { length: 255 }).notNull(),
	deleted: boolean("deleted").notNull(),
});

export const cardRelations = relations(card, ({ one, many }) => ({
	columnCard: many(columnCard),
	priority: one(priority, {
		fields: [card.idPriority],
		references: [priority.id],
	}),
	category: one(category, {
		fields: [card.idCategory],
		references: [category.id],
	}),
	status: one(status, {
		fields: [card.idStatus],
		references: [status.id],
	}),
	checklists: many(checklist),
	comments: many(comment),
	recurringEvent: many(recurringEvent),
	reminders: many(reminders),
}));

export type Card = InferSelectModel<typeof card>;
export type NewCard = InferInsertModel<typeof card>;
