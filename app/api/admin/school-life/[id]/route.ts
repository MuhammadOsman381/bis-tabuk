import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { schoolLifeItems } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';
import { deleteCloudinaryAssets } from '@/lib/server/cloudinary';
import { ensureSchoolLifeGalleryColumn } from '@/lib/server/schoolLifeSchema';

type GalleryImage = {
  url: string;
  publicId?: string;
};

function normalizeGallery(value: unknown): GalleryImage[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const image = item as GalleryImage;
      return image.url ? { url: image.url, publicId: image.publicId } : null;
    })
    .filter(Boolean)
    .slice(0, 3) as GalleryImage[];
}

function collectGalleryAssets(value: unknown, fallback?: { url?: string; publicId?: string | null }) {
  const assets = normalizeGallery(value).map((image) => ({ url: image.url, publicId: image.publicId }));
  if (!assets.length && fallback?.url) assets.push({ url: fallback.url, publicId: fallback.publicId ?? undefined });
  return assets;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    await ensureSchoolLifeGalleryColumn();
    const { id } = await params;
    const { title, description, category, imageUrl, imagePublicId, imageGallery } = (await request.json()) as {
      title?: string;
      description?: string;
      category?: string;
      imageUrl?: string;
      imagePublicId?: string;
      imageGallery?: GalleryImage[];
    };
    const gallery = normalizeGallery(imageGallery);
    const primaryImage = imageUrl || gallery[0]?.url;
    const primaryPublicId = imagePublicId || gallery[0]?.publicId;

    if (!title?.trim() || !description?.trim() || !category?.trim() || !primaryImage?.trim() || gallery.length !== 3) {
      return NextResponse.json({ error: 'Title, description, category, and exactly 3 images are required.' }, { status: 400 });
    }

    const db = getDb();
    const [currentItem] = await db.select().from(schoolLifeItems).where(eq(schoolLifeItems.id, id)).limit(1);
    if (!currentItem) return NextResponse.json({ error: 'School life item not found.' }, { status: 404 });

    const currentAssets = collectGalleryAssets(currentItem.imageGallery, { url: currentItem.imageUrl, publicId: currentItem.imagePublicId });
    const nextAssetKeys = new Set(gallery.map((image) => image.publicId || image.url));
    const staleAssets = currentAssets.filter((asset) => !nextAssetKeys.has(asset.publicId || asset.url || ''));

    if (staleAssets.length) {
      await deleteCloudinaryAssets(staleAssets);
    }

    const [item] = await db
      .update(schoolLifeItems)
      .set({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        imageUrl: primaryImage,
        imagePublicId: primaryPublicId,
        imageGallery: gallery,
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

    await ensureSchoolLifeGalleryColumn();
    const { id } = await params;
    const db = getDb();
    const [item] = await db.select().from(schoolLifeItems).where(eq(schoolLifeItems.id, id)).limit(1);

    if (item) {
      await deleteCloudinaryAssets(collectGalleryAssets(item.imageGallery, { url: item.imageUrl, publicId: item.imagePublicId }));
    }

    await db.delete(schoolLifeItems).where(eq(schoolLifeItems.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete school life item.' }, { status: 500 });
  }
}
