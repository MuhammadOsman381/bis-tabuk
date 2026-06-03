import { NextResponse } from 'next/server';
import { getYearGroupsForServer } from '@/lib/server/yearGroups';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const years = await getYearGroupsForServer();
    return NextResponse.json({ ok: true, years }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load year groups.' }, { status: 500 });
  }
}
