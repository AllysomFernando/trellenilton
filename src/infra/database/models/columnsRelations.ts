import { relations } from "drizzle-orm";
import { column } from "./column";
import { board } from "./board";

export const columnRelations = relations(column, ({ one }) => ({
	board: one(board),
}));
