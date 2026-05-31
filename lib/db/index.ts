import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

let client: postgres.Sql | null = null;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured.');
  }

  client ??= postgres(connectionString, {
    max: 1,
    prepare: false,
    ssl: process.env.DATABASE_SSL === 'false' ? false : 'require',
  });

  return drizzle(client, { schema });
}
