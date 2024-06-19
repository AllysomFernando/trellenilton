ALTER TABLE "column" DROP CONSTRAINT "column_idCard_card_id_fk";
--> statement-breakpoint
ALTER TABLE "checklist" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "checklist" ADD COLUMN "completed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "checklist" ADD COLUMN "createdAt" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "checklist" ADD COLUMN "updatedAt" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "column" DROP COLUMN IF EXISTS "idCard";--> statement-breakpoint
ALTER TABLE "checklist" DROP COLUMN IF EXISTS "quantity";--> statement-breakpoint
ALTER TABLE "checklist" DROP COLUMN IF EXISTS "deleted";--> statement-breakpoint
ALTER TABLE "card" ADD CONSTRAINT "card_idPriority_unique" UNIQUE("idPriority");--> statement-breakpoint
ALTER TABLE "card" ADD CONSTRAINT "card_idCategory_unique" UNIQUE("idCategory");--> statement-breakpoint
ALTER TABLE "card" ADD CONSTRAINT "card_idStatus_unique" UNIQUE("idStatus");