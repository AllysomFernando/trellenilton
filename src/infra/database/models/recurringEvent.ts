import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { card } from "./card";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";


export const recurringEvent = pgTable('recurringEvent', {
  id: uuid('id').defaultRandom().primaryKey(),
  idCard: uuid("idCard").references(() => card.id).notNull(),
  description: varchar("description", {length: 255}).notNull(),
  frequency: varchar("frequency").notNull(),
  startDate: varchar("startDate").notNull(),
  endDate: varchar("endDate").notNull(),
});

export type RecurringEvent = InferSelectModel<typeof recurringEvent>;
export type NewRecurringEvent = InferInsertModel<typeof recurringEvent>;