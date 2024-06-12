import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { user } from "./user";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const log = pgTable('log', {
  id: uuid('id').defaultRandom().primaryKey(),
  idUser: uuid("idUser").references(() => user.id).notNull(), 
  table: varchar("table").notNull(),
  primaryKey: varchar("primaryKey").notNull(),
  date: varchar("date").notNull(),
  action: varchar("action", {length: 255}).notNull(),
  command: varchar("command", {length: 255}).notNull(),
  error: varchar("error", {length: 255}).notNull(),
});


export type Log = InferSelectModel  <typeof log>;
export type NewLog = InferInsertModel<typeof log>;