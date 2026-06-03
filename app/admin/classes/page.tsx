'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, LockKeyhole, LogOut, Plus, RefreshCw, Trash2 } from 'lucide-react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import PortalHeader from '@/components/layout/PortalHeader';
import { ADMIN_TOKEN_KEY } from '@/lib/storageKeys';

type YearGroupRow = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

async function readJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text.replace(/\s+/g, ' ').trim() || fallbackMessage);
  }
}

export default function AdminClassesPage() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [years, setYears] = useState<YearGroupRow[]>([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadYears = useCallback(async (adminToken = token) => {
    if (!adminToken) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/year-groups', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const result = await readJsonResponse<{ error?: string; years?: YearGroupRow[] }>(response, 'Unable to load classes.');
      if (!response.ok) throw new Error(result.error ?? 'Unable to load classes.');
      setYears(result.years ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load classes.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    queueMicrotask(() => {
      const savedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
      if (savedToken) setToken(savedToken);
    });
  }, []);

  useEffect(() => {
    if (!token) return;
    queueMicrotask(() => loadYears(token));
  }, [loadYears, token]);

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
      const result = await readJsonResponse<{ error?: string; token?: string }>(response, 'Unable to login.');
      if (!response.ok || !result.token) throw new Error(result.error ?? 'Unable to login.');

      window.localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
      setToken(result.token);
      await loadYears(result.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to login.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken('');
    setYears([]);
  };

  const createYear = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/year-groups', {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const result = await readJsonResponse<{ error?: string; year?: YearGroupRow }>(response, 'Unable to save class.');
      if (!response.ok || !result.year) throw new Error(result.error ?? 'Unable to save class.');

      setYears((current) => {
        const next = current.filter((year) => year.id !== result.year?.id && year.name !== result.year?.name);
        return [...next, result.year as YearGroupRow];
      });
      setName('');
      setMessage('Class/year saved. Parents will see it on the apply form.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save class.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteYear = async (id: string) => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/year-groups', {
        method: 'DELETE',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await readJsonResponse<{ error?: string }>(response, 'Unable to delete class.');
      if (!response.ok) throw new Error(result.error ?? 'Unable to delete class.');
      setYears((current) => current.filter((year) => year.id !== id));
      setMessage('Class/year deleted.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete class.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className={token ? 'mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]' : 'mx-auto max-w-7xl'}>
          {token && <AdminSidebar active="classes" />}
          <div>
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">BIST admin</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">Classes / Years</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">Create the year groups parents can select on the admissions form.</p>
              </div>

              {token && (
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => loadYears()} title="Refresh" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
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
                </div>
                <form onSubmit={loginAdmin} className="space-y-5">
                  <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Admin email" required />
                  <input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" required />
                  <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-70">
                    {isLoading ? 'Please wait...' : 'Login'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                  <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">Add Class / Year</h2>
                  <form onSubmit={createYear} className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} placeholder="Example: Year 12" required />
                    <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-60">
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  </form>
                </section>

                <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                  <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">Saved Classes / Years</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {years.map((year) => (
                      <div key={year.id} className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">{year.name}</p>
                        <button type="button" onClick={() => deleteYear(year.id)} disabled={isLoading} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-red-400/20 dark:hover:bg-red-400/10 dark:hover:text-red-200" title="Delete class">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {!years.length && <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">No custom classes yet. Until you add one, the public form falls back to ISKSAFH/default year groups.</p>}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
