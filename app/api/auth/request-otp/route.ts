import { NextResponse } from 'next/server';
import { and, eq, lt } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { otpCodes, users } from '@/lib/db/schema';
import { createOtp, hashEmail } from '@/lib/server/auth';
import { sendOtpEmail } from '@/lib/server/mailer';

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const emailHash = hashEmail(normalizedEmail);
    const db = getDb();
    const code = createOtp();
    await db.delete(otpCodes).where(lt(otpCodes.expiresAt, new Date()));
    const expiresAt = new Date(Date.now() + 60 * 1000);

    await db.insert(users).values({ email: normalizedEmail, emailHash }).onConflictDoNothing({ target: users.email });
    await db.delete(otpCodes).where(eq(otpCodes.email, normalizedEmail));
    await db.insert(otpCodes).values({ email: normalizedEmail, code, expiresAt });
    const cleanupTimer = setTimeout(async () => {
      try {
        await db.delete(otpCodes).where(and(eq(otpCodes.email, normalizedEmail), eq(otpCodes.code, code)));
      } catch {}
    }, 60 * 1000);
    cleanupTimer.unref?.();

    const delivery = await sendOtpEmail(normalizedEmail, code);
    return NextResponse.json({ ok: true, delivery });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to request OTP.' }, { status: 500 });
  }
}
