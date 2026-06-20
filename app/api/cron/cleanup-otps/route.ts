import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get('authorization') === `Bearer ${secret}`);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const db = getDb();
    await db.execute(sql.raw(`
      DO $$
      BEGIN
        IF to_regclass('public.otp_codes') IS NOT NULL THEN
          DELETE FROM public.otp_codes;
        END IF;
      END
      $$;
    `));

    return NextResponse.json({ ok: true, message: 'Stored OTP records cleared.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to clear OTP records.' },
      { status: 500 },
    );
  }
}
