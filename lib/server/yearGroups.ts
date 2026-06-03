import { asc, eq, sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { yearGroupsTable } from '@/lib/db/schema';
import { fallbackYearGroups, fetchExternalYearGroups } from '@/lib/yearGroups';

let ensuredYearGroupsTable = false;

export async function ensureYearGroupsTable() {
  if (ensuredYearGroupsTable) return;

  const db = getDb();
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "year_groups" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" text NOT NULL UNIQUE,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `);
  ensuredYearGroupsTable = true;
}

export async function getYearGroupsForServer() {
  await ensureYearGroupsTable();

  const db = getDb();
  const rows = await db.select().from(yearGroupsTable).orderBy(asc(yearGroupsTable.createdAt), asc(yearGroupsTable.name));
  if (rows.length) return rows.map((row) => row.name);

  const externalYears = await fetchExternalYearGroups();
  return externalYears.length ? externalYears : fallbackYearGroups;
}

export async function createYearGroup(name: string) {
  await ensureYearGroupsTable();

  const normalizedName = name.trim();
  if (!normalizedName) throw new Error('Class/year name is required.');

  const db = getDb();
  const [row] = await db
    .insert(yearGroupsTable)
    .values({ name: normalizedName })
    .onConflictDoUpdate({
      target: yearGroupsTable.name,
      set: { name: normalizedName, updatedAt: new Date() },
    })
    .returning();

  return row;
}

export async function deleteYearGroup(id: string) {
  await ensureYearGroupsTable();

  const db = getDb();
  await db.delete(yearGroupsTable).where(eq(yearGroupsTable.id, id));
}

export async function getStoredYearGroups() {
  await ensureYearGroupsTable();

  const db = getDb();
  return db.select().from(yearGroupsTable).orderBy(asc(yearGroupsTable.createdAt), asc(yearGroupsTable.name));
}
