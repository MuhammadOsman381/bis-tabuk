import { NextResponse } from 'next/server';
import { sendAlumniSuccessStoryEmail } from '@/lib/server/mailer';

const allowedPhotoTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxPhotoCount = 3;
const maxPhotoSize = 5 * 1024 * 1024;

function readText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fullName = readText(formData.get('fullName'));
    const email = readText(formData.get('email')).toLowerCase();
    const graduationYear = readText(formData.get('graduationYear'));
    const currentLocation = readText(formData.get('currentLocation'));
    const currentRole = readText(formData.get('currentRole'));
    const storyTitle = readText(formData.get('storyTitle'));
    const story = readText(formData.get('story'));
    const permission = readText(formData.get('permission'));
    const photos = formData.getAll('photos').filter((photo): photo is File => photo instanceof File && photo.size > 0);

    if (!fullName || !email || !graduationYear || !storyTitle || !story || !permission) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!/^(19|20)\d{2}$/.test(graduationYear)) {
      return NextResponse.json({ error: 'Please enter a valid graduation or leaving year.' }, { status: 400 });
    }

    if (story.length < 80) {
      return NextResponse.json({ error: 'Please write at least 80 characters for your story.' }, { status: 400 });
    }

    if (photos.length > maxPhotoCount) {
      return NextResponse.json({ error: `Please upload no more than ${maxPhotoCount} photos.` }, { status: 400 });
    }

    for (const photo of photos) {
      if (!allowedPhotoTypes.has(photo.type)) {
        return NextResponse.json({ error: 'Photos must be JPG, PNG, or WebP files.' }, { status: 400 });
      }

      if (photo.size > maxPhotoSize) {
        return NextResponse.json({ error: 'Each photo must be 5 MB or smaller.' }, { status: 400 });
      }
    }

    const photoAttachments = await Promise.all(
      photos.map(async (photo, index) => ({
        filename: photo.name || `${fullName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-alumni-photo-${index + 1}`,
        contentType: photo.type,
        content: Buffer.from(await photo.arrayBuffer()),
      })),
    );

    await sendAlumniSuccessStoryEmail({
      fullName,
      email,
      graduationYear,
      currentLocation,
      currentRole,
      storyTitle,
      story,
      permission,
      photos: photoAttachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to submit story.' }, { status: 500 });
  }
}
