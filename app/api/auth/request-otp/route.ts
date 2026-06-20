import { NextResponse } from 'next/server';
import { createOtp } from '@/lib/server/auth';
import { sendOtpEmail } from '@/lib/server/mailer';
import { createOtpChallenge } from '@/lib/server/otpChallenge';

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();
    const code = createOtp();
    const challenge = createOtpChallenge(normalizedEmail, code);
    const delivery = await sendOtpEmail(normalizedEmail, code);
    return NextResponse.json({ ok: true, delivery, challenge });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to request OTP.' }, { status: 500 });
  }
}
