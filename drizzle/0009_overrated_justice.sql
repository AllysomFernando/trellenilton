CREATE TABLE IF NOT EXISTS "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idCard" uuid NOT NULL,
	"idProfile" uuid NOT NULL,
	"text" varchar(255) NOT NULL,
	"createdAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "columnCard" (
	"idColumn" uuid NOT NULL,
	"idCard" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_idCard_card_id_fk" FOREIGN KEY ("idCard") REFERENCES "public"."card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_idProfile_user_id_fk" FOREIGN KEY ("idProfile") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "columnCard" ADD CONSTRAINT "columnCard_idColumn_column_id_fk" FOREIGN KEY ("idColumn") REFERENCES "public"."column"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "columnCard" ADD CONSTRAINT "columnCard_idCard_card_id_fk" FOREIGN KEY ("idCard") REFERENCES "public"."card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
