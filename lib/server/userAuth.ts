import { createHmac, timingSafeEqual } from 'node:crypto';

type UserTokenPayload = {
  id: string;
  email: string;
  role: 'user';
  exp: number;
};

function getUserSecret() {
  return process.env.USER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || 'bist-local-user-secret';
}

function sign(value: string) {
  return createHmac('sha256', getUserSecret()).update(value).digest('base64url');
}

export function createUserToken(payload: Omit<UserTokenPayload, 'role' | 'exp'>) {
  const encodedPayload = Buffer.from(JSON.stringify({ ...payload, role: 'user', exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyUserToken(token: string | null) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as UserTokenPayload;
    if (payload.role !== 'user' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return verifyUserToken(token);
}
