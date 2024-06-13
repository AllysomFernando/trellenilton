ALTER TABLE "user" RENAME COLUMN "senha" TO "email";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "deleted" boolean NOT NULL;