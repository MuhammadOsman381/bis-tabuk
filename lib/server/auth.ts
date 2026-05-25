import { createHash, randomInt } from 'node:crypto';
import bcrypt from 'bcryptjs';

export function hashEmail(email: string) {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

export function createOtp() {
  return String(randomInt(100000, 999999));
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
