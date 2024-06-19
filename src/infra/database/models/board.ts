import { relations, type InferSelectModel } from "drizzle-orm";
import {
	boolean,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { column } from "./column";

export const board = pgTable("board", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	deleted: boolean("deleted"),
	createdAt: timestamp("createAt")
});


export type Board = InferSelectModel<typeof board>;
export type NewBoard = InferSelectModel<typeof board>;
