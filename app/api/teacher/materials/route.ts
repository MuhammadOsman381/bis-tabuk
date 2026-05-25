import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { materials } from '@/lib/db/schema';
import { getTeacherFromRequest } from '@/lib/server/teacherAuth';

export async function GET(request: Request) {
  try {
    const teacher = getTeacherFromRequest(request);
    if (!teacher) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDb();
    const rows = await db.select().from(materials).where(eq(materials.teacherId, teacher.id)).orderBy(desc(materials.createdAt));
    return NextResponse.json({ materials: rows });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load materials.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const teacher = getTeacherFromRequest(request);
    if (!teacher) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const payload = (await request.json()) as {
      className?: string;
      title?: string;
      description?: string;
      link?: string;
      links?: string[];
      chapters?: { name?: string; description?: string; link?: string }[];
      materials?: { title?: string; description?: string; link?: string }[];
    };
    const className = payload.className?.trim() ?? '';
    const title = payload.title?.trim() ?? '';
    if (!className || !title) return NextResponse.json({ error: 'Class and material name are required.' }, { status: 400 });
    if (!teacher.classes.includes(className)) return NextResponse.json({ error: 'You can only create material for your assigned classes.' }, { status: 403 });

    const submittedChapters = Array.isArray(payload.chapters)
      ? payload.chapters
      : (Array.isArray(payload.materials)
          ? payload.materials.map((material) => ({ name: material.title, description: material.description, link: material.link }))
          : [{ name: payload.description ? 'Chapter 1' : payload.title, description: payload.description, link: payload.link ?? payload.links?.filter(Boolean)[0] }]);

    const chapters = submittedChapters.map((chapter) => ({
      name: chapter.name?.trim() ?? '',
      description: chapter.description?.trim() ?? '',
      link: chapter.link?.trim() ?? '',
    }));

    if (!chapters.length || chapters.some((chapter) => !chapter.name || !chapter.description || !chapter.link)) {
      return NextResponse.json({ error: 'Each chapter needs a name, description, and link.' }, { status: 400 });
    }

    const db = getDb();
    const [material] = await db
      .insert(materials)
      .values({
        teacherId: teacher.id,
        className,
        title,
        chapters,
      })
      .returning();

    return NextResponse.json({ ok: true, material });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create material.' }, { status: 500 });
  }
}
