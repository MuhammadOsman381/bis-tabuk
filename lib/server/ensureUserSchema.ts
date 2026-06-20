import { sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';

let schemaPromise: Promise<void> | null = null;

async function repairUserSchema() {
  const db = getDb();

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "email" text NOT NULL,
      "role" text DEFAULT 'user' NOT NULL,
      "password_hash" text,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `);

  await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" text DEFAULT 'user'`);
  await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "password_hash" text`);
  await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "created_at" timestamp with time zone DEFAULT now()`);
  await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "updated_at" timestamp with time zone DEFAULT now()`);
  await db.execute(sql`ALTER TABLE "users" DROP COLUMN IF EXISTS "email_hash"`);
  await db.execute(sql`UPDATE "users" SET "role" = 'user' WHERE "role" IS NULL`);
  await db.execute(sql`UPDATE "users" SET "created_at" = now() WHERE "created_at" IS NULL`);
  await db.execute(sql`UPDATE "users" SET "updated_at" = now() WHERE "updated_at" IS NULL`);
  await db.execute(sql`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user'`);
  await db.execute(sql`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
  await db.execute(sql`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
}

export function ensureUserSchema() {
  schemaPromise ??= repairUserSchema().catch((error) => {
    schemaPromise = null;
    throw error;
  });
  return schemaPromise;
}
