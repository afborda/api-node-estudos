DO $$ BEGIN
 CREATE TYPE "public"."user_roles" AS ENUM('student', 'teacher', 'manager');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'student' NOT NULL;