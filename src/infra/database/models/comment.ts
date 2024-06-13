import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { card } from "./card";
import { user } from "./user";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const comment = pgTable('comment', {
  id: uuid('id').defaultRandom().primaryKey(),
  idCard: uuid("idCard").references(() => card.id).notNull(),
  idUser: uuid("idUser").references(() => user.id).notNull(), 
  text: varchar("text", {length: 255}).notNull(),
  createdAt: varchar("createAt").notNull()
});


export type Comment = InferSelectModel  <typeof comment>;
export type NewComment = InferInsertModel<typeof comment>;