import { NextResponse } from 'next/server';
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

export async function PUT(request: Request) {
  return saveApplication(request);
}
