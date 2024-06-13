import { pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { card } from "./card";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const reminders = pgTable('reminders', {
  id: uuid('id').defaultRandom().primaryKey(),
  idCard: uuid("idCard").references(() => card.id).notNull(),
  active: boolean("active").notNull()
});

export type Reminders = InferSelectModel<typeof reminders>;
export type NewReminders = InferInsertModel<typeof reminders>;