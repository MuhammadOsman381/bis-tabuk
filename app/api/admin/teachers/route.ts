import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { teachers } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';
import { hashPassword } from '@/lib/server/auth';
import { sendTeacherAccessEmail } from '@/lib/server/mailer';
import { getYearGroupsForServer } from '@/lib/server/yearGroups';

function generatePassword() {
  return `BIST-T-${randomBytes(4).toString('hex').toUpperCase()}`;
}

export async function GET(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    const db = getDb();
    const rows = await db.select().from(teachers).orderBy(desc(teachers.updatedAt));
    return NextResponse.json({
      teachers: rows.map((teacher) => ({
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        assignedClasses: teacher.assignedClasses,
        createdAt: teacher.createdAt,
        updatedAt: teacher.updatedAt,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load teachers.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { name, email, assignedClasses } = (await request.json()) as { name?: string; email?: string; assignedClasses?: string[] };
    if (!name || !email || !assignedClasses?.length) return NextResponse.json({ error: 'Name, email, and classes are required.' }, { status: 400 });

    const yearGroups = await getYearGroupsForServer();
    const validClasses = assignedClasses.filter((className) => yearGroups.includes(className));
    if (!validClasses.length) return NextResponse.json({ error: 'Please select valid classes.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const password = generatePassword();
    const passwordHash = await hashPassword(password);
    const db = getDb();

    const [teacher] = await db
      .insert(teachers)
      .values({ name, email: normalizedEmail, passwordHash, assignedClasses: validClasses })
      .onConflictDoUpdate({
        target: teachers.email,
        set: { name, passwordHash, assignedClasses: validClasses, updatedAt: new Date() },
      })
      .returning({ id: teachers.id, name: teachers.name, email: teachers.email, assignedClasses: teachers.assignedClasses });

    await sendTeacherAccessEmail({ teacherEmail: normalizedEmail, teacherName: name, password, assignedClasses: validClasses });

    return NextResponse.json({ ok: true, teacher });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create teacher.' }, { status: 500 });
  }
}
