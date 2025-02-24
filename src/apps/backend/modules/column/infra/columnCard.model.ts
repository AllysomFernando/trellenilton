import { pgTable, uuid } from "drizzle-orm/pg-core";
import { column } from "./column.model";
import { card } from "./card";
import { relations } from "drizzle-orm";

export const columnCard = pgTable("columnCard", {
	idColumn: uuid("idColumn")
		.references(() => column.id)
		.notNull(),
	idCard: uuid("idCard")
		.references(() => card.id)
		.notNull(),
});

export const columnCardsRelations = relations(columnCard, ({ one }) => ({
	column: one(column, {
		fields: [columnCard.idColumn],
		references: [column.id],
	}),
	card: one(card, {
		fields: [columnCard.idCard],
		references: [card.id],
	}),
}));
