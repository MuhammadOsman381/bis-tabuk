import postgres from 'postgres';

let schemaReady = false;

export async function ensureSchoolLifeGalleryColumn() {
  if (schemaReady) return;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not configured.');

  const sql = postgres(connectionString, {
    max: 1,
    prepare: false,
    ssl: process.env.DATABASE_SSL === 'false' ? false : 'require',
  });

  try {
    await sql.unsafe('ALTER TABLE "school_life_items" ADD COLUMN IF NOT EXISTS "image_gallery" jsonb NOT NULL DEFAULT \'[]\'::jsonb');
    schemaReady = true;
  } finally {
    await sql.end();
  }
}
