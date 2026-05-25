import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { materials } from '@/lib/db/schema';
import { getTeacherFromRequest } from '@/lib/server/teacherAuth';

type MaterialParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: MaterialParams) {
  try {
    const teacher = getTeacherFromRequest(request);
    if (!teacher) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const payload = (await request.json()) as {
      className?: string;
      title?: string;
      description?: string;
      link?: string;
      chapters?: { name?: string; description?: string; link?: string }[];
    };
    const className = payload.className?.trim() ?? '';
    const title = payload.title?.trim() ?? '';

    const submittedChapters = Array.isArray(payload.chapters)
      ? payload.chapters
      : [{ name: payload.description ? 'Chapter 1' : payload.title, description: payload.description, link: payload.link }];

    const chapters = submittedChapters.map((chapter) => ({
      name: chapter.name?.trim() ?? '',
      description: chapter.description?.trim() ?? '',
      link: chapter.link?.trim() ?? '',
    }));

    if (!className || !title) {
      return NextResponse.json({ error: 'Class and material name are required.' }, { status: 400 });
    }

    if (!chapters.length || chapters.some((chapter) => !chapter.name || !chapter.description || !chapter.link)) {
      return NextResponse.json({ error: 'Each chapter needs a name, description, and link.' }, { status: 400 });
    }

    if (!teacher.classes.includes(className)) {
      return NextResponse.json({ error: 'You can only assign material to your assigned classes.' }, { status: 403 });
    }

    const db = getDb();
    const [material] = await db
      .update(materials)
      .set({ className, title, chapters, updatedAt: new Date() })
      .where(and(eq(materials.id, id), eq(materials.teacherId, teacher.id)))
      .returning();

    if (!material) return NextResponse.json({ error: 'Material not found.' }, { status: 404 });

    return NextResponse.json({ ok: true, material });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update material.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: MaterialParams) {
  try {
    const teacher = getTeacherFromRequest(request);
    if (!teacher) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const db = getDb();
    const [deletedMaterial] = await db
      .delete(materials)
      .where(and(eq(materials.id, id), eq(materials.teacherId, teacher.id)))
      .returning({ id: materials.id });

    if (!deletedMaterial) return NextResponse.json({ error: 'Material not found.' }, { status: 404 });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete material.' }, { status: 500 });
  }
}
