import { createHmac, timingSafeEqual } from 'node:crypto';

type StudentTokenPayload = {
  id: string;
  email: string;
  studentName: string;
  admissionYearGroup: string;
  role: 'student';
  exp: number;
};

function getStudentSecret() {
  return process.env.STUDENT_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || 'bist-local-student-secret';
}

function sign(value: string) {
  return createHmac('sha256', getStudentSecret()).update(value).digest('base64url');
}

export function createStudentToken(payload: Omit<StudentTokenPayload, 'role' | 'exp'>) {
  const encodedPayload = Buffer.from(JSON.stringify({ ...payload, role: 'student', exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyStudentToken(token: string | null) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as StudentTokenPayload;
    if (payload.role !== 'student' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getStudentFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return verifyStudentToken(token);
}
