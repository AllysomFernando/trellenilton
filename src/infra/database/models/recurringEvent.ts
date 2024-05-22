import { sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { card } from "./card";


export const recurringEvent = sqliteTable('recurringEvent', {
  id: text('id').primaryKey(),
  idCard: text("idCard").references(() => card.id).notNull(),
  description: text("description").notNull(),
  frequency: text("frequency").notNull(),
  startDate: text("startDate").notNull(),
  endDate: text("endDate").notNull(),
});
