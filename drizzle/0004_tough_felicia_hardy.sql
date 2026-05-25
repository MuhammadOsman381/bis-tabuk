ALTER TABLE "applications" DROP CONSTRAINT "applications_email_hash_unique";--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "chapters" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" DROP COLUMN "email_hash";--> statement-breakpoint
ALTER TABLE "applications" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "materials" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "materials" DROP COLUMN "links";