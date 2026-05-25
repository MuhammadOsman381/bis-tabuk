import { v2 as cloudinary } from 'cloudinary';

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return false;

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  return true;
}

function publicIdFromUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const marker = '/upload/';
    const markerIndex = parsedUrl.pathname.indexOf(marker);
    if (markerIndex === -1) return null;

    const afterUpload = parsedUrl.pathname.slice(markerIndex + marker.length);
    const withoutVersion = afterUpload.replace(/^v\d+\//, '');
    return withoutVersion.replace(/\.[^.]+$/, '');
  } catch {
    return null;
  }
}

export async function deleteCloudinaryAssets(assets: Array<{ publicId?: string; url?: string }>) {
  if (!configureCloudinary()) return { mode: 'skipped' as const, deleted: 0 };

  const publicIds = Array.from(
    new Set(
      assets
        .map((asset) => asset.publicId || (asset.url ? publicIdFromUrl(asset.url) : null))
        .filter(Boolean) as string[],
    ),
  );

  let deleted = 0;
  for (const publicId of publicIds) {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
      deleted += 1;
    } catch (error) {
      console.warn(`Unable to delete Cloudinary asset ${publicId}:`, error);
    }
  }

  return { mode: 'cloudinary' as const, deleted };
}
