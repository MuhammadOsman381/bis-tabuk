import { NextResponse } from 'next/server';
import { eq, sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashEmail } from '@/lib/server/auth';
import { ensureUserSchema } from '@/lib/server/ensureUserSchema';
import { verifyOtpChallenge } from '@/lib/server/otpChallenge';
import { createUserToken } from '@/lib/server/userAuth';

export async function POST(request: Request) {
  try {
    const { email, code, challenge } = (await request.json()) as { email?: string; code?: string; challenge?: string };
    if (!email || !code || !challenge) return NextResponse.json({ error: 'Email, OTP, and verification challenge are required.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    if (!verifyOtpChallenge(challenge, normalizedEmail, code)) {
      return NextResponse.json({ error: 'Invalid or expired OTP.' }, { status: 401 });
    }

    await ensureUserSchema();
    const db = getDb();
    const emailHash = hashEmail(normalizedEmail);
    await db.execute(sql`
      INSERT INTO "users" ("email")
      SELECT ${normalizedEmail}
      WHERE NOT EXISTS (
        SELECT 1 FROM "users" WHERE "email" = ${normalizedEmail}
      )
    `);
    const [user] = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (!user) return NextResponse.json({ error: 'Unable to create user account.' }, { status: 500 });

    return NextResponse.json({
      ok: true,
      token: createUserToken({ id: user.id, email: normalizedEmail }),
      user: { id: user.id, email: normalizedEmail },
      email: normalizedEmail,
      emailHash,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to verify OTP.' }, { status: 500 });
  }
}
