import { NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/server/adminAuth';
import { approveAllApplications } from '@/lib/server/applicationApproval';

export async function PATCH(request: Request) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const students = await approveAllApplications();
    return NextResponse.json({ ok: true, students });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to approve all.' }, { status: 500 });
  }
}
