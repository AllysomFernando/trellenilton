import { priority } from "./priority";
import { category } from "./category";
import { status } from "./status";
import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";


export const card = pgTable('card', {
  id: uuid('id').defaultRandom().primaryKey(),
  idPriority: uuid("idPriority").references(() => priority.id).notNull(),
  idCategory: uuid("idCategory").references(() => category.id).notNull(),
  idStatus: uuid("idStatus").references(() => status.id).notNull(),
  title: varchar("title", {length: 255}).notNull(),
  description: varchar("description", {length: 255}).notNull(),
  createdAt: varchar("createdAt", {length: 255}).notNull(),
  updatedAt: varchar("updatedAt", {length: 255}).notNull(),
  endedAt: varchar("endedAt", {length: 255}).notNull(),
  deleted: boolean("deleted").notNull()
});


export type Card = InferSelectModel<typeof card>;
export type NewCard = InferInsertModel<typeof card>;