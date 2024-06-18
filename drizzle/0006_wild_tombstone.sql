ALTER TABLE "column" ADD COLUMN "idBoard" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "column" ADD CONSTRAINT "column_idBoard_board_id_fk" FOREIGN KEY ("idBoard") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
