import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { schoolLifeItems } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';
import { deleteCloudinaryAssets } from '@/lib/server/cloudinary';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
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
    const [currentItem] = await db.select().from(schoolLifeItems).where(eq(schoolLifeItems.id, id)).limit(1);
    if (!currentItem) return NextResponse.json({ error: 'School life item not found.' }, { status: 404 });

    if (imagePublicId && imagePublicId !== currentItem.imagePublicId) {
      await deleteCloudinaryAssets([{ publicId: currentItem.imagePublicId ?? undefined, url: currentItem.imageUrl }]);
    }

    const [item] = await db
      .update(schoolLifeItems)
      .set({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        imageUrl,
        imagePublicId,
        updatedAt: new Date(),
      })
      .where(eq(schoolLifeItems.id, id))
      .returning();

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update school life item.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const db = getDb();
    const [item] = await db.select().from(schoolLifeItems).where(eq(schoolLifeItems.id, id)).limit(1);

    if (item) {
      await deleteCloudinaryAssets([{ publicId: item.imagePublicId ?? undefined, url: item.imageUrl }]);
    }

    await db.delete(schoolLifeItems).where(eq(schoolLifeItems.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete school life item.' }, { status: 500 });
  }
}
