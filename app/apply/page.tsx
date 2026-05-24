'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  School,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';
import { APPLY_DRAFT_KEY, AUTH_TOKEN_KEY } from '@/lib/storageKeys';

const steps = [
  { label: 'Application', icon: School },
  { label: 'Student', icon: UserRound },
  { label: 'Guardian', icon: UsersRound },
  { label: 'Review & Submit', icon: ShieldCheck },
];

const academicYears = [
  '2025/26 (August 2025 - June 2026)',
  '2026/27 (August 2026 - June 2027)',
];

const campuses = ['BIST Main Campus'];
const classYears = [
  'Early Years',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
  'Year 7',
  'Year 8',
  'Year 9',
  'Year 10',
  'Year 11',
  'IB1',
  'IB2',
];

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

function Field({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
        {label} {required && <span className="text-[#C8102E]">*</span>}
      </span>
      {children}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) {
  return (
    <Field label={label} required={required}>
      <select className={inputClass} name={name} value={value} onChange={onChange} required={required}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <Field label={label} required={required}>
      <input
        className={inputClass}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </Field>
  );
}

function ApplicationCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/30 sm:p-8"
    >
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">{title}</h2>
        {subtitle && <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  );
}

export default function ApplyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) {
        return;
      }

      const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        const redirect = encodeURIComponent(pathname);
        router.replace(`/login?redirect=${redirect}&from=${redirect}`);
        return;
      }

      const savedDraft = window.localStorage.getItem(APPLY_DRAFT_KEY);
      if (savedDraft) {
        try {
          setFormData(JSON.parse(savedDraft));
        } catch {
          window.localStorage.removeItem(APPLY_DRAFT_KEY);
        }
      }

      setIsCheckingAuth(false);
    });

    return () => {
      isActive = false;
    };
  }, [pathname, router]);

  useEffect(() => {
    if (!isCheckingAuth && !submitted) {
      window.localStorage.setItem(APPLY_DRAFT_KEY, JSON.stringify(formData));
    }
  }, [formData, isCheckingAuth, submitted]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.removeItem(APPLY_DRAFT_KEY);
    setFormData({});
    setSubmitted(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const valueFor = (name: string) => formData[name] ?? '';

  const goToPreviousStep = () => setActiveStep((step) => Math.max(0, step - 1));
  const goToNextStep = () => setActiveStep((step) => Math.min(steps.length - 1, step + 1));

  const activeStepLabel = steps[activeStep].label;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <div>
        <PortalHeader />

        <section className="min-h-screen bg-[#f6fbff] px-4 pb-10 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
          {isCheckingAuth ? (
            <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/30"
              >
                <div className="mb-6 h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-white/10" />
                <div className="h-5 w-44 rounded-full bg-zinc-100 dark:bg-white/10" />
                <div className="mt-4 h-3 w-full rounded-full bg-zinc-100 dark:bg-white/10" />
                <div className="mt-2 h-3 w-3/4 rounded-full bg-zinc-100 dark:bg-white/10" />
              </motion.div>
            </div>
          ) : (
          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[28.25rem_1fr]">
            <aside className="hidden h-fit rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/30 xl:sticky xl:top-28 xl:block">
              <div className="mb-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold text-[#8796B3]">The British International School of Tabuk</p>
                <h1 className="mt-3 text-2xl font-black text-[#C8102E] dark:text-[#ff8fa0]">Application</h1>
              </div>

              <div className="space-y-1">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === index;
                  const isComplete = activeStep > index;

                  return (
                    <button
                      key={step.label}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className="group relative flex w-full gap-3 pb-7 text-left last:pb-0"
                    >
                      {index < steps.length - 1 && (
                        <div className={`absolute left-4 top-9 h-[calc(100%-2.25rem)] w-0.5 rounded-full ${isComplete ? 'bg-[#C8102E]' : 'bg-[#C8102E]/30 dark:bg-white/10'}`} />
                      )}
                      <div
                        className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                          isActive || isComplete
                            ? 'border-[#C8102E] bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20'
                            : 'border-[#C8102E] bg-white text-[#C8102E] dark:bg-zinc-950 dark:text-[#ff8fa0]'
                        }`}
                      >
                        {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="pt-1">
                        <div
                          className={`flex items-center gap-2 text-sm font-bold transition ${
                            isActive
                              ? 'text-[#C8102E] dark:text-[#C9A84C]'
                              : 'text-zinc-800 group-hover:text-[#C8102E] dark:text-zinc-100 dark:group-hover:text-[#C9A84C]'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {step.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div>
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 rounded-full text-sm font-bold text-[#C8102E] transition hover:gap-3 dark:text-[#ff8fa0]"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Link>

              {submitted ? (
                <ApplicationCard title="Success" subtitle="Thank you for submitting your application.">
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <Check className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">Application submitted</h2>
                    <p className="mt-3 max-w-xl text-zinc-500 dark:text-zinc-400">
                      Our admissions team will review your application and contact you using the email address provided.
                    </p>
                  </div>
                </ApplicationCard>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:hidden">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = activeStep === index;

                      return (
                        <button
                          key={`mobile-${step.label}`}
                          type="button"
                          onClick={() => setActiveStep(index)}
                          className={`rounded-2xl border px-3 py-3 text-left transition ${
                            isActive
                              ? 'border-[#C8102E] bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20'
                              : 'border-zinc-200 bg-white text-zinc-700 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-[#C9A84C]'
                          }`}
                        >
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
                    <motion.div
                      key={activeStepLabel}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {activeStep === 0 && (
                        <ApplicationCard
                          title="Start Your Application"
                          subtitle="Apply to attend the school. Please select an academic year and provide a contact email to begin."
                        >
                          <div className="grid gap-5 md:grid-cols-2">
                            <SelectField
                              label="Academic Year"
                              name="academicYear"
                              options={academicYears}
                              value={valueFor('academicYear')}
                              onChange={handleInputChange}
                              required
                            />
                            <TextField
                              label="Contact Email"
                              name="contactEmail"
                              value={valueFor('contactEmail')}
                              onChange={handleInputChange}
                              type="email"
                              placeholder="name@example.com"
                              required
                            />
                          </div>
                        </ApplicationCard>
                      )}

                      {activeStep === 1 && (
                        <ApplicationCard title="Student" subtitle="Complete the student information for the child applying to BIST.">
                          <div className="grid gap-5 md:grid-cols-2">
                            <SelectField label="Campus Applying For" name="campusApplyingFor" options={campuses} value={valueFor('campusApplyingFor')} onChange={handleInputChange} required />
                            <SelectField label="Class Year Applying For" name="classYearApplyingFor" options={classYears} value={valueFor('classYearApplyingFor')} onChange={handleInputChange} required />
                            <TextField label="Student Given Name" name="studentGivenName" value={valueFor('studentGivenName')} onChange={handleInputChange} required />
                            <TextField label="Student Family Name" name="studentFamilyName" value={valueFor('studentFamilyName')} onChange={handleInputChange} required />
                            <TextField label="Student Suffix" name="studentSuffix" value={valueFor('studentSuffix')} onChange={handleInputChange} />
                            <SelectField label="Student Name Order" name="studentNameOrder" options={['Given Family', 'Family Given']} value={valueFor('studentNameOrder')} onChange={handleInputChange} />
                            <TextField label="Student Date Of Birth" name="studentDateOfBirth" value={valueFor('studentDateOfBirth')} onChange={handleInputChange} type="date" required />
                            <SelectField label="Student Gender" name="studentGender" options={['Female', 'Male']} value={valueFor('studentGender')} onChange={handleInputChange} required />
                            <TextField label="Student Nationalities" name="studentNationalities" value={valueFor('studentNationalities')} onChange={handleInputChange} placeholder="e.g. Saudi Arabian, British" />
                            <TextField label="Student Languages" name="studentLanguages" value={valueFor('studentLanguages')} onChange={handleInputChange} placeholder="e.g. English, Arabic" />
                            <SelectField label="Student English Language Fluency" name="studentEnglishLanguageFluency" options={['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native']} value={valueFor('studentEnglishLanguageFluency')} onChange={handleInputChange} />
                            <Field label="Student Image">
                              <input className={inputClass} name="studentImage" type="file" accept="image/*" />
                            </Field>
                          </div>
                        </ApplicationCard>
                      )}

                      {activeStep === 2 && (
                        <ApplicationCard title="Guardian" subtitle="Add the parent or guardian details for this application.">
                          <div className="grid gap-5 md:grid-cols-2">
                            <SelectField label="Guardian Title" name="guardianTitle" options={['Mr', 'Mrs', 'Ms', 'Miss', 'Dr']} value={valueFor('guardianTitle')} onChange={handleInputChange} />
                            <TextField label="Guardian Given Name" name="guardianGivenName" value={valueFor('guardianGivenName')} onChange={handleInputChange} required />
                            <TextField label="Guardian Family Name" name="guardianFamilyName" value={valueFor('guardianFamilyName')} onChange={handleInputChange} required />
                            <TextField label="Guardian Suffix" name="guardianSuffix" value={valueFor('guardianSuffix')} onChange={handleInputChange} />
                            <TextField label="Guardian Email Address" name="guardianEmailAddress" value={valueFor('guardianEmailAddress')} onChange={handleInputChange} type="email" required />
                            <TextField label="Guardian Phone Number" name="guardianPhoneNumber" value={valueFor('guardianPhoneNumber')} onChange={handleInputChange} type="tel" required />
                            <SelectField label="Guardian Relationship Type" name="guardianRelationshipType" options={['Father', 'Mother', 'Guardian']} value={valueFor('guardianRelationshipType')} onChange={handleInputChange} required />
                            <SelectField label="Guardian Relationship Status" name="guardianRelationshipStatus" options={['Married', 'Separated', 'Divorced', 'Widowed', 'Single']} value={valueFor('guardianRelationshipStatus')} onChange={handleInputChange} />
                            <TextField label="Guardian Nationalities" name="guardianNationalities" value={valueFor('guardianNationalities')} onChange={handleInputChange} placeholder="e.g. Saudi Arabian, British" />
                            <TextField label="Guardian Languages" name="guardianLanguages" value={valueFor('guardianLanguages')} onChange={handleInputChange} placeholder="e.g. English, Arabic" />
                            <TextField label="Guardian Address Line" name="guardianAddressLine" value={valueFor('guardianAddressLine')} onChange={handleInputChange} />
                            <TextField label="Guardian Address City" name="guardianAddressCity" value={valueFor('guardianAddressCity')} onChange={handleInputChange} />
                            <TextField label="Guardian Address State Or Province" name="guardianAddressStateOrProvince" value={valueFor('guardianAddressStateOrProvince')} onChange={handleInputChange} />
                            <TextField label="Guardian Address Postal Code" name="guardianAddressPostalCode" value={valueFor('guardianAddressPostalCode')} onChange={handleInputChange} />
                            <TextField label="Guardian Address Country" name="guardianAddressCountry" value={valueFor('guardianAddressCountry')} onChange={handleInputChange} />
                          </div>
                        </ApplicationCard>
                      )}

                      {activeStep === 3 && (
                        <ApplicationCard title="Review & Submit" subtitle="Please review the application information before submitting.">
                          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-7 text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
                            <p>
                              Student: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{valueFor('studentGivenName') || 'No Student'} {valueFor('studentFamilyName') || 'listed yet'}</span>
                            </p>
                            <p>
                              Guardian: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{valueFor('guardianGivenName') || 'No Guardian'} {valueFor('guardianFamilyName') || 'listed yet'}</span>
                            </p>
                            <p>Academic Year: {valueFor('academicYear') || 'Not selected'}</p>
                            <p>Contact Email: {valueFor('contactEmail') || 'Not provided'}</p>
                            <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">
                              Submit Application when all required information has been entered.
                            </p>
                          </div>
                        </ApplicationCard>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 border-t border-zinc-200/80 bg-[#f6fbff]/90 px-2 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/90">
                    <button
                      type="button"
                      onClick={activeStep === 0 ? undefined : goToPreviousStep}
                      disabled={activeStep === 0}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-white/10"
                    >
                      Back
                    </button>
                    {activeStep < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] dark:shadow-[#C8102E]/35"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] dark:shadow-[#C8102E]/35"
                      >
                        Submit Application
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
          )}
        </section>
      </div>
    </motion.main>
  );
}
