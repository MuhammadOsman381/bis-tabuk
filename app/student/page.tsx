'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Link2, LockKeyhole, LogOut } from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';
import { STUDENT_PROFILE_KEY, STUDENT_TOKEN_KEY } from '@/lib/storageKeys';

type StudentProfile = {
  id: string;
  email: string;
  studentName: string;
  admissionYearGroup: string;
};

type Chapter = {
  name: string;
  description: string;
  link: string;
};

type Material = {
  id: string;
  className: string;
  title: string;
  chapters: Chapter[];
};

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

function normalizeChapters(material: Material): Chapter[] {
  if (!Array.isArray(material.chapters)) return [];

  return material.chapters.map((item, index) => {
    return {
      name: item.name ?? `Chapter ${index + 1}`,
      description: item.description ?? '',
      link: item.link ?? '',
    };
  });
}

export default function StudentPage() {
  const [token, setToken] = useState(() => (typeof window !== 'undefined' ? window.localStorage.getItem(STUDENT_TOKEN_KEY) ?? '' : ''));
  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedProfile = window.localStorage.getItem(STUDENT_PROFILE_KEY);
    return savedProfile ? JSON.parse(savedProfile) as StudentProfile : null;
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadMaterials = useCallback(async (studentToken = token) => {
    if (!studentToken) return;
    try {
      const response = await fetch('/api/student/materials', { headers: { Authorization: `Bearer ${studentToken}` } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to load materials.');
      setMaterials(result.materials ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load materials.');
    }
  }, [token]);

  useEffect(() => {
    if (!token || !profile) return;
    queueMicrotask(() => loadMaterials(token));
  }, [loadMaterials, profile, token]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to login.');
      window.localStorage.setItem(STUDENT_TOKEN_KEY, result.token);
      window.localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(result.student));
      setToken(result.token);
      setProfile(result.student);
      await loadMaterials(result.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to login.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(STUDENT_TOKEN_KEY);
    window.localStorage.removeItem(STUDENT_PROFILE_KEY);
    setToken('');
    setProfile(null);
    setMaterials([]);
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortalHeader />
      {/* <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">BIST LMS</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">Student Portal</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">Login with your LMS email and password to view materials for your year group.</p>
            </div>
            {profile && (
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>

          {message && <p className="mb-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">{message}</p>}

          {!profile ? (
            <form onSubmit={login} className="mx-auto max-w-xl rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 sm:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                  <LockKeyhole className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">Student Login</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Use the LMS credentials sent after application approval.</p>
              </div>
              <div className="space-y-5">
                <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Guardian email" required />
                <input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="LMS password" required />
                <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:opacity-60">
                  {isLoading ? 'Please wait...' : 'Login'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#C8102E] dark:text-[#C9A84C]">{profile.admissionYearGroup}</p>
                <h2 className="mt-2 text-2xl font-black text-zinc-950 dark:text-zinc-50">Welcome, {profile.studentName}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Showing only materials where the material class matches your admission year group.</p>
              </section>

              <div className="grid gap-4 lg:grid-cols-2">
                {materials.map((material) => {
                  const chapters = normalizeChapters(material);

                  return (
                    <article key={material.id} className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                      <span className="rounded-full bg-[#C8102E]/10 px-3 py-1 text-xs font-black text-[#C8102E] dark:bg-[#C9A84C]/10 dark:text-[#C9A84C]">{material.className}</span>
                      <h3 className="mt-4 text-xl font-black text-zinc-950 dark:text-zinc-50">{material.title}</h3>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">{chapters.length} chapter{chapters.length === 1 ? '' : 's'}</p>
                      <div className="mt-5 space-y-3">
                        {chapters.map((chapter, index) => (
                          <div key={`${material.id}-${index}-${chapter.link}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                            <h4 className="font-black text-zinc-900 dark:text-zinc-50">{chapter.name}</h4>
                            <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{chapter.description}</p>
                            <a href={chapter.link} target="_blank" className="mt-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-black text-zinc-600 transition hover:text-[#C8102E] dark:border-white/10 dark:bg-zinc-950/50 dark:text-zinc-300">
                              <Link2 className="h-3.5 w-3.5" />
                              Open material
                            </a>
                          </div>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>

              {!materials.length && (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-10 text-center dark:border-white/10 dark:bg-white/[0.04]">
                  <BookOpen className="mx-auto h-8 w-8 text-zinc-400" />
                  <p className="mt-3 text-sm font-bold text-zinc-500 dark:text-zinc-400">No materials found for {profile.admissionYearGroup} yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section> */}
      <div className='min-h-screen  text-5xl   text-center flex flex-col justify-center items-center gap-20'>
        {/* <div className='text-red-600 font-bold text-6xl' >
          Learning Management System
          </div>  */}
          <div className='text-red-600 font-semibold ' >
            Under Construction
          </div>
      </div>
    </motion.main>
  );
}
