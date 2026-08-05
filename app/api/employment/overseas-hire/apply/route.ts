import { NextResponse } from 'next/server';
import { sendLocalHireApplicationEmail } from '@/lib/server/mailer';

const allowedCvTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const maxCvSize = 8 * 1024 * 1024;

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = readField(formData, 'fullName');
    const email = readField(formData, 'email').toLowerCase();
    const phone = readField(formData, 'phone');
    const position = readField(formData, 'position');
    const availability = readField(formData, 'availability');
    const message = readField(formData, 'message');
    const cv = formData.get('cv');

    if (!fullName || !email || !phone || !position || !availability) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json({ error: 'Please upload your CV.' }, { status: 400 });
    }

    if (!allowedCvTypes.has(cv.type)) {
      return NextResponse.json({ error: 'CV must be a PDF, DOC, or DOCX file.' }, { status: 400 });
    }

    if (cv.size > maxCvSize) {
      return NextResponse.json({ error: 'CV file size must be 8 MB or smaller.' }, { status: 400 });
    }

    const content = Buffer.from(await cv.arrayBuffer());
    await sendLocalHireApplicationEmail({
      applicationType: 'Overseas Hire Application',
      fullName,
      email,
      phone,
      position,
      availability,
      message,
      cv: {
        filename: cv.name || `${fullName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-cv`,
        contentType: cv.type,
        content,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to submit application.' }, { status: 500 });
  }
}
