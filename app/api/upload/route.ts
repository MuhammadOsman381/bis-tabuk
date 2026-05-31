import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { deleteCloudinaryAssets } from '@/lib/server/cloudinary';
import { getAdminFromRequest } from '@/lib/server/adminAuth';
import { getUserFromRequest } from '@/lib/server/userAuth';

export async function POST(request: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary environment variables are not configured.' }, { status: 500 });
    }

    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'File is required.' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(dataUri, { folder: 'bist-admissions', resource_type: 'auto' });

    return NextResponse.json({ ok: true, url: result.secure_url, publicId: result.public_id, name: file.name });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!getUserFromRequest(request) && !getAdminFromRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { publicId, url } = (await request.json()) as { publicId?: string; url?: string };
    if (!publicId && !url) return NextResponse.json({ error: 'publicId or url is required.' }, { status: 400 });

    const result = await deleteCloudinaryAssets([{ publicId, url }]);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to delete upload.' }, { status: 500 });
  }
}
