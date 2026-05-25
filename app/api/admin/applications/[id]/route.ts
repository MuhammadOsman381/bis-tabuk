import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { applications, students } from '@/lib/db/schema';
import { getAdminFromRequest } from '@/lib/server/adminAuth';
import { deleteCloudinaryAssets } from '@/lib/server/cloudinary';

type AssetContainer = {
  passportUrl?: string;
  passportPublicId?: string;
  paymentReceiptUrl?: string;
  paymentReceiptPublicId?: string;
};

type ApplicationData = AssetContainer & {
  students?: AssetContainer[];
  guardians?: AssetContainer[];
  data?: ApplicationData;
  draft?: ApplicationData;
  application?: ApplicationData;
};

function getApplicationData(data: unknown): ApplicationData {
  const applicationData = data as ApplicationData;
  return applicationData.data ?? applicationData.draft ?? applicationData.application ?? applicationData;
}

function collectApplicationAssets(data: unknown) {
  const applicationData = getApplicationData(data);
  return [
    { url: applicationData.paymentReceiptUrl, publicId: applicationData.paymentReceiptPublicId },
    ...(applicationData.students ?? []).map((student) => ({ url: student.passportUrl, publicId: student.passportPublicId })),
    ...(applicationData.guardians ?? []).map((guardian) => ({ url: guardian.passportUrl, publicId: guardian.passportPublicId })),
  ].filter((asset) => asset.url || asset.publicId);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!getAdminFromRequest(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const db = getDb();
    const [application] = await db.select({ data: applications.data }).from(applications).where(eq(applications.id, id)).limit(1);

    if (application) {
      await deleteCloudinaryAssets(collectApplicationAssets(application.data));
    }

    await db.delete(students).where(eq(students.applicationId, id));
    await db.delete(applications).where(eq(applications.id, id));

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete application.' }, { status: 500 });
  }
}
