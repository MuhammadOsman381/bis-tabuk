import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { students } from '@/lib/db/schema';
import { comparePassword } from '@/lib/server/auth';
import { createStudentToken } from '@/lib/server/studentAuth';

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const db = getDb();
    const matchingStudents = await db.select().from(students).where(sql`lower(${students.guardianEmail}) = ${normalizedEmail}`);

    for (const student of matchingStudents) {
      const isValidPassword = await comparePassword(password, student.lmsPasswordHash);
      if (!isValidPassword) continue;

      return NextResponse.json({
        ok: true,
        token: createStudentToken({
          id: student.id,
          email: normalizedEmail,
          studentName: student.studentName,
          admissionYearGroup: student.admissionYearGroup,
        }),
        student: {
          id: student.id,
          email: normalizedEmail,
          studentName: student.studentName,
          admissionYearGroup: student.admissionYearGroup,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid student credentials.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to login student.' }, { status: 500 });
  }
}
