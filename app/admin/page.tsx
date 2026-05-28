'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Eye, Loader2, LockKeyhole, LogOut, RefreshCw, Trash2, UserCheck, XCircle } from 'lucide-react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import PortalHeader from '@/components/layout/PortalHeader';
import { ADMIN_TOKEN_KEY } from '@/lib/storageKeys';

type ApplicantStatus = 'Pending' | 'approve' | 'reject';

type StudentData = Record<string, unknown> & { firstName?: string; lastName?: string; admissionYearGroup?: string; passportUrl?: string };
type GuardianData = Record<string, unknown> & { firstName?: string; lastName?: string; email?: string; phoneCode?: string; phone?: string; passportUrl?: string };
type ApplicationData = {
  howFound?: string;
  students?: StudentData[];
  guardians?: GuardianData[];
  paymentReceiptUrl?: string;
  paymentReceiptFileName?: string;
  declarations?: string[];
  status?: ApplicantStatus;
  data?: ApplicationData;
  draft?: ApplicationData;
  application?: ApplicationData;
};

type Applicant = {
  id: string;
  email: string;
  emailHash: string;
  data: ApplicationData;
  status: ApplicantStatus;
  createdAt: string;
  updatedAt: string;
};

const statusStyles: Record<ApplicantStatus, string> = {
  Pending: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200',
  approve: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200',
  reject: 'border-red-200 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200',
};

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value === null || value === undefined || value === '') return 'Not added';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function getApplicationData(applicant: Applicant): ApplicationData {
  return applicant.data.data ?? applicant.data.draft ?? applicant.data.application ?? applicant.data;
}

function getStudents(applicant: Applicant): StudentData[] {
  const data = getApplicationData(applicant);
  return Array.isArray(data.students) ? data.students : [];
}

function getGuardians(applicant: Applicant): GuardianData[] {
  const data = getApplicationData(applicant);
  return Array.isArray(data.guardians) ? data.guardians : [];
}

function formatPersonName(person: { firstName?: string; lastName?: string }, fallback: string) {
  return [person.firstName, person.lastName].filter(Boolean).join(' ') || fallback;
}

function getStudentName(applicant: Applicant) {
  const students = getStudents(applicant);
  if (!students.length) return 'Student details not completed';
  return students.map((student, index) => formatPersonName(student, `Student ${index + 1}`)).join(', ');
}

function getAdmissionYearGroups(applicant: Applicant) {
  const students = getStudents(applicant);
  const groups = students.map((student) => student.admissionYearGroup).filter(Boolean);
  return groups.length ? groups.join(', ') : 'Year not selected';
}

function getGuardian(applicant: Applicant) {
  return getGuardians(applicant)[0];
}

function getGuardianPhone(applicant: Applicant) {
  const guardian = getGuardian(applicant);
  return [guardian?.phoneCode, guardian?.phone].filter(Boolean).join(' ') || 'Not added';
}

function DetailGrid({ title, values }: { title: string; values: Record<string, unknown> }) {
  const entries = Object.entries(values).filter(([key]) => {
    const normalizedKey = key.toLowerCase();
    return !normalizedKey.includes('url') && !normalizedKey.includes('publicid') && !normalizedKey.includes('hash') && !normalizedKey.includes('password');
  });

  return (
    <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
      <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50">{title}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {entries.map(([key, value]) => (
          <div key={key} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-zinc-400">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="mt-2 break-words text-sm font-bold text-zinc-800 dark:text-zinc-100">{formatValue(value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmptyDetail({ title, message }: { title: string; message: string }) {
  return (
    <section className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50">{title}</h3>
      <p className="mt-3 text-sm font-bold text-zinc-500 dark:text-zinc-400">{message}</p>
    </section>
  );
}

function ImagePreview({ title, url }: { title: string; url?: string }) {
  if (!url) return null;

  return (
    <a href={url} target="_blank" className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-zinc-900/5 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-zinc-900">
      <div className="aspect-[4/3] bg-zinc-100 bg-cover bg-center dark:bg-zinc-800" style={{ backgroundImage: `url(${url})` }} />
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">{title}</p>
        <Eye className="h-4 w-4 text-[#C8102E] transition group-hover:scale-110 dark:text-[#ff8fa0]" />
      </div>
    </a>
  );
}

function IconButton({
  label,
  children,
  onClick,
  disabled,
  tone = 'neutral',
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tone?: 'neutral' | 'approve' | 'reject' | 'delete';
}) {
  const tones = {
    neutral: 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/10',
    approve: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200',
    reject: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200',
    delete: 'border-zinc-200 bg-white text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:border-red-400/20 dark:hover:bg-red-400/10 dark:hover:text-red-200',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 ${tones[tone]}`}
    >
      {children}
    </button>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(() => (typeof window !== 'undefined' ? window.localStorage.getItem(ADMIN_TOKEN_KEY) ?? '' : ''));
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadApplicants = useCallback(async (adminToken = token) => {
    if (!adminToken) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/applications', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to load applicants.');
      setApplicants(result.applications ?? []);
      setSelectedApplicant((current) => {
        if (!current) return null;
        return (result.applications as Applicant[]).find((applicant) => applicant.id === current.id) ?? null;
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load applicants.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    queueMicrotask(() => loadApplicants(token));
  }, [loadApplicants, token]);

  const seedAdmin = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/seed', { method: 'POST' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to create admin.');
      setMessage('Admin account is ready. You can login now.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create admin.');
    } finally {
      setIsLoading(false);
    }
  };

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
      await loadApplicants(result.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to login.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: ApplicantStatus) => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/applications/${id}/status`, {
        method: 'PATCH',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to update applicant.');
      setApplicants((current) => current.map((applicant) => (applicant.id === id ? { ...applicant, status } : applicant)));
      setSelectedApplicant((current) => (current?.id === id ? { ...current, status } : current));
      if (status === 'approve') {
        setMessage('Application approved. LMS access email has been sent to the guardian.');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to update applicant.');
    } finally {
      setIsLoading(false);
    }
  };

  const approveAll = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/applications/approve-all', {
        method: 'PATCH',
        headers: authHeaders,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to approve all applicants.');
      setApplicants((current) => current.map((applicant) => ({ ...applicant, status: 'approve' })));
      setSelectedApplicant((current) => (current ? { ...current, status: 'approve' } : null));
      setMessage('All applications approved. LMS access emails have been sent to guardians.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to approve all applicants.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken('');
    setApplicants([]);
    setSelectedApplicant(null);
  };

  const deleteApplicant = async (id: string) => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to delete applicant.');
      setApplicants((current) => current.filter((applicant) => applicant.id !== id));
      setSelectedApplicant((current) => (current?.id === id ? null : current));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete applicant.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className={token ? 'mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]' : 'mx-auto max-w-7xl'}>
          {token && <AdminSidebar active="dashboard" />}
          <div>
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">BIST admissions</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">Admin Portal</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">Review saved applications, inspect guardian contact details, and approve or reject applicants.</p>
            </div>

            {token && (
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => loadApplicants()} title="Refresh" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </button>
                <button type="button" onClick={approveAll} disabled={isLoading || applicants.length === 0} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
                  <UserCheck className="h-4 w-4" />
                  Approve All
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
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Create the default admin once, then login to manage applications.</p>
              </div>

              <form onSubmit={loginAdmin} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Email</span>
                  <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Password</span>
                  <input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
                </label>
                <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-70">
                  {isLoading ? 'Please wait...' : 'Login'}
                </button>
                <button type="button" onClick={seedAdmin} disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100">
                  Create Default Admin
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="grid gap-5">
              {isLoading && applicants.length === 0 && (
                <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                  <div className="h-5 w-48 rounded-full bg-zinc-100 dark:bg-white/10" />
                  <div className="mt-4 h-3 w-full rounded-full bg-zinc-100 dark:bg-white/10" />
                  <div className="mt-2 h-3 w-3/4 rounded-full bg-zinc-100 dark:bg-white/10" />
                </div>
              )}

              {!isLoading && applicants.length === 0 && (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">No applicants yet</h2>
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Submitted and in-progress applications will appear here after the admissions form syncs to the database.</p>
                </div>
              )}

              {selectedApplicant ? (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                      <div>
                        <button type="button" onClick={() => setSelectedApplicant(null)} className="mb-4 inline-flex items-center gap-2 text-sm font-black text-[#C8102E] transition hover:gap-3 dark:text-[#ff8fa0]">
                          <ArrowLeft className="h-4 w-4" />
                          Back to registered users
                        </button>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusStyles[selectedApplicant.status]}`}>{selectedApplicant.status}</span>
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">Updated {formatDate(selectedApplicant.updatedAt)}</span>
                        </div>
                        <h2 className="mt-4 text-3xl font-black text-zinc-950 dark:text-zinc-50">{getStudentName(selectedApplicant)}</h2>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{selectedApplicant.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <IconButton label="Approve" tone="approve" onClick={() => updateStatus(selectedApplicant.id, 'approve')} disabled={isLoading}><CheckCircle2 className="h-4 w-4" /></IconButton>
                        <IconButton label="Reject" tone="reject" onClick={() => updateStatus(selectedApplicant.id, 'reject')} disabled={isLoading}><XCircle className="h-4 w-4" /></IconButton>
                        <IconButton label="Delete" tone="delete" onClick={() => deleteApplicant(selectedApplicant.id)} disabled={isLoading}><Trash2 className="h-4 w-4" /></IconButton>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <DetailGrid title="Application" values={{ howFound: getApplicationData(selectedApplicant).howFound, email: selectedApplicant.email, createdAt: formatDate(selectedApplicant.createdAt), updatedAt: formatDate(selectedApplicant.updatedAt), paymentReceiptFileName: getApplicationData(selectedApplicant).paymentReceiptFileName }} />
                    {getGuardians(selectedApplicant).length ? getGuardians(selectedApplicant).map((guardian, index) => <DetailGrid key={`guardian-${index}`} title={`Guardian ${index + 1}`} values={guardian} />) : <EmptyDetail title="Guardian" message="Guardian details are not completed yet." />}
                    {getStudents(selectedApplicant).length ? getStudents(selectedApplicant).map((student, index) => <DetailGrid key={`student-${index}`} title={`Student ${index + 1}`} values={student} />) : <EmptyDetail title="Student" message="Student details are not completed yet. Ask the applicant to finish the Student step and wait for autosave." />}
                    <DetailGrid title="Declarations" values={{ declarations: getApplicationData(selectedApplicant).declarations ?? [] }} />
                  </div>

                  <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                    <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50">Uploaded Images</h3>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {getStudents(selectedApplicant).map((student, index) => <ImagePreview key={`student-passport-${index}`} title={`Student ${index + 1} passport`} url={student.passportUrl} />)}
                      {getGuardians(selectedApplicant).map((guardian, index) => <ImagePreview key={`guardian-passport-${index}`} title={`Guardian ${index + 1} passport`} url={guardian.passportUrl} />)}
                      <ImagePreview title="Payment receipt" url={getApplicationData(selectedApplicant).paymentReceiptUrl} />
                      {!getApplicationData(selectedApplicant).paymentReceiptUrl && !getStudents(selectedApplicant).some((student) => student.passportUrl) && !getGuardians(selectedApplicant).some((guardian) => guardian.passportUrl) && (
                        <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">No uploaded images yet.</p>
                      )}
                    </div>
                  </section>
                </motion.div>
              ) : (
                <>
                {applicants.length > 0 ? (
                <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[880px] text-left">
                      <thead className="bg-zinc-50 text-xs font-black uppercase tracking-[0.16em] text-zinc-500 dark:bg-white/[0.04] dark:text-zinc-400">
                        <tr>
                          <th className="px-5 py-4">Std Name</th>
                          <th className="px-5 py-4">Guardian Email</th>
                          <th className="px-5 py-4">Phone No</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Updated</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                        {applicants.map((applicant, index) => {
                          const guardian = getGuardian(applicant);

                          return (
                            <motion.tr key={applicant.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }} className="text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                              <td className="px-5 py-4">
                                <p className="font-black text-zinc-950 dark:text-zinc-50">{getStudentName(applicant)}</p>
                                <p className="mt-1 text-xs text-zinc-500">{getAdmissionYearGroups(applicant)}</p>
                              </td>
                              <td className="px-5 py-4 break-all font-bold">{guardian?.email || applicant.email}</td>
                              <td className="px-5 py-4 font-bold">{getGuardianPhone(applicant)}</td>
                              <td className="px-5 py-4">
                                <span className={`rounded-full border px-3 py-1 text-xs font-black ${statusStyles[applicant.status]}`}>{applicant.status}</span>
                              </td>
                              <td className="px-5 py-4 text-xs font-bold text-zinc-500">{formatDate(applicant.updatedAt)}</td>
                              <td className="px-5 py-4">
                                <div className="flex justify-end gap-2">
                                  <IconButton label="Approve" tone="approve" onClick={() => updateStatus(applicant.id, 'approve')} disabled={isLoading}><CheckCircle2 className="h-4 w-4" /></IconButton>
                                  <IconButton label="Reject" tone="reject" onClick={() => updateStatus(applicant.id, 'reject')} disabled={isLoading}><XCircle className="h-4 w-4" /></IconButton>
                                  <IconButton label="More" onClick={() => setSelectedApplicant(applicant)} disabled={isLoading}><Eye className="h-4 w-4" /></IconButton>
                                  <IconButton label="Delete" tone="delete" onClick={() => deleteApplicant(applicant.id)} disabled={isLoading}><Trash2 className="h-4 w-4" /></IconButton>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                ) : null}
                </>
              )}
            </div>
          )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
