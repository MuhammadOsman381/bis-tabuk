import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

type OtpChallengePayload = {
  email: string;
  expiresAt: number;
  nonce: string;
};

function getSecret() {
  return process.env.OTP_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || 'bist-local-otp-secret';
}

function sign(payload: string, code: string) {
  return createHmac('sha256', getSecret()).update(`${payload}.${code}`).digest('base64url');
}

export function createOtpChallenge(email: string, code: string) {
  const payload: OtpChallengePayload = {
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + 60_000,
    nonce: randomBytes(16).toString('base64url'),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload, code)}`;
}

export function verifyOtpChallenge(challenge: string, email: string, code: string) {
  const [encodedPayload, signature] = challenge.split('.');
  if (!encodedPayload || !signature) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as OtpChallengePayload;
    if (payload.email !== email.trim().toLowerCase() || payload.expiresAt < Date.now()) return false;

    const expected = sign(encodedPayload, code);
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
