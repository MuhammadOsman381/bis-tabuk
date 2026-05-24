'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';
import { AUTH_TOKEN_KEY } from '@/lib/storageKeys';

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirect') || '/apply';

    window.localStorage.setItem(AUTH_TOKEN_KEY, `bist-session-${Date.now()}`);
    router.replace(redirectTo);
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <div>
        <PortalHeader />

        <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 rounded-full text-sm font-bold text-[#C8102E] transition hover:gap-3 dark:text-[#ff8fa0]"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Link>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">
                Secure admissions portal
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
                Sign in to continue your BIST application.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
                Your application draft is saved in this browser, so you can return to the form without entering the same
                details again.
              </p>
              <div className="mt-8 rounded-3xl border border-zinc-200/80 bg-white/70 p-5 text-sm text-zinc-600 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-400 dark:shadow-black/30">
                Redirected visitors return to the application page after signing in.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/35 sm:p-8"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                    <LockKeyhole className="h-7 w-7" />
                  </div>
                  <h2 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">Login</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    Enter your details to continue to the application page.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
                    Email Address
                  </span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                      className={`${inputClass} pl-11`}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
                    Password
                  </span>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                      className={`${inputClass} pl-11`}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </label>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:bg-[#9B0D23] dark:shadow-[#C8102E]/35"
                >
                  Continue to Application
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </form>

              <p className="mt-6 text-center text-xs leading-6 text-zinc-500 dark:text-zinc-500">
                Demo login stores a local session token so the protected apply page can continue.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
