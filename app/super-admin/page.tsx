'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, LockKeyhole, RefreshCw, Save, ShieldCheck } from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';

type AdminAccount = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type ExternalAdminAccount = {
  name?: string;
  email?: string;
  password?: string;
  [key: string]: unknown;
};

const superAdminKeyStorage = 'bist_super_admin_key';

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export default function SuperAdminPage() {
  const [accessKey, setAccessKey] = useState('');
  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [externalName, setExternalName] = useState('');
  const [externalEmail, setExternalEmail] = useState('');
  const [externalPassword, setExternalPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showExternalPassword, setShowExternalPassword] = useState(false);
  const [externalAdmin, setExternalAdmin] = useState<ExternalAdminAccount | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExternalLoading, setIsExternalLoading] = useState(false);
  const [message, setMessage] = useState('');

  const selectedAdmin = useMemo(() => admins.find((admin) => admin.id === selectedAdminId), [admins, selectedAdminId]);

  const loadExternalAdmin = useCallback(async (key = accessKey) => {
    if (!key) return;

    setIsExternalLoading(true);
    try {
      const response = await fetch('/api/super-admin/external-admin', {
        headers: { 'x-super-admin-key': key },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to load external admin.');

      const admin = (result.admin?.admin ?? result.admin) as ExternalAdminAccount;
      setExternalAdmin(admin);
      setExternalName(String(admin?.name ?? 'Admin'));
      setExternalEmail(String(admin?.email ?? ''));
      setExternalPassword(String(admin?.password ?? ''));
    } catch (error) {
      setExternalAdmin(null);
      setMessage(error instanceof Error ? error.message.slice(0, 240) : 'Unable to load external admin.');
    } finally {
      setIsExternalLoading(false);
    }
  }, [accessKey]);

  const loadAdmins = useCallback(async (key = accessKey) => {
    if (!key) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/super-admin/admin', {
        headers: { 'x-super-admin-key': key },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to unlock super admin.');

      const nextAdmins = (result.admins ?? []) as AdminAccount[];
      setAdmins(nextAdmins);
      setIsUnlocked(true);
      window.localStorage.setItem(superAdminKeyStorage, key);

      const firstAdmin = nextAdmins[0];
      setSelectedAdminId(firstAdmin?.id ?? '');
      setEmail(firstAdmin?.email ?? '');
      setPassword('');
    } catch (error) {
      setIsUnlocked(false);
      setAdmins([]);
      setSelectedAdminId('');
      setMessage(error instanceof Error ? error.message.slice(0, 240) : 'Unable to unlock super admin.');
    } finally {
      setIsLoading(false);
    }
  }, [accessKey]);

  useEffect(() => {
    queueMicrotask(() => {
      const savedKey = window.localStorage.getItem(superAdminKeyStorage);
      if (savedKey) {
        setAccessKey(savedKey);
        loadAdmins(savedKey);
      }
    });
  }, [loadAdmins]);

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loadAdmins(accessKey);
  };

  const saveAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/super-admin/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-super-admin-key': accessKey },
        body: JSON.stringify({ id: selectedAdminId, email, password: password || undefined }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to save admin.');

      const updatedAdmin = result.admin as AdminAccount;
      setAdmins((current) => {
        const exists = current.some((admin) => admin.id === updatedAdmin.id);
        return exists ? current.map((admin) => (admin.id === updatedAdmin.id ? updatedAdmin : admin)) : [updatedAdmin, ...current];
      });
      setSelectedAdminId(updatedAdmin.id);
      setEmail(updatedAdmin.email);
      setPassword('');
      setMessage('Admin account updated successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message.slice(0, 240) : 'Unable to save admin.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveExternalAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsExternalLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/super-admin/external-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-super-admin-key': accessKey },
        body: JSON.stringify({ name: externalName, email: externalEmail, password: externalPassword }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to save external admin.');

      const admin = (result.admin?.admin ?? result.admin) as ExternalAdminAccount;
      setExternalAdmin(admin);
      setExternalName(String(admin?.name ?? externalName));
      setExternalEmail(String(admin?.email ?? externalEmail));
      setExternalPassword(String(admin?.password ?? externalPassword));
      setMessage('External admin-login account updated successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message.slice(0, 240) : 'Unable to save external admin.');
    } finally {
      setIsExternalLoading(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C8102E] text-white shadow-xl shadow-[#C8102E]/25">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">Hidden system route</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">Super Admin</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Edit the admin login email and password. This page is intentionally not linked anywhere in the website navigation.
            </p>
          </div>

          {message && (
            <p className="mb-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
              {message}
            </p>
          )}

          {!isUnlocked ? (
            <motion.form onSubmit={unlock} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 sm:p-8">
              <div className="mb-7">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  <LockKeyhole className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">Enter Access Key</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Use `SUPER_ADMIN_KEY` from your environment variables.</p>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Super Admin Key</span>
                <input className={inputClass} type="password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} required />
              </label>
              <button type="submit" disabled={isLoading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-60">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
                Unlock
              </button>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col justify-between gap-3 rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-black text-zinc-950 dark:text-zinc-50">Website Admin Account</h2>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{admins.length ? `${admins.length} admin account${admins.length === 1 ? '' : 's'} found.` : 'No admin account found yet.'}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => loadAdmins()} disabled={isLoading} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <form onSubmit={saveAdmin} className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 sm:p-8">
                <div className="grid gap-5">
                  {admins.length > 0 ? (
                    <label className="block">
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Select Admin</span>
                      <select
                        className={inputClass}
                        value={selectedAdminId}
                        onChange={(event) => {
                          const adminId = event.target.value;
                          const admin = admins.find((item) => item.id === adminId);
                          setSelectedAdminId(adminId);
                          setEmail(admin?.email ?? '');
                          setPassword('');
                        }}
                      >
                        {admins.map((admin) => (
                          <option key={admin.id} value={admin.id}>{admin.email}</option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm font-bold text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                      No website admin exists. Use the existing admin seed route or database seed before editing.
                    </p>
                  )}

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Admin Email</span>
                    <input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
                      Password {selectedAdminId && <span className="normal-case tracking-normal text-zinc-400">(leave empty to keep current)</span>}
                    </span>
                    <div className="flex overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 transition focus-within:border-[#C8102E] focus-within:ring-4 focus-within:ring-[#C8102E]/10 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/20">
                      <input
                        className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required={false}
                        minLength={password ? 8 : undefined}
                        placeholder="Optional new password"
                      />
                      <button type="button" onClick={() => setShowPassword((current) => !current)} className="flex h-auto w-12 items-center justify-center text-zinc-500 transition hover:text-[#C8102E] dark:text-zinc-400">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>

                  {selectedAdmin && (
                    <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-white/10 dark:bg-white/[0.04] sm:grid-cols-2">
                      <p><span className="font-black text-zinc-950 dark:text-zinc-50">Role:</span> {selectedAdmin.role}</p>
                      <p><span className="font-black text-zinc-950 dark:text-zinc-50">Updated:</span> {formatDate(selectedAdmin.updatedAt)}</p>
                      <p className="sm:col-span-2"><span className="font-black text-zinc-950 dark:text-zinc-50">Created:</span> {formatDate(selectedAdmin.createdAt)}</p>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={isLoading || !selectedAdminId} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-60">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Admin
                </button>
              </form>

              <form onSubmit={saveExternalAdmin} className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 sm:p-8">
                <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-black text-zinc-950 dark:text-zinc-50">External Admin Login</h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Edits the admin account from the provided `admin-login` endpoint.</p>
                  </div>
                  <button type="button" onClick={() => loadExternalAdmin()} disabled={isExternalLoading} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100">
                    {isExternalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  </button>
                </div>

                <div className="grid gap-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Name</span>
                    <input className={inputClass} value={externalName} onChange={(event) => setExternalName(event.target.value)} required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Email</span>
                    <input className={inputClass} type="email" value={externalEmail} onChange={(event) => setExternalEmail(event.target.value)} required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
                      Password
                    </span>
                    <div className="flex overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 transition focus-within:border-[#C8102E] focus-within:ring-4 focus-within:ring-[#C8102E]/10 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/20">
                      <input
                        className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                        type={showExternalPassword ? 'text' : 'password'}
                        value={externalPassword}
                        onChange={(event) => setExternalPassword(event.target.value)}
                        required
                        minLength={8}
                        placeholder="At least 8 characters"
                      />
                      <button type="button" onClick={() => setShowExternalPassword((current) => !current)} className="flex h-auto w-12 items-center justify-center text-zinc-500 transition hover:text-[#C8102E] dark:text-zinc-400">
                        {showExternalPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>
                  {externalAdmin && (
                    <p className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-bold text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                      Loaded external admin: {String(externalAdmin.email ?? (externalEmail || 'unknown'))}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={isExternalLoading} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-60">
                  {isExternalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save External Admin
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </motion.main>
  );
}
