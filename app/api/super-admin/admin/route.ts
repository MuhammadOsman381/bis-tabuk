import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashPassword } from '@/lib/server/auth';

function getSuperAdminKey() {
  return process.env.SUPER_ADMIN_KEY || process.env.ADMIN_SESSION_SECRET || 'bist-local-super-admin-key';
}

function isAuthorized(request: Request) {
  const key = request.headers.get('x-super-admin-key');
  return Boolean(key && key === getSuperAdminKey());
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const db = getDb();
    const admins = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.role, 'admin'));

    return NextResponse.json({ ok: true, admins });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load admin data.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id, email, password } = (await request.json()) as { id?: string; email?: string; password?: string };
    const normalizedEmail = email?.trim().toLowerCase();

    if (!id) return NextResponse.json({ error: 'Admin id is required.' }, { status: 400 });
    if (!normalizedEmail) return NextResponse.json({ error: 'Admin email is required.' }, { status: 400 });
    if (password !== undefined && password.length > 0 && password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const db = getDb();
    const passwordHash = password ? await hashPassword(password) : undefined;
    const values = {
      email: normalizedEmail,
      role: 'admin',
      ...(passwordHash ? { passwordHash } : {}),
      updatedAt: new Date(),
    };

    const [admin] = await db.update(users).set(values).where(eq(users.id, id)).returning({
      id: users.id,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

    if (!admin) return NextResponse.json({ error: 'Admin not found.' }, { status: 404 });

    return NextResponse.json({ ok: true, admin });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update admin.' }, { status: 500 });
  }
}
