import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { materials } from '@/lib/db/schema';
import { getStudentFromRequest } from '@/lib/server/studentAuth';

export async function GET(request: Request) {
  try {
    const student = getStudentFromRequest(request);
    if (!student) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDb();
    const rows = await db
      .select()
      .from(materials)
      .where(eq(materials.className, student.admissionYearGroup))
      .orderBy(desc(materials.createdAt));

    return NextResponse.json({ materials: rows });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load student materials.' }, { status: 500 });
  }
}
