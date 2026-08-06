'use client';

import { useState } from 'react';
import type React from 'react';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileText, Loader2, Mail, Phone, UserRound } from 'lucide-react';
import SchoolPageShell from '@/components/layout/SchoolPageShell';

const inputClass =
  'mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#C8102E] focus:ring-4 focus:ring-[#C8102E]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-50 dark:focus:border-[#C9A84C] dark:focus:ring-[#C9A84C]/10';

export default function OverseasHireApplyPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/employment/overseas-hire/apply', {
        method: 'POST',
        body: formData,
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error ?? 'Unable to submit application.');

      event.currentTarget.reset();
      setIsSuccess(true);
      setMessage('Thank you. Your overseas hire application and CV have been sent to the recruitment team.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SchoolPageShell
      eyebrow="Employment"
      title="Apply"
      subtitle="Share your details with the BIST recruitment team for overseas hire opportunities."
      heroImage="/images/employment/overseas-apply-title.jpg"
      heroAlt="Employment law title image with gavel"
      showVideo={false}
    >
      <div className="mt-14 rounded-3xl border border-zinc-200/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
        <div className="flex flex-col gap-3 border-b border-zinc-200 pb-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E] dark:text-[#C9A84C]">Overseas Hire Application</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#1A1F4B] dark:text-zinc-50">Candidate Details</h2>
          </div>
          <p className="max-w-sm text-sm font-semibold leading-6 text-zinc-500 dark:text-zinc-400">Complete the form and attach your CV as PDF, DOC, or DOCX.</p>
        </div>

        <form onSubmit={submitApplication} className="mt-8 grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                Full Name
              </span>
              <input name="fullName" required placeholder="Candidate name" className={inputClass} />
            </label>

            <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                Email
              </span>
              <input name="email" type="email" required placeholder="name@example.com" className={inputClass} />
            </label>

            <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                Phone
              </span>
              <input name="phone" required placeholder="+966..." className={inputClass} />
            </label>

            <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                Position Applied For
              </span>
              <input name="position" required placeholder="Teacher, admin, support..." className={inputClass} />
            </label>
          </div>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            Availability
            <select name="availability" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select availability
              </option>
              <option value="Immediate">Immediate</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="Next academic term">Next academic term</option>
              <option value="Flexible">Flexible</option>
            </select>
          </label>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            Short Message
            <textarea name="message" rows={4} placeholder="Briefly introduce your experience and interest in BIST." className={inputClass} />
          </label>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
              Upload CV
            </span>
            <input name="cv" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className={inputClass} />
          </label>

          {message && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm font-bold ${
                isSuccess
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200'
                  : 'border-red-200 bg-red-50 text-red-800 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] px-6 py-3.5 text-sm font-black text-white shadow-[0_18px_38px_rgba(200,16,46,0.26)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isSuccess ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            Submit Application
          </button>
        </form>
      </div>
    </SchoolPageShell>
  );
}
