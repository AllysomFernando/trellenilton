CREATE TABLE IF NOT EXISTS "boardCards" (
	"idCategory" uuid NOT NULL,
	"idBoard" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boardCards" ADD CONSTRAINT "boardCards_idCategory_card_id_fk" FOREIGN KEY ("idCategory") REFERENCES "public"."card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "boardCards" ADD CONSTRAINT "boardCards_idBoard_board_id_fk" FOREIGN KEY ("idBoard") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
