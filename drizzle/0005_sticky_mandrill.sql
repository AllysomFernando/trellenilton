ALTER TABLE "boardCards" RENAME TO "boardColumn";--> statement-breakpoint
ALTER TABLE "boardColumn" RENAME COLUMN "idCategory" TO "idColumn";--> statement-breakpoint
ALTER TABLE "boardColumn" DROP CONSTRAINT "boardCards_idCategory_card_id_fk";
--> statement-breakpoint
ALTER TABLE "boardColumn" DROP CONSTRAINT "boardCards_idBoard_board_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boardColumn" ADD CONSTRAINT "boardColumn_idColumn_column_id_fk" FOREIGN KEY ("idColumn") REFERENCES "public"."column"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boardColumn" ADD CONSTRAINT "boardColumn_idBoard_board_id_fk" FOREIGN KEY ("idBoard") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
