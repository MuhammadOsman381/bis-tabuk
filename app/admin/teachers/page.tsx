'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, LockKeyhole, LogOut, RefreshCw, UsersRound } from 'lucide-react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import PortalHeader from '@/components/layout/PortalHeader';
import { ADMIN_TOKEN_KEY } from '@/lib/storageKeys';
import { yearGroups } from '@/lib/yearGroups';

type TeacherRecord = {
  id: string;
  name: string;
  email: string;
  assignedClasses: string[];
  createdAt?: string;
  updatedAt?: string;
};

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

function formatDate(value?: string) {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function AdminTeachersPage() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', assignedClasses: [] as string[] });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadTeachers = useCallback(async (adminToken = token) => {
    if (!adminToken) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/teachers', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          window.localStorage.removeItem(ADMIN_TOKEN_KEY);
          setToken('');
          setTeachers([]);
        }
        throw new Error(result.error ?? 'Unable to load teachers.');
      }
      setTeachers(result.teachers ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load teachers.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    queueMicrotask(() => loadTeachers(token));
  }, [loadTeachers, token]);

  const loginAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to login.');

      window.localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
      setToken(result.token);
      await loadTeachers(result.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to login.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken('');
    setTeachers([]);
  };

  const toggleTeacherClass = (className: string) => {
    setTeacherForm((current) => ({
      ...current,
      assignedClasses: current.assignedClasses.includes(className)
        ? current.assignedClasses.filter((item) => item !== className)
        : [...current.assignedClasses, className],
    }));
  };

  const createTeacher = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to create teacher.');
      setMessage('Teacher created. Login credentials were emailed to the teacher.');
      setTeacherForm({ name: '', email: '', assignedClasses: [] });
      await loadTeachers();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create teacher.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className={token ? 'mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]' : 'mx-auto max-w-7xl'}>
          {token && <AdminSidebar active="teachers" />}
          <div>
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">BIST admin</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">Teachers</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">Create teacher accounts, assign classes, and review teacher access.</p>
            </div>

            {token && (
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => loadTeachers()} title="Refresh teachers" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </button>
                <button type="button" onClick={logout} title="Logout" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {message && <p className="mb-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">{message}</p>}

          {!token ? (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/35 sm:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                  <LockKeyhole className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">Admin Login</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Login to manage teacher accounts.</p>
              </div>

              <form onSubmit={loginAdmin} className="space-y-5">
                <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Admin email" required />
                <input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" required />
                <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-70">
                  {isLoading ? 'Please wait...' : 'Login'}
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                <div className="mb-5">
                  <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">Create Teacher</h2>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Assign classes and send Teacher Portal credentials.</p>
                </div>
                <form onSubmit={createTeacher} className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
                  <input className={inputClass} value={teacherForm.name} onChange={(event) => setTeacherForm((current) => ({ ...current, name: event.target.value }))} placeholder="Teacher name" required />
                  <input className={inputClass} value={teacherForm.email} onChange={(event) => setTeacherForm((current) => ({ ...current, email: event.target.value }))} type="email" placeholder="Teacher email" required />
                  <button type="submit" disabled={isLoading || !teacherForm.assignedClasses.length} className="rounded-full bg-[#C8102E] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-50">Create</button>
                  <div className="lg:col-span-3">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Classes</p>
                    <div className="flex flex-wrap gap-2">
                      {yearGroups.map((className) => (
                        <button key={className} type="button" onClick={() => toggleTeacherClass(className)} className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${teacherForm.assignedClasses.includes(className) ? 'border-[#C8102E] bg-[#C8102E] text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-[#C8102E]/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300'}`}>
                          {className}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </section>

              <section className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                <div className="border-b border-zinc-200 p-6 dark:border-white/10">
                  <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">Teacher List</h2>
                </div>
                {teachers.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left">
                      <thead className="bg-zinc-50 text-xs font-black uppercase tracking-[0.16em] text-zinc-500 dark:bg-white/[0.04] dark:text-zinc-400">
                        <tr>
                          <th className="px-5 py-4">Name</th>
                          <th className="px-5 py-4">Email</th>
                          <th className="px-5 py-4">Classes</th>
                          <th className="px-5 py-4">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                        {teachers.map((teacher) => (
                          <tr key={teacher.id} className="text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                            <td className="px-5 py-4 font-black text-zinc-950 dark:text-zinc-50">{teacher.name}</td>
                            <td className="px-5 py-4 break-all font-bold">{teacher.email}</td>
                            <td className="px-5 py-4">
                              <div className="flex flex-wrap gap-1.5">
                                {teacher.assignedClasses.map((className) => <span key={`${teacher.id}-${className}`} className="rounded-full bg-[#C8102E]/10 px-2.5 py-1 text-xs font-black text-[#C8102E] dark:bg-[#C9A84C]/10 dark:text-[#C9A84C]">{className}</span>)}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-xs font-bold text-zinc-500">{formatDate(teacher.updatedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <UsersRound className="mx-auto h-8 w-8 text-zinc-400" />
                    <p className="mt-3 text-sm font-bold text-zinc-500 dark:text-zinc-400">No teachers created yet.</p>
                  </div>
                )}
              </section>
            </div>
          )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
