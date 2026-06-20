import { sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';

let schemaPromise: Promise<void> | null = null;

async function repairOtpSchema() {
  const db = getDb();

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "otp_codes" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "email" text NOT NULL,
      "code" text NOT NULL,
      "expires_at" timestamp with time zone NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `);

  await db.execute(sql`
    ALTER TABLE "otp_codes"
    ADD COLUMN IF NOT EXISTS "expires_at" timestamp with time zone
  `);
  await db.execute(sql`
    ALTER TABLE "otp_codes"
    ADD COLUMN IF NOT EXISTS "created_at" timestamp with time zone DEFAULT now()
  `);
  await db.execute(sql`
    UPDATE "otp_codes"
    SET "expires_at" = now()
    WHERE "expires_at" IS NULL
  `);
  await db.execute(sql`
    ALTER TABLE "otp_codes"
    ALTER COLUMN "expires_at" SET NOT NULL
  `);
  await db.execute(sql`
    ALTER TABLE "otp_codes"
    ALTER COLUMN "created_at" SET DEFAULT now()
  `);
}

export function ensureOtpSchema() {
  schemaPromise ??= repairOtpSchema().catch((error) => {
    schemaPromise = null;
    throw error;
  });
  return schemaPromise;
}
