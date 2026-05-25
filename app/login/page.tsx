'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';
import { AUTH_TOKEN_KEY, USER_EMAIL_ENCODED_KEY, USER_EMAIL_HASH_KEY } from '@/lib/storageKeys';

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

function encodeEmail(email: string) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(email));
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const redirectTo = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('redirect') || '/apply';
  };

  const requestOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    const response = await fetch('/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setMessage(result.error ?? 'Unable to send OTP.');
      return;
    }

    setOtpSent(true);
    setMessage(result.delivery?.mode === 'console' ? 'OTP generated. Check the server console because SMTP is not configured.' : 'OTP sent to your email.');
  };

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: otp }),
    });
    const result = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setMessage(result.error ?? 'Unable to verify OTP.');
      return;
    }

    window.localStorage.setItem(AUTH_TOKEN_KEY, result.token);
    window.localStorage.setItem(USER_EMAIL_HASH_KEY, result.emailHash);
    window.localStorage.setItem(USER_EMAIL_ENCODED_KEY, encodeEmail(result.email));
    router.replace(redirectTo());
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:block">
            <Link href="/" className="mb-8 inline-flex items-center gap-2 rounded-full text-sm font-bold text-[#C8102E] transition hover:gap-3 dark:text-[#ff8fa0]">
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">Secure admissions portal</p>
            <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              Verify your email to continue your BIST application.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
              If your account already exists, this will log you in. If not, we&apos;ll create it after email verification.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/35 sm:p-8">
            <div className="mb-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                {otpSent ? <ShieldCheck className="h-7 w-7" /> : <LockKeyhole className="h-7 w-7" />}
              </div>
              <h2 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">{otpSent ? 'Enter OTP' : 'Create or Login'}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {otpSent ? 'Enter the verification code sent to your email.' : 'Enter your email to receive a one-time verification code.'}
              </p>
            </div>

            <form onSubmit={otpSent ? verifyOtp : requestOtp} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Email Address</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input className={`${inputClass} pl-11`} value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@example.com" required disabled={otpSent} />
                </div>
              </label>

              {otpSent && (
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">OTP Code</span>
                  <input className={inputClass} value={otp} onChange={(event) => setOtp(event.target.value)} inputMode="numeric" placeholder="6-digit code" required />
                </label>
              )}

              {message && <p className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:bg-white/[0.04] dark:text-zinc-300">{message}</p>}

              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-70">
                {isLoading ? 'Please wait...' : otpSent ? 'Verify & Continue' : 'Send OTP'}
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              {otpSent && (
                <button type="button" onClick={() => { setOtpSent(false); setOtp(''); setMessage(''); }} className="w-full text-center text-sm font-bold text-zinc-500 transition hover:text-[#C8102E]">
                  Use a different email
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
