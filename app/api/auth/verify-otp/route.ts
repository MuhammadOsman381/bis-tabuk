import { NextResponse } from 'next/server';
import { and, eq, gt, lt, sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { otpCodes, users } from '@/lib/db/schema';
import { hashEmail } from '@/lib/server/auth';
import { ensureOtpSchema } from '@/lib/server/ensureOtpSchema';
import { ensureUserSchema } from '@/lib/server/ensureUserSchema';
import { createUserToken } from '@/lib/server/userAuth';

export async function POST(request: Request) {
  try {
    const { email, code } = (await request.json()) as { email?: string; code?: string };
    if (!email || !code) return NextResponse.json({ error: 'Email and OTP are required.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    await Promise.all([ensureOtpSchema(), ensureUserSchema()]);
    const db = getDb();
    await db.delete(otpCodes).where(lt(otpCodes.expiresAt, new Date()));
    const [otp] = await db
      .select()
      .from(otpCodes)
      .where(and(eq(otpCodes.email, normalizedEmail), eq(otpCodes.code, code), gt(otpCodes.expiresAt, new Date())))
      .limit(1);

    if (!otp) return NextResponse.json({ error: 'Invalid or expired OTP.' }, { status: 401 });

    await db.delete(otpCodes).where(eq(otpCodes.email, normalizedEmail));

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
