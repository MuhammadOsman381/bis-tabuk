import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { teachers } from '@/lib/db/schema';
import { comparePassword } from '@/lib/server/auth';
import { createTeacherToken } from '@/lib/server/teacherAuth';

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const db = getDb();
    const [teacher] = await db.select().from(teachers).where(eq(teachers.email, normalizedEmail)).limit(1);
    if (!teacher) return NextResponse.json({ error: 'Invalid teacher credentials.' }, { status: 401 });

    const isValidPassword = await comparePassword(password, teacher.passwordHash);
    if (!isValidPassword) return NextResponse.json({ error: 'Invalid teacher credentials.' }, { status: 401 });

    const classes = Array.isArray(teacher.assignedClasses) ? (teacher.assignedClasses as string[]) : [];
    return NextResponse.json({
      ok: true,
      token: createTeacherToken({ id: teacher.id, email: normalizedEmail, classes }),
      teacher: { id: teacher.id, name: teacher.name, email: teacher.email, assignedClasses: classes },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to login teacher.' }, { status: 500 });
  }
}
