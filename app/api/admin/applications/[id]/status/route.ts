import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { applications, students } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';
import { approveApplication } from '@/lib/server/applicationApproval';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const { status } = (await request.json()) as { status?: 'approve' | 'reject' | 'Pending' };
    if (!status || !['approve', 'reject', 'Pending'].includes(status)) return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });

    if (status === 'approve') {
      const createdStudents = await approveApplication(id);
      return NextResponse.json({ ok: true, students: createdStudents });
    }

    const db = getDb();
    await db.delete(students).where(eq(students.applicationId, id));
    await db.update(applications).set({ status, updatedAt: new Date() }).where(eq(applications.id, id));
    return NextResponse.json({ ok: true, students: [] });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update status.' }, { status: 500 });
  }
}
