import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { createAdminToken } from '@/lib/server/adminAuth';
import { comparePassword } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const db = getDb();
    const [admin] = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);

    if (!admin || admin.role !== 'admin' || !admin.passwordHash) {
      return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });
    }

    const isValidPassword = await comparePassword(password, admin.passwordHash);
    if (!isValidPassword) return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });

    return NextResponse.json({ ok: true, token: createAdminToken(normalizedEmail), email: normalizedEmail });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to login admin.' }, { status: 500 });
  }
}
