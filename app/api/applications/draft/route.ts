import { NextResponse } from 'next/server';
import { and, desc, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { applications } from '@/lib/db/schema';
import { getUserFromRequest } from '@/lib/server/userAuth';

async function saveApplication(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { data, status = 'Pending' } = await request.json();
    if (!data) return NextResponse.json({ error: 'Application data is required.' }, { status: 400 });

    const db = getDb();
    const [application] = await db.insert(applications).values({ userId: user.id, data, status }).returning();

    return NextResponse.json({ ok: true, application });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save application.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return saveApplication(request);
}

export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDb();
    const rows = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, user.id))
      .orderBy(desc(applications.updatedAt));

    return NextResponse.json({ ok: true, applications: rows });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load applications.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id, data, status = 'Pending' } = await request.json();
    if (!id || !data) return NextResponse.json({ error: 'Application id and data are required.' }, { status: 400 });

    const db = getDb();
    const [application] = await db
      .update(applications)
      .set({ data, status, updatedAt: new Date() })
      .where(and(eq(applications.id, id), eq(applications.userId, user.id)))
      .returning();

    if (!application) return NextResponse.json({ error: 'Application not found.' }, { status: 404 });

    return NextResponse.json({ ok: true, application });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update application.' }, { status: 500 });
  }
}
