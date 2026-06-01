import { NextResponse } from 'next/server';

const externalAdminUrl = process.env.EXTERNAL_ADMIN_LOGIN_URL || 'https://isksafh.vercel.app/api/admin-login';
const externalAdminKey = process.env.EXTERNAL_ADMIN_SUPER_KEY;

function getSuperAdminKey() {
  return process.env.SUPER_ADMIN_KEY || process.env.ADMIN_SESSION_SECRET || 'bist-local-super-admin-key';
}

function isAuthorized(request: Request) {
  const key = request.headers.get('x-super-admin-key');
  return Boolean(key && key === getSuperAdminKey());
}

async function readExternalResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';
  const text = await response.text();

  if (contentType.includes('text/html') || text.trimStart().startsWith('<!DOCTYPE') || text.trimStart().startsWith('<html')) {
    return {
      error: `External admin endpoint returned ${response.status}. Check EXTERNAL_ADMIN_LOGIN_URL or confirm the remote /api/admin-login route exists.`,
    };
  }

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text.slice(0, 240) };
  }
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    if (!externalAdminKey) return NextResponse.json({ error: 'EXTERNAL_ADMIN_SUPER_KEY is not configured.' }, { status: 500 });

    const response = await fetch(externalAdminUrl, {
      headers: { 'x-super-admin-key': externalAdminKey },
      cache: 'no-store',
    });
    const data = await readExternalResponse(response);

    if (!response.ok) return NextResponse.json({ error: data.error ?? data.message ?? 'Unable to load external admin.' }, { status: response.status });

    return NextResponse.json({ ok: true, admin: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load external admin.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    if (!externalAdminKey) return NextResponse.json({ error: 'EXTERNAL_ADMIN_SUPER_KEY is not configured.' }, { status: 500 });

    const { name, email, password } = (await request.json()) as { name?: string; email?: string; password?: string };
    if (!name?.trim() || !email?.trim() || !password) return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const response = await fetch(externalAdminUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-super-admin-key': externalAdminKey,
      },
      body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }),
      cache: 'no-store',
    });
    const data = await readExternalResponse(response);

    if (!response.ok) return NextResponse.json({ error: data.error ?? data.message ?? 'Unable to update external admin.' }, { status: response.status });

    return NextResponse.json({ ok: true, admin: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to update external admin.' }, { status: 500 });
  }
}
