CREATE TABLE IF NOT EXISTS "board" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"deleted" boolean NOT NULL,
	"createAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "card" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idPriority" uuid NOT NULL,
	"idCategory" uuid NOT NULL,
	"idStatus" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"createdAt" varchar(255) NOT NULL,
	"updatedAt" varchar(255) NOT NULL,
	"endedAt" varchar(255) NOT NULL,
	"deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "column" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idCard" uuid NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar(255) NOT NULL,
	"deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recurringEvent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idCard" uuid NOT NULL,
	"description" varchar(255) NOT NULL,
	"frequency" varchar NOT NULL,
	"startDate" varchar NOT NULL,
	"endDate" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar NOT NULL,
	"senha" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "checklist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idCard" uuid NOT NULL,
	"title" varchar NOT NULL,
	"quantity" integer NOT NULL,
	"deleted" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idUser" uuid NOT NULL,
	"table" varchar NOT NULL,
	"primaryKey" varchar NOT NULL,
	"date" varchar NOT NULL,
	"action" varchar(255) NOT NULL,
	"command" varchar(255) NOT NULL,
	"error" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "priority" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"level" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reminders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idCard" uuid NOT NULL,
	"active" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar(255) NOT NULL,
	"deleted" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_idPriority_priority_id_fk" FOREIGN KEY ("idPriority") REFERENCES "public"."priority"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_idCategory_category_id_fk" FOREIGN KEY ("idCategory") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_idStatus_status_id_fk" FOREIGN KEY ("idStatus") REFERENCES "public"."status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "column" ADD CONSTRAINT "column_idCard_card_id_fk" FOREIGN KEY ("idCard") REFERENCES "public"."card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recurringEvent" ADD CONSTRAINT "recurringEvent_idCard_card_id_fk" FOREIGN KEY ("idCard") REFERENCES "public"."card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "checklist" ADD CONSTRAINT "checklist_idCard_card_id_fk" FOREIGN KEY ("idCard") REFERENCES "public"."card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "log" ADD CONSTRAINT "log_idUser_user_id_fk" FOREIGN KEY ("idUser") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reminders" ADD CONSTRAINT "reminders_idCard_card_id_fk" FOREIGN KEY ("idCard") REFERENCES "public"."card"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
