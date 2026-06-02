import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { schoolLifeItems } from '@/lib/db/schema';
import { ensureSchoolLifeGalleryColumn } from '@/lib/server/schoolLifeSchema';

export async function GET() {
  try {
    await ensureSchoolLifeGalleryColumn();
    const db = getDb();
    const items = await db.select().from(schoolLifeItems).orderBy(desc(schoolLifeItems.createdAt));
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load school life items.' }, { status: 500 });
  }
}
