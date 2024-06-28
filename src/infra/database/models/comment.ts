import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { card } from "./card";
import { profile } from "./profile";
import {
	relations,
	type InferInsertModel,
	type InferSelectModel,
} from "drizzle-orm";

export const comment = pgTable("comment", {
	id: uuid("id").defaultRandom().primaryKey(),
	idCard: uuid("idCard")
		.references(() => card.id)
		.notNull(),
	idProfile: uuid("idProfile")
		.references(() => profile.id)
		.notNull(),
	text: varchar("text", { length: 255 }).notNull(),
	createdAt: varchar("createdAt").notNull(),
});

export const commentRelations = relations(comment, ({ one }) => ({
	card: one(card, {
		fields: [comment.idCard],
		references: [card.id],
	}),
	profile: one(profile, {
		fields: [comment.idProfile],
		references: [profile.id],
	}),
}));

export type Comment = InferSelectModel<typeof comment>;
export type NewComment = InferInsertModel<typeof comment>;
