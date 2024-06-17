import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { card } from "./card";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";


export const column = pgTable('column', {
  id: uuid('id').defaultRandom().primaryKey(),
  idCard: uuid("idCard").references(() => card.id),
  name: varchar("name").notNull(),
  description: varchar("description", {length: 255}).notNull(),
  deleted: boolean("deleted").notNull()
});


export type Column = InferSelectModel<typeof column>;
export type NewColumn = InferInsertModel<typeof column>;