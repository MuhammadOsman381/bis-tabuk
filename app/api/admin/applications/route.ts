import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { applications, users } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';

export async function GET(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDb();
    const rows = await db
      .select({
        id: applications.id,
        userId: applications.userId,
        email: users.email,
        data: applications.data,
        status: applications.status,
        createdAt: applications.createdAt,
        updatedAt: applications.updatedAt,
      })
      .from(applications)
      .leftJoin(users, eq(applications.userId, users.id))
      .orderBy(desc(applications.updatedAt));

    return NextResponse.json({ applications: rows });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load applications.' }, { status: 500 });
  }
}
