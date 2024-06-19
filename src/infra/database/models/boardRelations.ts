import { relations } from "drizzle-orm";
import { board } from "./board";
import { column } from "./column";

export const boardRelations = relations(board, ({ many }) => ({
	columns: many(column),
}));
