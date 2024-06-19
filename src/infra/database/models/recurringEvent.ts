import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { card } from "./card";
import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";

export const recurringEvent = pgTable("recurringEvent", {
	id: uuid("id").defaultRandom().primaryKey(),
	idCard: uuid("idCard")
		.references(() => card.id)
		.notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	frequency: varchar("frequency").notNull(),
	startDate: varchar("startDate").notNull(),
	endDate: varchar("endDate").notNull(),
});

export const recurringEventRelations = relations(recurringEvent, ({ one }) => ({
	card: one(card, {
		fields: [recurringEvent.idCard],
		references: [card.id],
	}),
}));

export type RecurringEvent = InferSelectModel<typeof recurringEvent>;
export type NewRecurringEvent = InferInsertModel<typeof recurringEvent>;
