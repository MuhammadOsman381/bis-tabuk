CREATE TABLE IF NOT EXISTS "otp_codes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL,
  "code" text NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "otp_codes"
ADD COLUMN IF NOT EXISTS "expires_at" timestamp with time zone;

ALTER TABLE "otp_codes"
ADD COLUMN IF NOT EXISTS "created_at" timestamp with time zone DEFAULT now();

UPDATE "otp_codes"
SET "expires_at" = now()
WHERE "expires_at" IS NULL;

ALTER TABLE "otp_codes"
ALTER COLUMN "expires_at" SET NOT NULL;

ALTER TABLE "otp_codes"
ALTER COLUMN "created_at" SET DEFAULT now();
