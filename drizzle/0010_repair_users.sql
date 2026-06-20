CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL,
  "role" text DEFAULT 'user' NOT NULL,
  "password_hash" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" text DEFAULT 'user';
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "password_hash" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "created_at" timestamp with time zone DEFAULT now();
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now();
ALTER TABLE "users" DROP COLUMN IF EXISTS "email_hash";

UPDATE "users" SET "role" = 'user' WHERE "role" IS NULL;
UPDATE "users" SET "created_at" = now() WHERE "created_at" IS NULL;
UPDATE "users" SET "updated_at" = now() WHERE "updated_at" IS NULL;

ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now();
