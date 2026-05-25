import { createHmac, timingSafeEqual } from 'node:crypto';

type AdminTokenPayload = {
  email: string;
  role: 'admin';
  exp: number;
};

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || 'bist-local-admin-secret';
}

function toBase64Url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function sign(value: string) {
  return createHmac('sha256', getAdminSecret()).update(value).digest('base64url');
}

export function createAdminToken(email: string) {
  const payload: AdminTokenPayload = {
    email,
    role: 'admin',
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyAdminToken(token: string | null) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as AdminTokenPayload;
    if (payload.role !== 'admin' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAdminFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return verifyAdminToken(token);
}
