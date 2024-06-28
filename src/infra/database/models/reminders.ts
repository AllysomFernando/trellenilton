import { pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { card } from "./card";
import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";

export const reminders = pgTable("reminders", {
	id: uuid("id").defaultRandom().primaryKey(),
	idCard: uuid("idCard")
		.references(() => card.id)
		.notNull(),
	active: boolean("active").notNull(),
});

export const reminderRelations = relations(reminders, ({ one }) => ({
	card: one(card, {
		fields: [reminders.idCard],
		references: [card.id],
	}),
}));

export type Reminders = InferSelectModel<typeof reminders>;
export type NewReminders = InferInsertModel<typeof reminders>;
