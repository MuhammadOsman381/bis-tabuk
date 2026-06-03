import { NextResponse } from 'next/server';
import { createYearGroup, deleteYearGroup, getStoredYearGroups } from '@/lib/server/yearGroups';
import { getAdminFromRequest } from '@/lib/server/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const years = await getStoredYearGroups();
    return NextResponse.json({ ok: true, years }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load classes.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { name } = (await request.json()) as { name?: string };
    if (!name?.trim()) return NextResponse.json({ error: 'Class/year name is required.' }, { status: 400 });

    const year = await createYearGroup(name);
    return NextResponse.json({ ok: true, year });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save class.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = (await request.json()) as { id?: string };
    if (!id) return NextResponse.json({ error: 'Class/year id is required.' }, { status: 400 });

    await deleteYearGroup(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete class.' }, { status: 500 });
  }
}
