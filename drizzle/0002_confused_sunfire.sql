ALTER TABLE "courses" DROP CONSTRAINT "courses_instructorId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "instructorId";