import { NextResponse } from 'next/server';
import { sendAlumniSuccessStoryEmail } from '@/lib/server/mailer';

function readText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const fullName = readText(body.fullName);
    const email = readText(body.email).toLowerCase();
    const graduationYear = readText(body.graduationYear);
    const currentLocation = readText(body.currentLocation);
    const currentRole = readText(body.currentRole);
    const storyTitle = readText(body.storyTitle);
    const story = readText(body.story);
    const permission = readText(body.permission);

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

    await sendAlumniSuccessStoryEmail({
      fullName,
      email,
      graduationYear,
      currentLocation,
      currentRole,
      storyTitle,
      story,
      permission,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to submit story.' }, { status: 500 });
  }
}
