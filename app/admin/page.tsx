'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Download, Edit3, Eye, EyeOff, Loader2, LockKeyhole, LogOut, RefreshCw, Save, Trash2, UserCheck, X, XCircle } from 'lucide-react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import PortalHeader from '@/components/layout/PortalHeader';
import { ADMIN_TOKEN_KEY } from '@/lib/storageKeys';
import { fallbackYearGroups } from '@/lib/yearGroups';

type ApplicantStatus = 'Pending' | 'approve' | 'reject';

type StudentData = Record<string, unknown> & { firstName?: string; lastName?: string; admissionYearGroup?: string; photoFileName?: string; photoUrl?: string; photoPublicId?: string; passportFileName?: string; passportUrl?: string; passportPublicId?: string };
type GuardianData = Record<string, unknown> & { firstName?: string; lastName?: string; email?: string; phoneCode?: string; phone?: string; passportFileName?: string; passportUrl?: string; passportPublicId?: string };
type ApplicationData = {
  howFound?: string;
  students?: StudentData[];
  guardians?: GuardianData[];
  paymentReceiptUrl?: string;
  paymentReceiptFileName?: string;
  paymentReceiptPublicId?: string;
  declarations?: string[];
  status?: ApplicantStatus;
  data?: ApplicationData;
  draft?: ApplicationData;
  application?: ApplicationData;
};

type Applicant = {
  id: string;
  email: string;
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

const textareaClass =
  'focus-ring min-h-24 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

const declarationOptions = [
  'I hereby declare that all information provided in this application form is true, complete, and accurate to the best of my knowledge. I understand that any false or misleading information may result in the withdrawal of an offer of admission or the cancellation of enrolment.',
  'I acknowledge that I have read and understood all policies and conditions set forth by The British International School of Tabuk (BIST), including those related to safeguarding, data protection, student welfare, and behaviour expectations available on school website',
  'By submitting this application, I confirm my agreement to abide by all school rules, regulations, and guidelines. I also consent to the School’s collection, processing, and storage of personal data in accordance with the Personal Data Protection Law (PDPL) of Saudi Arabia.',
];

const studentFields: Array<{ key: keyof StudentData; label: string; type?: string; options?: string[] }> = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
  { key: 'admissionYearGroup', label: 'Admission Year Group' },
  { key: 'gender', label: 'Gender', options: ['Male', 'Female'] },
  { key: 'nationality', label: 'Nationality' },
  { key: 'countryOfBirth', label: 'Country of Birth' },
  { key: 'spokenLanguages', label: 'Spoken Languages' },
  { key: 'startDate', label: 'Start Date', type: 'date' },
  { key: 'requiresSupport', label: 'Requires Special Educational Support?', options: ['Yes', 'No'] },
  { key: 'hasIqama', label: 'Does Child Have Iqama?', options: ['Yes', 'No'] },
];

const guardianFields: Array<{ key: keyof GuardianData; label: string; type?: string; options?: string[] }> = [
  { key: 'title', label: 'Contact Title', options: ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'] },
  { key: 'firstName', label: 'Contact First Name' },
  { key: 'lastName', label: 'Contact Last Name' },
  { key: 'email', label: 'Contact Email', type: 'email' },
  { key: 'phoneCode', label: 'Phone Country Code' },
  { key: 'phone', label: 'Contact Phone' },
  { key: 'homeAddress', label: 'Home Address' },
  { key: 'homeAddressLine1', label: 'Home Address Line 1' },
  { key: 'homeAddressLine2', label: 'Home Address Line 2' },
  { key: 'employer', label: 'Contact Employer' },
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'relationshipStatus', label: 'Relationship Status', options: ['Married', 'Remarried', 'Separated or Divorced'] },
  { key: 'nationality', label: 'Nationality' },
  { key: 'iqamaIssued', label: 'Is the Iqama Issued?', options: ['Yes', 'No'] },
  { key: 'relationshipToStudent', label: 'Relationship to Student', options: ['Father', 'Mother', 'Other'] },
];

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

function getPrimaryYearGroup(applicant: Applicant) {
  return getStudents(applicant)[0]?.admissionYearGroup || 'Year not selected';
}

function getYearSortIndex(year: string, yearOptions: string[]) {
  const index = yearOptions.indexOf(year);
  return index === -1 ? yearOptions.length + 1 : index;
}

function getGuardian(applicant: Applicant) {
  return getGuardians(applicant)[0];
}

function sanitizeExportValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(', ');
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function stripExportFields(values: Record<string, unknown>) {
  return Object.entries(values).filter(([key]) => {
    const normalizedKey = key.toLowerCase();
    return !normalizedKey.includes('url') && !normalizedKey.includes('publicid') && !normalizedKey.includes('filename') && normalizedKey !== 'declarations';
  });
}

function getGuardianPhone(applicant: Applicant) {
  const guardian = getGuardian(applicant);
  return [guardian?.phoneCode, guardian?.phone].filter(Boolean).join(' ') || 'Not added';
}

function getPrimaryStudentImage(applicant: Applicant) {
  const students = getStudents(applicant);
  return students.find((student) => student.photoUrl)?.photoUrl || students.find((student) => student.passportUrl)?.passportUrl;
}

async function readJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text.replace(/\s+/g, ' ').trim() || fallbackMessage);
  }
}

function editImageKey(section: 'students' | 'guardians', index: number, kind: 'photo' | 'passport') {
  return `${section}-${index}-${kind}`;
}

const paymentReceiptImageKey = 'application-payment-receipt';

function EditableImageField({
  label,
  currentUrl,
  currentFileName,
  selectedFileName,
  onChange,
}: {
  label: string;
  currentUrl?: string;
  currentFileName?: string;
  selectedFileName?: string;
  onChange: (file?: File) => void;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/40">
      <span className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{label}</span>
      <div className="mt-3 flex items-center gap-4">
        <div
          className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 bg-cover bg-center dark:border-white/10 dark:bg-zinc-800"
          style={currentUrl ? { backgroundImage: `url(${currentUrl})` } : undefined}
        >
          {!currentUrl && <div className="flex h-full w-full items-center justify-center text-xs font-black text-zinc-400">IMG</div>}
        </div>
        <div className="min-w-0 flex-1">
          {currentUrl ? (
            <a href={currentUrl} target="_blank" className="text-sm font-black text-[#C8102E] underline-offset-4 hover:underline dark:text-[#ff8fa0]">
              View current image
            </a>
          ) : (
            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">No image uploaded yet.</p>
          )}
          <p className="mt-1 truncate text-xs font-semibold text-zinc-400">{selectedFileName || currentFileName || 'Choose a replacement image'}</p>
        </div>
      </div>
      <input className={`${inputClass} mt-4`} type="file" accept="image/*" onChange={(event) => onChange(event.target.files?.[0])} />
    </div>
  );
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

function DeclarationsView({ declarations = [] }: { declarations?: string[] }) {
  return (
    <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50">Final Declarations</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Applicant confirmations captured at submission.</p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
          {declarations.length}/{declarationOptions.length}
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {declarationOptions.map((declaration, index) => {
          const isChecked = declarations.includes(declaration);

          return (
            <div
              key={declaration}
              className={`rounded-2xl border p-4 transition ${
                isChecked
                  ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-400/20 dark:bg-emerald-400/10'
                  : 'border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04]'
              }`}
            >
              <div className="flex gap-3">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isChecked ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-400 dark:bg-white/10'}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">Declaration {index + 1}</p>
                  <p className="mt-2 text-sm font-semibold leading-7 text-zinc-700 dark:text-zinc-200">{declaration}</p>
                </div>
              </div>
            </div>
          );
        })}
        {!declarations.length && <p className="rounded-2xl border border-dashed border-zinc-300 p-4 text-sm font-bold text-zinc-500 dark:border-white/10 dark:text-zinc-400">No declarations selected yet.</p>}
      </div>
    </section>
  );
}

function EditableField({
  label,
  value,
  onChange,
  type = 'text',
  options,
}: {
  label: string;
  value: unknown;
  onChange: (value: string | string[]) => void;
  type?: string;
  options?: string[];
}) {
  const fieldValue = Array.isArray(value) ? value.join(', ') : value ? String(value) : '';

  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] font-black uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{label}</span>
      {options ? (
        <select className={inputClass} value={fieldValue} onChange={(event) => onChange(event.target.value)}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : label.toLowerCase().includes('address') ? (
        <textarea className={textareaClass} value={fieldValue} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={inputClass} value={fieldValue} onChange={(event) => onChange(Array.isArray(value) ? event.target.value.split(',').map((item) => item.trim()).filter(Boolean) : event.target.value)} type={type} />
      )}
    </label>
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
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [editingApplicantId, setEditingApplicantId] = useState('');
  const [editData, setEditData] = useState<ApplicationData | null>(null);
  const [editImageFiles, setEditImageFiles] = useState<Record<string, File>>({});
  const [yearFilter, setYearFilter] = useState('');
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [isksafhYearOptions, setIsksafhYearOptions] = useState<string[]>(fallbackYearGroups);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);
  const visibleApplicants = useMemo(() => {
    return applicants
      .filter((applicant) => !yearFilter || getStudents(applicant).some((student) => student.admissionYearGroup === yearFilter))
      .sort((a, b) => {
        const yearDifference = getYearSortIndex(getPrimaryYearGroup(a), yearOptions) - getYearSortIndex(getPrimaryYearGroup(b), yearOptions);
        if (yearDifference !== 0) return yearDifference;
        return getStudentName(a).localeCompare(getStudentName(b));
      });
  }, [applicants, yearFilter, yearOptions]);

  const loadYearGroups = useCallback(async () => {
    try {
      const response = await fetch('/api/year-groups', { cache: 'no-store' });
      const result = await readJsonResponse<{ years?: string[] }>(response, 'Unable to load year groups.');
      setYearOptions(Array.isArray(result.years) ? result.years : []);
    } catch {
      setYearOptions([]);
    }
  }, []);

  const loadIsksafhYearGroups = useCallback(async () => {
    try {
      const response = await fetch('https://isksafh.vercel.app/api/public/years', { cache: 'no-store' });
      const result = await readJsonResponse<{ years?: string[] }>(response, 'Unable to load ISKSAFH year groups.');
      const years = Array.isArray(result.years) ? result.years.filter((year): year is string => typeof year === 'string' && Boolean(year.trim())) : [];
      setIsksafhYearOptions(years.length ? Array.from(new Set(years.map((year) => year.trim()))) : fallbackYearGroups);
    } catch {
      setIsksafhYearOptions(fallbackYearGroups);
    }
  }, []);

  const loadApplicants = useCallback(async (adminToken = token) => {
    if (!adminToken) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/applications', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          window.localStorage.removeItem(ADMIN_TOKEN_KEY);
          setToken('');
          setApplicants([]);
          setSelectedApplicant(null);
        }
        throw new Error(result.error ?? 'Unable to load applicants.');
      }
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

  const beginEditApplicant = (applicant: Applicant) => {
    const data = getApplicationData(applicant);
    setEditingApplicantId(applicant.id);
    setEditImageFiles({});
    setEditData({
      ...data,
      students: getStudents(applicant).length ? getStudents(applicant).map((student) => ({ ...student })) : [{}],
      guardians: getGuardians(applicant).length ? getGuardians(applicant).map((guardian) => ({ ...guardian })) : [{}],
      declarations: Array.isArray(data.declarations) ? data.declarations : [],
    });
  };

  const cancelEditApplicant = () => {
    setEditingApplicantId('');
    setEditData(null);
    setEditImageFiles({});
  };

  const updateEditField = (key: keyof ApplicationData, value: string | string[]) => {
    setEditData((current) => (current ? { ...current, [key]: value } : current));
  };

  const updateNestedEditField = (section: 'students' | 'guardians', index: number, key: string, value: string | string[]) => {
    setEditData((current) => {
      if (!current) return current;
      const list = [...((current[section] as Record<string, unknown>[] | undefined) ?? [])];
      list[index] = { ...(list[index] ?? {}), [key]: value };
      return { ...current, [section]: list };
    });
  };

  const updateEditImageFile = (key: string, file?: File) => {
    if (!file) return;
    setEditImageFiles((current) => ({ ...current, [key]: file }));
  };

  const uploadEditImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await readJsonResponse<{ error?: string; url: string; publicId: string; name: string }>(response, 'Upload failed.');
    if (!response.ok) throw new Error(result.error ?? 'Upload failed.');
    return result;
  };

  const deletePreviousImage = async ({ publicId, url }: { publicId?: string; url?: string }) => {
    if (!publicId && !url) return;

    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, url }),
      });
    } catch {
      // Old-file cleanup should not block a successful registration update.
    }
  };

  const toggleDeclaration = (declaration: string) => {
    setEditData((current) => {
      if (!current) return current;
      const declarations = Array.isArray(current.declarations) ? current.declarations : [];
      return {
        ...current,
        declarations: declarations.includes(declaration) ? declarations.filter((item) => item !== declaration) : [...declarations, declaration],
      };
    });
  };

  const saveApplicantEdit = async () => {
    if (!selectedApplicant || !editData) return;

    setIsLoading(true);
    setMessage('');
    try {
      const students = await Promise.all(
        (editData.students ?? []).map(async (student, index) => {
          let nextStudent: StudentData = { ...student };
          const photoFile = editImageFiles[editImageKey('students', index, 'photo')];
          const passportFile = editImageFiles[editImageKey('students', index, 'passport')];

          if (photoFile) {
            const uploaded = await uploadEditImage(photoFile);
            await deletePreviousImage({ publicId: nextStudent.photoPublicId, url: nextStudent.photoUrl });
            nextStudent = { ...nextStudent, photoFileName: uploaded.name, photoUrl: uploaded.url, photoPublicId: uploaded.publicId };
          }

          if (passportFile) {
            const uploaded = await uploadEditImage(passportFile);
            await deletePreviousImage({ publicId: nextStudent.passportPublicId, url: nextStudent.passportUrl });
            nextStudent = { ...nextStudent, passportFileName: uploaded.name, passportUrl: uploaded.url, passportPublicId: uploaded.publicId };
          }

          return nextStudent;
        }),
      );

      const guardians = await Promise.all(
        (editData.guardians ?? []).map(async (guardian, index) => {
          let nextGuardian: GuardianData = { ...guardian };
          const passportFile = editImageFiles[editImageKey('guardians', index, 'passport')];

          if (passportFile) {
            const uploaded = await uploadEditImage(passportFile);
            await deletePreviousImage({ publicId: nextGuardian.passportPublicId, url: nextGuardian.passportUrl });
            nextGuardian = { ...nextGuardian, passportFileName: uploaded.name, passportUrl: uploaded.url, passportPublicId: uploaded.publicId };
          }

          return nextGuardian;
        }),
      );

      let nextData: ApplicationData = { ...editData, students, guardians };
      const paymentReceiptFile = editImageFiles[paymentReceiptImageKey];

      if (paymentReceiptFile) {
        const uploaded = await uploadEditImage(paymentReceiptFile);
        await deletePreviousImage({ publicId: nextData.paymentReceiptPublicId, url: nextData.paymentReceiptUrl });
        nextData = { ...nextData, paymentReceiptFileName: uploaded.name, paymentReceiptUrl: uploaded.url, paymentReceiptPublicId: uploaded.publicId };
      }
      const response = await fetch(`/api/admin/applications/${selectedApplicant.id}`, {
        method: 'PATCH',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: nextData, status: selectedApplicant.status }),
      });
      const result = await readJsonResponse<{ error?: string; application: Applicant }>(response, 'Unable to update application.');
      if (!response.ok) throw new Error(result.error ?? 'Unable to update application.');

      const updatedApplicant: Applicant = { ...selectedApplicant, data: result.application.data, status: result.application.status, updatedAt: result.application.updatedAt };
      setApplicants((current) => current.map((applicant) => (applicant.id === selectedApplicant.id ? updatedApplicant : applicant)));
      setSelectedApplicant(updatedApplicant);
      cancelEditApplicant();
      setMessage('Application form updated successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to update application.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      const savedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
      if (savedToken) setToken(savedToken);
    });
    queueMicrotask(() => loadYearGroups());
    queueMicrotask(() => loadIsksafhYearGroups());
  }, [loadIsksafhYearGroups, loadYearGroups]);

  useEffect(() => {
    if (!token) return;
    queueMicrotask(() => loadApplicants(token));
  }, [loadApplicants, token]);

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

  const downloadExcel = () => {
    const rows = visibleApplicants.flatMap((applicant) => {
      const data = getApplicationData(applicant);
      const guardians = getGuardians(applicant);
      const primaryGuardian = guardians[0] ?? {};
      const students = getStudents(applicant);
      const exportStudents = students.length ? students : [{} as StudentData];

      return exportStudents.map((student, index) => {
        const baseValues: Record<string, unknown> = {
          applicationId: applicant.id,
          status: applicant.status,
          guardianEmail: primaryGuardian.email || applicant.email,
          guardianPhone: getGuardianPhone(applicant),
          howFound: data.howFound,
          createdAt: formatDate(applicant.createdAt),
          updatedAt: formatDate(applicant.updatedAt),
          studentNumber: index + 1,
          ...Object.fromEntries(stripExportFields(student)),
          ...Object.fromEntries(stripExportFields(primaryGuardian).map(([key, value]) => [`guardian_${key}`, value])),
        };

        return baseValues;
      });
    });

    if (!rows.length) {
      setMessage('There are no applicants to export.');
      return;
    }

    const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
    const escapeCell = (value: unknown) => sanitizeExportValue(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const html = `
      <html>
        <head><meta charset="utf-8" /></head>
        <body>
          <table>
            <thead><tr>${headers.map((header) => `<th>${escapeCell(header)}</th>`).join('')}</tr></thead>
            <tbody>${rows.map((row) => `<tr>${headers.map((header) => `<td>${escapeCell(row[header])}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bist-applicants${yearFilter ? `-${yearFilter.replace(/\s+/g, '-').toLowerCase()}` : ''}.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
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
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Login to manage applications.</p>
              </div>

              <form onSubmit={loginAdmin} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Email</span>
                  <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">Password</span>
                  <div className="flex overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 transition focus-within:border-[#C8102E] focus-within:ring-4 focus-within:ring-[#C8102E]/10 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/20">
                    <input
                      className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type={showAdminPassword ? 'text' : 'password'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword((current) => !current)}
                      className="flex w-12 items-center justify-center text-zinc-500 transition hover:text-[#C8102E] dark:text-zinc-400 dark:hover:text-[#ff8fa0]"
                      aria-label={showAdminPassword ? 'Hide password' : 'Show password'}
                    >
                      {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>
                <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-70">
                  {isLoading ? 'Please wait...' : 'Login'}
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="grid gap-5">
              <div className="flex flex-col justify-between gap-3 rounded-3xl border border-zinc-200/80 bg-white p-4 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 sm:flex-row sm:items-center">
                <label className="block sm:w-72">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Filter by year</span>
                  <select className={inputClass} value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}>
                    <option value="">All year groups</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </label>
                <button type="button" onClick={downloadExcel} disabled={!visibleApplicants.length} className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-black text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C8102E]/30 hover:text-[#C8102E] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:hover:text-[#C9A84C]">
                  <Download className="h-4 w-4" />
                  Download Excel
                </button>
              </div>

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

              {!isLoading && applicants.length > 0 && visibleApplicants.length === 0 && (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">No students in this year group</h2>
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Choose another year group or reset the filter to view all applicants.</p>
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
                        <IconButton label="Edit registration form" onClick={() => beginEditApplicant(selectedApplicant)} disabled={isLoading}><Edit3 className="h-4 w-4" /></IconButton>
                        <IconButton label="Approve" tone="approve" onClick={() => updateStatus(selectedApplicant.id, 'approve')} disabled={isLoading}><CheckCircle2 className="h-4 w-4" /></IconButton>
                        <IconButton label="Reject" tone="reject" onClick={() => updateStatus(selectedApplicant.id, 'reject')} disabled={isLoading}><XCircle className="h-4 w-4" /></IconButton>
                        <IconButton label="Delete" tone="delete" onClick={() => deleteApplicant(selectedApplicant.id)} disabled={isLoading}><Trash2 className="h-4 w-4" /></IconButton>
                      </div>
                    </div>
                  </div>

                  {editingApplicantId === selectedApplicant.id && editData ? (
                    <section className="rounded-3xl border border-[#C8102E]/15 bg-white p-5 shadow-2xl shadow-zinc-900/8 dark:border-[#ff8fa0]/20 dark:bg-zinc-900/88">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="text-xl font-black text-zinc-950 dark:text-zinc-50">Edit Registration Form</h3>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Update saved application details. Uploaded image files are managed separately.</p>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={saveApplicantEdit} disabled={isLoading} className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-60">
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save
                          </button>
                          <button type="button" onClick={cancelEditApplicant} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-black text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100">
                            <X className="h-4 w-4" />
                            Cancel
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-5">
                        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                          <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">Application</h4>
                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <EditableField label="How You Found BIST?" value={editData.howFound} onChange={(value) => updateEditField('howFound', value)} options={['School Website', 'Current BIST Staff or Student', 'Online Search']} />
                            <EditableField label="Payment Receipt File Name" value={editData.paymentReceiptFileName} onChange={(value) => updateEditField('paymentReceiptFileName', value)} />
                            <EditableImageField
                              label="Payment Receipt"
                              currentUrl={editData.paymentReceiptUrl}
                              currentFileName={editData.paymentReceiptFileName}
                              selectedFileName={editImageFiles[paymentReceiptImageKey]?.name}
                              onChange={(file) => updateEditImageFile(paymentReceiptImageKey, file)}
                            />
                          </div>
                        </div>

                        {(editData.students ?? []).map((student, index) => (
                          <div key={`edit-student-${index}`} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                            <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">Student {index + 1}</h4>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                              {studentFields.map((field) => (
                                <EditableField
                                  key={String(field.key)}
                                  label={field.label}
                                  type={field.type}
                                  options={field.key === 'admissionYearGroup' ? isksafhYearOptions : field.options}
                                  value={student[field.key]}
                                  onChange={(value) => updateNestedEditField('students', index, String(field.key), value)}
                                />
                              ))}
                              <EditableImageField
                                label="Student Photo"
                                currentUrl={student.photoUrl}
                                currentFileName={student.photoFileName}
                                selectedFileName={editImageFiles[editImageKey('students', index, 'photo')]?.name}
                                onChange={(file) => updateEditImageFile(editImageKey('students', index, 'photo'), file)}
                              />
                              <EditableImageField
                                label="Student Passport"
                                currentUrl={student.passportUrl}
                                currentFileName={student.passportFileName}
                                selectedFileName={editImageFiles[editImageKey('students', index, 'passport')]?.name}
                                onChange={(file) => updateEditImageFile(editImageKey('students', index, 'passport'), file)}
                              />
                            </div>
                          </div>
                        ))}

                        {(editData.guardians ?? []).map((guardian, index) => (
                          <div key={`edit-guardian-${index}`} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                            <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">Guardian {index + 1}</h4>
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                              {guardianFields.map((field) => (
                                <EditableField
                                  key={String(field.key)}
                                  label={field.label}
                                  type={field.type}
                                  options={field.options}
                                  value={guardian[field.key]}
                                  onChange={(value) => updateNestedEditField('guardians', index, String(field.key), value)}
                                />
                              ))}
                              <EditableImageField
                                label="Guardian Passport"
                                currentUrl={guardian.passportUrl}
                                currentFileName={guardian.passportFileName}
                                selectedFileName={editImageFiles[editImageKey('guardians', index, 'passport')]?.name}
                                onChange={(file) => updateEditImageFile(editImageKey('guardians', index, 'passport'), file)}
                              />
                            </div>
                          </div>
                        ))}

                        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                          <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50">Final Declarations</h4>
                          <div className="mt-4 space-y-3">
                            {declarationOptions.map((declaration, index) => {
                              const checked = (editData.declarations ?? []).includes(declaration);

                              return (
                                <label key={declaration} className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${checked ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-400/10' : 'border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950/40'}`}>
                                  <input type="checkbox" checked={checked} onChange={() => toggleDeclaration(declaration)} className="mt-1 h-4 w-4 rounded border-zinc-300 text-[#C8102E] focus:ring-[#C8102E]" />
                                  <span>
                                    <span className="block text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Declaration {index + 1}</span>
                                    <span className="mt-2 block text-sm font-semibold leading-7 text-zinc-700 dark:text-zinc-200">{declaration}</span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : (
                    <div className="grid gap-5 lg:grid-cols-2">
                      <DetailGrid title="Application" values={{ howFound: getApplicationData(selectedApplicant).howFound, email: selectedApplicant.email, createdAt: formatDate(selectedApplicant.createdAt), updatedAt: formatDate(selectedApplicant.updatedAt), paymentReceiptFileName: getApplicationData(selectedApplicant).paymentReceiptFileName }} />
                      {getGuardians(selectedApplicant).length ? getGuardians(selectedApplicant).map((guardian, index) => <DetailGrid key={`guardian-${index}`} title={`Guardian ${index + 1}`} values={guardian} />) : <EmptyDetail title="Guardian" message="Guardian details are not completed yet." />}
                      {getStudents(selectedApplicant).length ? getStudents(selectedApplicant).map((student, index) => <DetailGrid key={`student-${index}`} title={`Student ${index + 1}`} values={student} />) : <EmptyDetail title="Student" message="Student details are not completed yet. Ask the applicant to finish the Student step and wait for autosave." />}
                      <DeclarationsView declarations={getApplicationData(selectedApplicant).declarations ?? []} />
                    </div>
                  )}

                  <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                    <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50">Uploaded Images</h3>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {getStudents(selectedApplicant).map((student, index) => <ImagePreview key={`student-photo-${index}`} title={`Student ${index + 1} photo`} url={student.photoUrl} />)}
                      {getStudents(selectedApplicant).map((student, index) => <ImagePreview key={`student-passport-${index}`} title={`Student ${index + 1} passport`} url={student.passportUrl} />)}
                      {getGuardians(selectedApplicant).map((guardian, index) => <ImagePreview key={`guardian-passport-${index}`} title={`Guardian ${index + 1} passport`} url={guardian.passportUrl} />)}
                      <ImagePreview title="Payment receipt" url={getApplicationData(selectedApplicant).paymentReceiptUrl} />
                      {!getApplicationData(selectedApplicant).paymentReceiptUrl && !getStudents(selectedApplicant).some((student) => student.photoUrl || student.passportUrl) && !getGuardians(selectedApplicant).some((guardian) => guardian.passportUrl) && (
                        <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400">No uploaded images yet.</p>
                      )}
                    </div>
                  </section>
                </motion.div>
              ) : (
                <>
                {visibleApplicants.length > 0 ? (
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
                        {visibleApplicants.map((applicant, index) => {
                          const guardian = getGuardian(applicant);
                          const studentImage = getPrimaryStudentImage(applicant);

                          return (
                            <motion.tr key={applicant.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }} className="text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 bg-cover bg-center dark:border-white/10 dark:bg-zinc-800"
                                    style={studentImage ? { backgroundImage: `url(${studentImage})` } : undefined}
                                    aria-label="Student image"
                                  >
                                    {!studentImage && <div className="flex h-full w-full items-center justify-center text-xs font-black text-zinc-400">STD</div>}
                                  </div>
                                  <div>
                                    <p className="font-black text-zinc-950 dark:text-zinc-50">{getStudentName(applicant)}</p>
                                    <p className="mt-1 text-xs text-zinc-500">{getAdmissionYearGroups(applicant)}</p>
                                  </div>
                                </div>
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
