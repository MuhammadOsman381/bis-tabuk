import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashEmail, hashPassword } from '@/lib/server/auth';

export async function GET() {
  try {
    const email = 'admin@gmail.com';
    const passwordHash = await hashPassword('12345678');
    const db = getDb();
    await db
      .insert(users)
      .values({ email, emailHash: hashEmail(email), role: 'admin', passwordHash })
      .onConflictDoUpdate({
        target: users.email,
        set: { role: 'admin', passwordHash, updatedAt: new Date() },
      });

    return NextResponse.json({ ok: true, email });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create admin.' }, { status: 500 });
  }
}
