import { createHmac, timingSafeEqual } from 'node:crypto';

type TeacherTokenPayload = {
  id: string;
  email: string;
  classes: string[];
  role: 'teacher';
  exp: number;
};

function getTeacherSecret() {
  return process.env.TEACHER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || 'bist-local-teacher-secret';
}

function sign(value: string) {
  return createHmac('sha256', getTeacherSecret()).update(value).digest('base64url');
}

export function createTeacherToken(payload: Omit<TeacherTokenPayload, 'role' | 'exp'>) {
  const encodedPayload = Buffer.from(JSON.stringify({ ...payload, role: 'teacher', exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyTeacherToken(token: string | null) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as TeacherTokenPayload;
    if (payload.role !== 'teacher' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getTeacherFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return verifyTeacherToken(token);
}
