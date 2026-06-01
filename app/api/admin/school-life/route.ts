import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { schoolLifeItems } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';

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
    const [item] = await db
      .insert(schoolLifeItems)
      .values({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        imageUrl: primaryImage,
        imagePublicId: primaryPublicId,
        imageGallery: gallery,
      })
      .returning();

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create school life item.' }, { status: 500 });
  }
}
