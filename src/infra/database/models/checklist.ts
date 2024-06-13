import { boolean, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { card } from "./card";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";


export const checklist = pgTable('checklist', {
  id: uuid('id').defaultRandom().primaryKey(),
  idCard: uuid("idCard").references(() => card.id).notNull(),
  title: varchar("title").notNull(),
  quantity: integer("quantity").notNull(),
  deleted: boolean("deleted").notNull(),
});


export type Checklist = InferSelectModel<typeof checklist>;
export type NewChecklist = InferInsertModel<typeof checklist>;