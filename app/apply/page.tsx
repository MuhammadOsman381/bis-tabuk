'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Edit3,
  FileCheck2,
  GraduationCap,
  Plus,
  School,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
} from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';
import { APPLY_DRAFT_KEY, AUTH_TOKEN_KEY, USER_EMAIL_ENCODED_KEY } from '@/lib/storageKeys';
import { yearGroups } from '@/lib/yearGroups';

type StudentForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  admissionYearGroup: string;
  gender: string;
  nationality: string;
  countryOfBirth: string;
  spokenLanguages: string[];
  startDate: string;
  requiresSupport: string;
  passportFileName: string;
  passportUrl: string;
  passportPublicId: string;
  hasIqama: string;
};

type GuardianForm = {
  title: string;
  firstName: string;
  lastName: string;
  homeAddress: string;
  homeAddressLine1: string;
  homeAddressLine2: string;
  employer: string;
  jobTitle: string;
  email: string;
  phoneCode: string;
  phone: string;
  relationshipStatus: string;
  nationality: string;
  passportFileName: string;
  passportUrl: string;
  passportPublicId: string;
  iqamaIssued: string;
  relationshipToStudent: string;
};

type ApplyDraft = {
  howFound: string;
  students: StudentForm[];
  guardians: GuardianForm[];
  paymentReceiptFileName: string;
  paymentReceiptUrl: string;
  paymentReceiptPublicId: string;
  declarations: string[];
  status: 'Pending' | 'approve' | 'reject';
};

type SavedApplication = {
  id: string;
  data: ApplyDraft | { data?: ApplyDraft; draft?: ApplyDraft; application?: ApplyDraft };
  status: ApplyDraft['status'];
  createdAt: string;
  updatedAt: string;
};

type CountryApiItem = {
  name?: { common?: string };
  idd?: { root?: string; suffixes?: string[] };
  cca2?: string;
  languages?: Record<string, string>;
};

const steps = [
  { label: 'Application', icon: School },
  { label: 'Student', icon: UserRound },
  { label: 'Guardian', icon: UsersRound },
  { label: 'Declaration', icon: ShieldCheck },
];

const fallbackCountries = ['Saudi Arabia', 'United Kingdom', 'United States', 'Pakistan', 'India', 'Egypt', 'Jordan', 'Lebanon', 'Philippines', 'South Africa', 'Türkiye', 'United Arab Emirates'];
const fallbackLanguages = ['Arabic', 'English', 'French', 'Spanish', 'Urdu', 'Hindi', 'Tagalog', 'Turkish', 'German', 'Mandarin'];
const fallbackPhoneCodes = ['🇸🇦 +966', '🇬🇧 +44', '🇺🇸 +1', '🇵🇰 +92', '🇮🇳 +91', '🇪🇬 +20', '🇯🇴 +962', '🇦🇪 +971'];
const MAX_UPLOAD_BYTES = 3.8 * 1024 * 1024;
const IMAGE_COMPRESSION_THRESHOLD_BYTES = 1.8 * 1024 * 1024;
const declarationOptions = [
  'I hereby declare that all information provided in this application form is true, complete, and accurate to the best of my knowledge. I understand that any false or misleading information may result in the withdrawal of an offer of admission or the cancellation of enrolment.',
  'I acknowledge that I have read and understood all policies and conditions set forth by The British International School of Tabuk (BIST), including those related to safeguarding, data protection, student welfare, and behaviour expectations available on school website.',
  'By submitting this application, I confirm my agreement to abide by all school rules, regulations, and guidelines. I also consent to the School’s collection, processing, and storage of personal data in accordance with the Personal Data Protection Law (PDPL) of Saudi Arabia.',
];

const emptyStudent = (): StudentForm => ({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  admissionYearGroup: '',
  gender: '',
  nationality: '',
  countryOfBirth: '',
  spokenLanguages: [],
  startDate: '',
  requiresSupport: '',
  passportFileName: '',
  passportUrl: '',
  passportPublicId: '',
  hasIqama: '',
});

const emptyGuardian = (): GuardianForm => ({
  title: '',
  firstName: '',
  lastName: '',
  homeAddress: '',
  homeAddressLine1: '',
  homeAddressLine2: '',
  employer: '',
  jobTitle: '',
  email: '',
  phoneCode: '🇸🇦 +966',
  phone: '',
  relationshipStatus: '',
  nationality: '',
  passportFileName: '',
  passportUrl: '',
  passportPublicId: '',
  iqamaIssued: '',
  relationshipToStudent: '',
});

const initialDraft = (): ApplyDraft => ({
  howFound: '',
  students: [emptyStudent()],
  guardians: [emptyGuardian()],
  paymentReceiptFileName: '',
  paymentReceiptUrl: '',
  paymentReceiptPublicId: '',
  declarations: [],
  status: 'Pending',
});

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

function Field({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
        {label} {required && <span className="text-[#C8102E]">*</span>}
      </span>
      {children}
    </label>
  );
}

function ApplicationCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/30 sm:p-8"
    >
      <div className="mb-7">
        <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">{title}</h2>
        {subtitle && <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <select className={inputClass} value={value} onChange={(event) => onChange(event.target.value)} required={required}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function SearchableInput({
  value,
  onChange,
  options,
  listId,
  placeholder = 'Search...',
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  listId: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <>
      <input
        className={inputClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        list={listId}
        placeholder={placeholder}
        required={required}
      />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </>
  );
}

function TextInput({
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return <input className={inputClass} value={value} onChange={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} required={required} />;
}

function RadioGroup({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
            value === option
              ? 'border-[#C8102E] bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20'
              : 'border-zinc-200 bg-white text-zinc-700 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function MultiSelect({
  values,
  onChange,
  options,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
}) {
  const [query, setQuery] = useState('');
  const toggle = (option: string) => {
    onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option]);
  };
  const filteredOptions = options
    .filter((option) => option.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 36);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-zinc-950/70">
      <input
        className="mb-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-950 outline-none transition focus:border-[#C8102E] focus:ring-4 focus:ring-[#C8102E]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search languages..."
      />
      {values.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {values.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              className="rounded-full bg-[#C8102E]/10 px-3 py-1.5 text-xs font-black text-[#C8102E] transition hover:bg-[#C8102E] hover:text-white dark:bg-[#C9A84C]/10 dark:text-[#C9A84C]"
            >
              {value} ×
            </button>
          ))}
        </div>
      )}
      <div className="grid max-h-44 gap-2 overflow-y-auto sm:grid-cols-2">
        {filteredOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className={`rounded-xl px-3 py-2 text-left text-xs font-bold transition ${
              values.includes(option)
                ? 'bg-[#C8102E] text-white'
                : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-white/10'
            }`}
          >
            {option}
          </button>
        ))}
        {filteredOptions.length === 0 && (
          <p className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">No languages found.</p>
        )}
      </div>
    </div>
  );
}

function decodeEmail(value: string | null) {
  if (!value) return '';
  try {
    return CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
  } catch {
    return '';
  }
}

function stripFileData(draft: ApplyDraft): ApplyDraft {
  return {
    ...draft,
    students: draft.students.map((student) => ({
      ...student,
      passportFileName: '',
      passportUrl: '',
      passportPublicId: '',
    })),
    guardians: draft.guardians.map((guardian) => ({
      ...guardian,
      passportFileName: '',
      passportUrl: '',
      passportPublicId: '',
    })),
    paymentReceiptFileName: '',
    paymentReceiptUrl: '',
    paymentReceiptPublicId: '',
  };
}

function normalizeDraft(data: SavedApplication['data'] | Partial<ApplyDraft> | null | undefined): ApplyDraft {
  const nestedData = data as { data?: Partial<ApplyDraft>; draft?: Partial<ApplyDraft>; application?: Partial<ApplyDraft> } | null | undefined;
  const parsed = (nestedData?.data ?? nestedData?.draft ?? nestedData?.application ?? data ?? {}) as Partial<ApplyDraft>;

  return {
    howFound: parsed.howFound ?? '',
    students: parsed.students?.length ? parsed.students : [emptyStudent()],
    guardians: parsed.guardians?.length ? parsed.guardians : [emptyGuardian()],
    paymentReceiptFileName: parsed.paymentReceiptFileName ?? '',
    paymentReceiptUrl: parsed.paymentReceiptUrl ?? '',
    paymentReceiptPublicId: parsed.paymentReceiptPublicId ?? '',
    declarations: parsed.declarations ?? [],
    status: parsed.status ?? 'Pending',
  };
}

function formatApplicationDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function getApplicationTitle(application: SavedApplication) {
  const data = normalizeDraft(application.data);
  const names = data.students
    .map((student, index) => [student.firstName, student.lastName].filter(Boolean).join(' ') || `Student ${index + 1}`)
    .join(', ');

  return names || 'Untitled application';
}

function getApplicationYear(application: SavedApplication) {
  const data = normalizeDraft(application.data);
  const years = data.students.map((student) => student.admissionYearGroup).filter(Boolean);
  return years.length ? years.join(', ') : 'Year not selected';
}

async function readJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    const cleanText = text.replace(/\s+/g, ' ').trim();
    const message = cleanText || fallbackMessage;
    throw new Error(message.startsWith('Request Entity Too Large') ? 'The selected image is too large. Please choose a smaller image.' : message);
  }
}

async function compressImageForUpload(file: File) {
  if (!file.type.startsWith('image/') || file.size <= IMAGE_COMPRESSION_THRESHOLD_BYTES) return file;

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Unable to prepare image for upload.'));
      img.src = imageUrl;
    });

    const maxDimension = 1600;
    const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));

    const context = canvas.getContext('2d');
    if (!context) return file;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.78));
    if (!blob || blob.size >= file.size) return file;

    const safeName = file.name.replace(/\.[^.]+$/, '') || 'passport';
    return new File([blob], `${safeName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export default function ApplyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [editingApplicationId, setEditingApplicationId] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [draft, setDraft] = useState<ApplyDraft>(() => initialDraft());
  const [applications, setApplications] = useState<SavedApplication[]>([]);
  const [countries, setCountries] = useState(fallbackCountries);
  const [languages, setLanguages] = useState(fallbackLanguages);
  const [phoneCodes, setPhoneCodes] = useState(fallbackPhoneCodes);
  const [userEmail, setUserEmail] = useState('');
  const [syncState, setSyncState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [studentPassportFiles, setStudentPassportFiles] = useState<Record<number, File>>({});
  const [guardianPassportFiles, setGuardianPassportFiles] = useState<Record<number, File>>({});

  const loadApplications = useCallback(async (token: string) => {
    const response = await fetch('/api/applications/draft', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await readJsonResponse<{ error?: string; applications?: SavedApplication[] }>(response, 'Unable to load applications.');
    if (!response.ok) throw new Error(result.error ?? 'Unable to load applications.');
    setApplications(result.applications ?? []);
  }, []);

  const persistDraft = useCallback((nextDraft: ApplyDraft) => {
    window.localStorage.setItem(APPLY_DRAFT_KEY, JSON.stringify(stripFileData(nextDraft)));
    setSyncState('saved');
  }, []);

  const updateDraft = useCallback(
    (updater: ApplyDraft | ((current: ApplyDraft) => ApplyDraft)) => {
      setDraft((current) => {
        const nextDraft = typeof updater === 'function' ? updater(current) : updater;
        persistDraft(nextDraft);
        return nextDraft;
      });
    },
    [persistDraft],
  );

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;

      const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        const redirect = encodeURIComponent(pathname);
        router.replace(`/login?redirect=${redirect}&from=${redirect}`);
        return;
      }

      const savedDraft = window.localStorage.getItem(APPLY_DRAFT_KEY);
      const savedEmail = decodeEmail(window.localStorage.getItem(USER_EMAIL_ENCODED_KEY));
      setUserEmail(savedEmail);

      if (savedDraft) {
        try {
          setDraft(stripFileData(normalizeDraft(JSON.parse(savedDraft) as Partial<ApplyDraft>)));
        } catch {
          window.localStorage.removeItem(APPLY_DRAFT_KEY);
        }
      } else if (savedEmail) {
        updateDraft((current) => ({
          ...current,
          guardians: current.guardians.map((guardian, index) => (index === 0 ? { ...guardian, email: savedEmail } : guardian)),
        }));
      }

      loadApplications(token)
        .catch((error) => setSubmitError(error instanceof Error ? error.message : 'Unable to load applications.'))
        .finally(() => setIsCheckingAuth(false));
    });

    return () => {
      isActive = false;
    };
  }, [loadApplications, pathname, router, updateDraft]);

  useEffect(() => {
    async function loadDirectoryData() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2,languages');
        const data = (await response.json()) as CountryApiItem[];
        const countryNames = data.map((item) => item.name?.common).filter(Boolean).sort() as string[];
        const languageNames = Array.from(new Set(data.flatMap((item) => Object.values(item.languages ?? {})))).sort();
        const dialCodes = Array.from(
          new Set(
            data
              .flatMap((item) => {
                const root = item.idd?.root;
                const suffix = item.idd?.suffixes?.[0];
                if (!root || !suffix) return [];
                const flag = item.cca2
                  ? item.cca2
                      .toUpperCase()
                      .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
                  : '';
                return [`${flag} ${root}${suffix}`.trim()];
              })
              .filter(Boolean),
          ),
        ).sort();

        if (countryNames.length) setCountries(countryNames);
        if (languageNames.length) setLanguages(languageNames);
        if (dialCodes.length) setPhoneCodes(dialCodes);
      } catch {
        setCountries(fallbackCountries);
        setLanguages(fallbackLanguages);
        setPhoneCodes(fallbackPhoneCodes);
      }
    }

    loadDirectoryData();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !submitted) {
      window.localStorage.setItem(APPLY_DRAFT_KEY, JSON.stringify(stripFileData(draft)));
    }
  }, [draft, isCheckingAuth, submitted]);

  const uploadFile = async (file: File) => {
    const uploadableFile = await compressImageForUpload(file);
    if (uploadableFile.size > MAX_UPLOAD_BYTES) {
      throw new Error('The selected image is too large. Please choose a smaller image.');
    }

    const body = new FormData();
    body.append('file', uploadableFile);
    const response = await fetch('/api/upload', { method: 'POST', body });
    const result = await readJsonResponse<{ error?: string; url: string; publicId: string; name: string }>(response, 'Upload failed.');
    if (!response.ok) throw new Error(result.error ?? 'Upload failed.');
    return result as { url: string; publicId: string; name: string };
  };

  const deleteUploadedFile = async ({ publicId, url, token }: { publicId?: string; url?: string; token: string }) => {
    if (!publicId && !url) return;

    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, url }),
      });
    } catch {
      // A failed cleanup should not block application submission after the replacement upload succeeds.
    }
  };

  const updateStudent = (index: number, updates: Partial<StudentForm>) => {
    updateDraft((current) => ({
      ...current,
      students: current.students.map((student, studentIndex) => (studentIndex === index ? { ...student, ...updates } : student)),
    }));
  };

  const updateGuardian = (index: number, updates: Partial<GuardianForm>) => {
    updateDraft((current) => ({
      ...current,
      guardians: current.guardians.map((guardian, guardianIndex) => (guardianIndex === index ? { ...guardian, ...updates } : guardian)),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!declarationOptions.every((declaration) => draft.declarations.includes(declaration))) {
      setActiveStep(3);
      setSubmitError('Please accept all final declarations before submitting your application.');
      return;
    }

    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token || !userEmail) {
      setSubmitError('Please login again before submitting your application.');
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}&from=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitProgress('Preparing documents...');
    setSyncState('saving');

    try {
      draft.students.forEach((student, index) => {
        if (!studentPassportFiles[index] && !student.passportUrl) throw new Error(`Please upload passport image for Student ${index + 1}.`);
      });
      draft.guardians.forEach((guardian, index) => {
        if (!guardianPassportFiles[index] && !guardian.passportUrl) throw new Error(`Please upload passport image for Guardian ${index + 1}.`);
      });

      const totalUploads = Object.keys(studentPassportFiles).length + Object.keys(guardianPassportFiles).length;
      let completedUploads = 0;
      const markUploadDone = () => {
        completedUploads += 1;
        setSubmitProgress(totalUploads ? `Uploading documents ${completedUploads}/${totalUploads}...` : 'Saving application...');
      };

      setSubmitProgress(totalUploads ? `Uploading documents 0/${totalUploads}...` : 'Saving application...');
      const [studentsWithUploads, guardiansWithUploads] = await Promise.all([
        Promise.all(
          draft.students.map(async (student, index) => {
            const file = studentPassportFiles[index];
            if (!file && student.passportUrl) return student;
            if (!file) throw new Error(`Please upload passport image for Student ${index + 1}.`);
            const result = await uploadFile(file);
            await deleteUploadedFile({ publicId: student.passportPublicId, url: student.passportUrl, token });
            markUploadDone();
            return { ...student, passportFileName: result.name, passportUrl: result.url, passportPublicId: result.publicId };
          }),
        ),
        Promise.all(
          draft.guardians.map(async (guardian, index) => {
            const file = guardianPassportFiles[index];
            if (!file && guardian.passportUrl) return guardian;
            if (!file) throw new Error(`Please upload passport image for Guardian ${index + 1}.`);
            const result = await uploadFile(file);
            await deleteUploadedFile({ publicId: guardian.passportPublicId, url: guardian.passportUrl, token });
            markUploadDone();
            return { ...guardian, passportFileName: result.name, passportUrl: result.url, passportPublicId: result.publicId };
          }),
        ),
      ]);

      const finalDraft: ApplyDraft = {
        ...draft,
        students: studentsWithUploads,
        guardians: guardiansWithUploads,
        paymentReceiptFileName: '',
        paymentReceiptUrl: '',
        paymentReceiptPublicId: '',
        status: 'Pending',
      };

      const tokenHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
      setSubmitProgress('Saving application...');
      const response = await fetch('/api/applications/draft', {
        method: editingApplicationId ? 'PUT' : 'POST',
        headers: tokenHeaders,
        body: JSON.stringify({ id: editingApplicationId || undefined, data: finalDraft, status: 'Pending' }),
      });
      const result = await readJsonResponse<{ error?: string }>(response, 'Unable to submit application.');
      if (!response.ok) throw new Error(result.error ?? 'Unable to submit application.');

      setSyncState('saved');
      setSubmitted(true);
      setEditingApplicationId('');
      setDraft(initialDraft());
      setStudentPassportFiles({});
      setGuardianPassportFiles({});
      setSubmitProgress('');
      window.localStorage.removeItem(APPLY_DRAFT_KEY);
      await loadApplications(token);
    } catch (error) {
      setSyncState('error');
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentPassport = async (index: number, file: File | undefined) => {
    if (!file) return;
    setStudentPassportFiles((current) => ({ ...current, [index]: file }));
    updateStudent(index, { passportFileName: file.name });
  };

  const handleGuardianPassport = async (index: number, file: File | undefined) => {
    if (!file) return;
    setGuardianPassportFiles((current) => ({ ...current, [index]: file }));
    updateGuardian(index, { passportFileName: file.name });
  };

  const startNewApplication = () => {
    const savedEmail = userEmail || decodeEmail(window.localStorage.getItem(USER_EMAIL_ENCODED_KEY));
    const nextDraft = initialDraft();
    if (savedEmail) nextDraft.guardians[0].email = savedEmail;
    setDraft(nextDraft);
    setStudentPassportFiles({});
    setGuardianPassportFiles({});
    setEditingApplicationId('');
    setSubmitted(false);
    setSubmitError('');
    setSubmitProgress('');
    setSyncState('idle');
    setActiveStep(0);
    window.localStorage.removeItem(APPLY_DRAFT_KEY);
    setViewMode('form');
  };

  const editApplication = (application: SavedApplication) => {
    setDraft(normalizeDraft(application.data));
    setStudentPassportFiles({});
    setGuardianPassportFiles({});
    setEditingApplicationId(application.id);
    setSubmitted(false);
    setSubmitError('');
    setSubmitProgress('');
    setSyncState('idle');
    setActiveStep(0);
    setViewMode('form');
  };

  const returnToApplications = () => {
    setViewMode('list');
    setSubmitted(false);
    setEditingApplicationId('');
    setSubmitError('');
    setSubmitProgress('');
  };

  const allDeclarationsAccepted = declarationOptions.every((declaration) => draft.declarations.includes(declaration));
  const activeStepLabel = steps[activeStep].label;
  const goToPreviousStep = () => setActiveStep((step) => Math.max(0, step - 1));
  const goToNextStep = () => setActiveStep((step) => Math.min(steps.length - 1, step + 1));

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-10 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        {isCheckingAuth ? (
          <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
            <div className="w-full rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
              <div className="mb-6 h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-white/10" />
              <div className="h-5 w-44 rounded-full bg-zinc-100 dark:bg-white/10" />
              <div className="mt-4 h-3 w-full rounded-full bg-zinc-100 dark:bg-white/10" />
              <div className="mt-2 h-3 w-3/4 rounded-full bg-zinc-100 dark:bg-white/10" />
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="mx-auto max-w-5xl">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full text-sm font-bold text-[#C8102E] transition hover:gap-3 dark:text-[#ff8fa0]">
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>

            <div className="mb-8 flex flex-col justify-between gap-5 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 sm:p-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">BIST admissions</p>
                <h1 className="mt-3 text-3xl font-black text-zinc-950 dark:text-zinc-50 sm:text-4xl">Your Applications</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">View previously submitted forms, edit an existing application, or start a fresh application.</p>
              </div>
              <button type="button" onClick={startNewApplication} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23]">
                <Plus className="h-4 w-4" />
                Submit New Form
              </button>
            </div>

            {submitError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 shadow-sm dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200">
                {submitError}
              </div>
            )}

            <div className="grid gap-4">
              {applications.length ? applications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035 }}
                  className="flex flex-col justify-between gap-5 rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 md:flex-row md:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">{application.status}</span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">Updated {formatApplicationDate(application.updatedAt)}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-black text-zinc-950 dark:text-zinc-50">{getApplicationTitle(application)}</h2>
                    <p className="mt-1 text-sm font-bold text-zinc-500 dark:text-zinc-400">{getApplicationYear(application)}</p>
                  </div>
                  <button type="button" onClick={() => editApplication(application)} className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-black text-zinc-700 transition hover:-translate-y-0.5 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:hover:text-[#C9A84C]">
                    <Edit3 className="h-4 w-4" />
                    Edit Form
                  </button>
                </motion.div>
              )) : (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                  <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">No submitted forms yet</h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">Start a new admissions form. After submission, it will appear here for review and editing.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[28.25rem_1fr]">
            <aside className="hidden h-fit rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 xl:sticky xl:top-28 xl:block">
              <div className="mb-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold text-[#8796B3]">The British International School of Tabuk</p>
                <h1 className="mt-3 text-2xl font-black text-[#C8102E] dark:text-[#ff8fa0]">Welcome to BIST</h1>
              </div>

              <div className="space-y-1">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === index;
                  const isComplete = activeStep > index;

                  return (
                    <button key={step.label} type="button" onClick={() => setActiveStep(index)} className="group relative flex w-full gap-3 pb-7 text-left last:pb-0">
                      {index < steps.length - 1 && <div className={`absolute left-4 top-9 h-[calc(100%-2.25rem)] w-0.5 rounded-full ${isComplete ? 'bg-[#C8102E]' : 'bg-[#C8102E]/30 dark:bg-white/10'}`} />}
                      <div className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${isActive || isComplete ? 'border-[#C8102E] bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20' : 'border-[#C8102E] bg-white text-[#C8102E] dark:bg-zinc-950 dark:text-[#ff8fa0]'}`}>
                        {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className={`flex items-center gap-2 pt-1 text-sm font-bold transition ${isActive ? 'text-[#C8102E] dark:text-[#C9A84C]' : 'text-zinc-800 group-hover:text-[#C8102E] dark:text-zinc-100 dark:group-hover:text-[#C9A84C]'}`}>
                        <Icon className="h-4 w-4" />
                        {step.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <button type="button" onClick={returnToApplications} className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-[#C8102E] transition hover:gap-3 dark:text-[#ff8fa0]">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Applications
                </button>
                <Link href="/" className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-zinc-500 transition hover:text-[#C8102E] dark:text-zinc-400 dark:hover:text-[#ff8fa0]">
                  Return to Home
                </Link>
              </div>
              <div className="mb-6 rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm font-bold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                {editingApplicationId ? 'Editing submitted application' : 'New application'}: {syncState === 'saving' ? submitProgress || 'Submitting...' : syncState === 'saved' ? 'Saved locally' : syncState === 'error' ? 'Submit failed. Local draft is still saved.' : 'Local draft ready'}
              </div>
              {submitError && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 shadow-sm dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200">
                  {submitError}
                </div>
              )}

              {submitted ? (
                <ApplicationCard title="Application submitted" subtitle="Thank you for submitting your application.">
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Check className="h-8 w-8" />
                    </div>
                    <p className="max-w-xl text-zinc-500 dark:text-zinc-400">Our admissions team will review your application and contact you using the email address provided.</p>
                    <button type="button" onClick={returnToApplications} className="mt-8 inline-flex rounded-full bg-[#C8102E] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23]">
                      Back to Applications
                    </button>
                  </div>
                </ApplicationCard>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-5 xl:hidden">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = activeStep === index;
                      return (
                        <button key={`mobile-${step.label}`} type="button" onClick={() => setActiveStep(index)} className={`rounded-2xl border px-3 py-3 text-left transition ${isActive ? 'border-[#C8102E] bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20' : 'border-zinc-200 bg-white text-zinc-700 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300'}`}>
                          <div className="mb-1 flex items-center gap-2 text-xs font-black">
                            <span>{index + 1}</span>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="text-xs font-bold">{step.label}</div>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={activeStepLabel} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                      {activeStep === 0 && (
                        <ApplicationCard title="Welcome to BIST" subtitle="Welcome to BIST Admissions Portal">
                          <div className="space-y-6 text-base leading-8 text-zinc-700 dark:text-zinc-300">
                            <p>Thank you for your interest in BIST - we&apos;re delighted that you&apos;re considering joining our community!</p>
                            <p>To begin the application process, please complete all pages of the guided admissions application. This will help us get to know you better and support you through each step.</p>
                            <p>We look forward to learning more about you and welcoming you to BIST.</p>
                            <div>
                              <p>Warm regards,</p>
                              <p className="font-black text-zinc-950 dark:text-zinc-50">BIST Admissions Team</p>
                            </div>
                          </div>
                          <div className="mt-8">
                            <Field label="How You Found BIST?" required>
                              <SelectInput value={draft.howFound} onChange={(value) => updateDraft((current) => ({ ...current, howFound: value }))} options={['School Website', 'Current BIST Staff or Student', 'Online Search']} required />
                            </Field>
                          </div>
                        </ApplicationCard>
                      )}

                      {activeStep === 1 && (
                        <ApplicationCard title="Student" subtitle="Add one or more students to this application.">
                          <div className="space-y-8">
                            {draft.students.map((student, index) => (
                              <div key={index} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                  <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50">Student {index + 1}</h3>
                                  {draft.students.length > 1 && (
                                    <button type="button" onClick={() => updateDraft((current) => ({ ...current, students: current.students.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded-full p-2 text-zinc-400 transition hover:bg-red-50 hover:text-[#C8102E] dark:hover:bg-white/10">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                                <div className="grid gap-5 md:grid-cols-2">
                                  <Field label="First Name" required><TextInput value={student.firstName} onChange={(value) => updateStudent(index, { firstName: value })} required /></Field>
                                  <Field label="Last Name" required><TextInput value={student.lastName} onChange={(value) => updateStudent(index, { lastName: value })} required /></Field>
                                  <Field label="Date of Birth" required><TextInput type="date" value={student.dateOfBirth} onChange={(value) => updateStudent(index, { dateOfBirth: value })} required /></Field>
                                  <Field label="Admission Year Group" required><SelectInput value={student.admissionYearGroup} onChange={(value) => updateStudent(index, { admissionYearGroup: value })} options={yearGroups} required /></Field>
                                  <Field label="Gender" required><RadioGroup value={student.gender} onChange={(value) => updateStudent(index, { gender: value })} options={['Male', 'Female']} /></Field>
                                  <Field label="Nationality" required><SearchableInput value={student.nationality} onChange={(value) => updateStudent(index, { nationality: value })} options={countries} listId={`student-nationality-${index}`} placeholder="Search country" required /></Field>
                                  <Field label="Country of Birth" required><SearchableInput value={student.countryOfBirth} onChange={(value) => updateStudent(index, { countryOfBirth: value })} options={countries} listId={`student-birth-country-${index}`} placeholder="Search country" required /></Field>
                                  <Field label="Start Date" required><TextInput type="date" value={student.startDate} onChange={(value) => updateStudent(index, { startDate: value })} required /></Field>
                                  <div className="md:col-span-2"><Field label="Spoken Language(s)"><MultiSelect values={student.spokenLanguages} onChange={(values) => updateStudent(index, { spokenLanguages: values })} options={languages} /></Field></div>
                                  <Field label="Does your child require special educational support?"><RadioGroup value={student.requiresSupport} onChange={(value) => updateStudent(index, { requiresSupport: value })} options={['Yes', 'No']} /></Field>
                                  <Field label="Does Child Have Iqama? Optional"><RadioGroup value={student.hasIqama} onChange={(value) => updateStudent(index, { hasIqama: value })} options={['Yes', 'No']} /></Field>
                                  <Field label="Passport" required><input className={inputClass} type="file" accept="image/*" onChange={(event) => handleStudentPassport(index, event.target.files?.[0])} required={!student.passportFileName} />{student.passportFileName && <p className="mt-2 text-xs text-zinc-500">{student.passportFileName}</p>}{student.passportUrl && <a className="mt-1 block text-xs font-bold text-[#C8102E]" href={student.passportUrl} target="_blank">View uploaded passport</a>}</Field>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => updateDraft((current) => ({ ...current, students: [...current.students, emptyStudent()] }))} className="inline-flex items-center gap-2 rounded-full border border-[#C8102E]/20 bg-white px-5 py-3 text-sm font-black text-[#C8102E] transition hover:-translate-y-0.5 hover:bg-[#C8102E] hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#ff8fa0]">
                              <Plus className="h-4 w-4" />
                              Add Student
                            </button>
                          </div>
                        </ApplicationCard>
                      )}

                      {activeStep === 2 && (
                        <ApplicationCard title="Guardian" subtitle="Add one or more guardians for the student application.">
                          <div className="space-y-8">
                            {draft.guardians.map((guardian, index) => (
                              <div key={index} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                  <h3 className="text-lg font-black text-zinc-950 dark:text-zinc-50">Guardian {index + 1}</h3>
                                  {draft.guardians.length > 1 && (
                                    <button type="button" onClick={() => updateDraft((current) => ({ ...current, guardians: current.guardians.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded-full p-2 text-zinc-400 transition hover:bg-red-50 hover:text-[#C8102E] dark:hover:bg-white/10">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                                <div className="grid gap-5 md:grid-cols-2">
                                  <Field label="Contact Title" required><SelectInput value={guardian.title} onChange={(value) => updateGuardian(index, { title: value })} options={['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof']} required /></Field>
                                  <Field label="Contact First Name" required><TextInput value={guardian.firstName} onChange={(value) => updateGuardian(index, { firstName: value })} required /></Field>
                                  <Field label="Contact Last Name" required><TextInput value={guardian.lastName} onChange={(value) => updateGuardian(index, { lastName: value })} required /></Field>
                                  <Field label="Home Address in Tabuk Optional"><TextInput value={guardian.homeAddress} onChange={(value) => updateGuardian(index, { homeAddress: value })} /></Field>
                                  <Field label="Home Address in Tabuk Line 1 Optional"><TextInput value={guardian.homeAddressLine1} onChange={(value) => updateGuardian(index, { homeAddressLine1: value })} /></Field>
                                  <Field label="Home Address in Tabuk Line 2 Optional"><TextInput value={guardian.homeAddressLine2} onChange={(value) => updateGuardian(index, { homeAddressLine2: value })} /></Field>
                                  <Field label="Contact Employer in Tabuk"><TextInput value={guardian.employer} onChange={(value) => updateGuardian(index, { employer: value })} /></Field>
                                  <Field label="Job Title"><TextInput value={guardian.jobTitle} onChange={(value) => updateGuardian(index, { jobTitle: value })} /></Field>
                                  <Field label="Contact Email" required><TextInput type="email" value={guardian.email} onChange={(value) => updateGuardian(index, { email: value })} required /></Field>
                                  <Field label="Contact Phone" required>
                                    <div className="flex overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 transition focus-within:border-[#C8102E] focus-within:ring-4 focus-within:ring-[#C8102E]/10 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/20">
                                      <input
                                        className="w-24 flex-shrink-0 border-0 border-r border-zinc-200 bg-zinc-50 px-2 py-3.5 text-xs font-black text-zinc-800 outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 sm:w-28"
                                        value={guardian.phoneCode}
                                        onChange={(event) => updateGuardian(index, { phoneCode: event.target.value })}
                                        list={`guardian-phone-code-${index}`}
                                        placeholder="+966"
                                        required
                                      />
                                      <datalist id={`guardian-phone-code-${index}`}>
                                        {phoneCodes.map((option) => (
                                          <option key={option} value={option} />
                                        ))}
                                      </datalist>
                                      <input
                                        className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                                        type="tel"
                                        value={guardian.phone}
                                        onChange={(event) => updateGuardian(index, { phone: event.target.value })}
                                        placeholder="Phone number"
                                        required
                                      />
                                    </div>
                                  </Field>
                                  <Field label="Relationship Status"><RadioGroup value={guardian.relationshipStatus} onChange={(value) => updateGuardian(index, { relationshipStatus: value })} options={['Married', 'Remarried', 'Separated or Divorced']} /></Field>
                                  <Field label="Nationality" required><SearchableInput value={guardian.nationality} onChange={(value) => updateGuardian(index, { nationality: value })} options={countries} listId={`guardian-nationality-${index}`} placeholder="Search country" required /></Field>
                                  <Field label="Is the Iqama Issued? Optional"><RadioGroup value={guardian.iqamaIssued} onChange={(value) => updateGuardian(index, { iqamaIssued: value })} options={['Yes', 'No']} /></Field>
                                  <Field label="Relationship to Student" required><SelectInput value={guardian.relationshipToStudent} onChange={(value) => updateGuardian(index, { relationshipToStudent: value })} options={['Father', 'Mother', 'Other']} required /></Field>
                                  <Field label="Passport image" required><input className={inputClass} type="file" accept="image/*" onChange={(event) => handleGuardianPassport(index, event.target.files?.[0])} required={!guardian.passportFileName} />{guardian.passportFileName && <p className="mt-2 text-xs text-zinc-500">{guardian.passportFileName}</p>}{guardian.passportUrl && <a className="mt-1 block text-xs font-bold text-[#C8102E]" href={guardian.passportUrl} target="_blank">View uploaded passport</a>}</Field>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => updateDraft((current) => ({ ...current, guardians: [...current.guardians, emptyGuardian()] }))} className="inline-flex items-center gap-2 rounded-full border border-[#C8102E]/20 bg-white px-5 py-3 text-sm font-black text-[#C8102E] transition hover:-translate-y-0.5 hover:bg-[#C8102E] hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#ff8fa0]">
                              <Plus className="h-4 w-4" />
                              Add Guardian
                            </button>
                          </div>
                        </ApplicationCard>
                      )}

                      {activeStep === 3 && (
                        <ApplicationCard title="Final Declaration" subtitle="Please confirm each declaration before submitting.">
                          <div className="space-y-4">
                            {declarationOptions.map((declaration, index) => {
                              const checked = draft.declarations.includes(declaration);
                              return (
                                <label
                                  key={declaration}
                                  className={`flex cursor-pointer gap-4 rounded-2xl border p-5 text-sm leading-7 transition ${
                                    checked
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-950 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-100'
                                      : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-[#C8102E]/25 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300'
                                  }`}
                                >
                                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${checked ? 'bg-emerald-600 text-white' : 'bg-white text-zinc-300 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-white/10'}`}>
                                    <Check className="h-4 w-4" />
                                  </span>
                                  <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={checked}
                                    onChange={() => updateDraft((current) => ({ ...current, declarations: checked ? current.declarations.filter((item) => item !== declaration) : [...current.declarations, declaration] }))}
                                    required
                                  />
                                  <span>
                                    <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-400">Declaration {index + 1}</span>
                                    {declaration}
                                  </span>
                                </label>
                              );
                            })}
                            {!allDeclarationsAccepted && (
                              <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
                                All declarations must be accepted before the application can be submitted.
                              </p>
                            )}
                          </div>
                        </ApplicationCard>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 border-t border-zinc-200/80 bg-[#f6fbff]/90 px-2 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/90">
                    <button type="button" onClick={goToPreviousStep} disabled={activeStep === 0} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                      Back
                    </button>
                    {activeStep < steps.length - 1 ? (
                      <button type="button" onClick={goToNextStep} className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23]">
                        Next Step
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="submit" disabled={isSubmitting || !allDeclarationsAccepted} className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-50">
                        {isSubmitting ? 'Submitting...' : editingApplicationId ? 'Update Application' : 'Submit Application'}
                        <FileCheck2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </motion.main>
  );
}
