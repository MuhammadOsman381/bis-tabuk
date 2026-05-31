import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { schoolLifeItems } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';

export async function GET(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDb();
    const items = await db.select().from(schoolLifeItems).orderBy(desc(schoolLifeItems.createdAt));
    return NextResponse.json({ ok: true, items });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load school life items.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { title, description, category, imageUrl, imagePublicId } = (await request.json()) as {
      title?: string;
      description?: string;
      category?: string;
      imageUrl?: string;
      imagePublicId?: string;
    };

    if (!title?.trim() || !description?.trim() || !category?.trim() || !imageUrl?.trim()) {
      return NextResponse.json({ error: 'Title, description, category, and image are required.' }, { status: 400 });
    }

    const db = getDb();
    const [item] = await db
      .insert(schoolLifeItems)
      .values({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        imageUrl,
        imagePublicId,
      })
      .returning();

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create school life item.' }, { status: 500 });
  }
}
