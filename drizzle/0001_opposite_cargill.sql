CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"instructorId" uuid NOT NULL,
	CONSTRAINT "courses_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructorId_users_id_fk" FOREIGN KEY ("instructorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;