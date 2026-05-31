import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { schoolLifeItems } from '@/lib/db/schema';

export async function GET() {
  try {
    const db = getDb();
    const items = await db.select().from(schoolLifeItems).orderBy(desc(schoolLifeItems.createdAt));
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load school life items.' }, { status: 500 });
  }
}
