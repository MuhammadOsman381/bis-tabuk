'use client';

import { useState } from 'react';
import type React from 'react';
import { ArrowRight, CheckCircle2, Globe2, GraduationCap, ImagePlus, Loader2, Mail, MapPin, PenLine, Sparkles, UserRound } from 'lucide-react';
import SchoolPageShell from '@/components/layout/SchoolPageShell';

const inputClass =
  'mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#C8102E] focus:ring-4 focus:ring-[#C8102E]/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-50 dark:focus:border-[#C9A84C] dark:focus:ring-[#C9A84C]/10';

const highlights = [
  { title: 'Stay Connected', text: 'Reconnect with classmates, teachers and the BIST community.' },
  { title: 'Inspire Students', text: 'Share university, career and life lessons with current learners.' },
  { title: 'Celebrate Success', text: 'Help us showcase the journeys our alumni are building worldwide.' },
];

export default function BistConnectPage() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitStory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage('');
    setIsSuccess(false);
    setIsSubmitting(true);

    const formData = new FormData(form);

    try {
      const response = await fetch('/api/alumni/success-story', {
        method: 'POST',
        body: formData,
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error ?? 'Unable to submit story.');

      form.reset();
      setIsSuccess(true);
      setMessage('Thank you. Your success story has been sent to the BIST team.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to submit story.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SchoolPageShell
      eyebrow="Alumni"
      title="BIST Network"
      subtitle="A home for former students to reconnect, inspire and share the journeys that began at BIST."
      heroImage="/images/alumni/bist-network-title.jpg"
      heroAlt="Global alumni network connections over Earth"
      intro={[
        'BIST Network brings former students together with the school community. Whether you are studying, building a career, leading a business or serving your community, your story can encourage the next generation of BIST learners.',
        'Share your success story with us and help celebrate the global reach, ambition and character of our alumni community.',
      ]}
      quote='"BIST gave me friendships, confidence and a global perspective that stayed with me long after graduation." - BIST alumnus'
      showVideo={false}
      sections={[
        {
          title: 'Why join the BIST Network?',
          bullets: ['Reconnect with classmates and staff', 'Share career and university experiences', 'Mentor and inspire current students', 'Celebrate alumni milestones and school news'],
          image: 'https://picsum.photos/id/1031/900/1000',
          imageAlt: 'Alumni networking event',
        },
      ]}
    >
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-zinc-200/80 bg-white/78 p-6 shadow-[0_18px_55px_rgba(26,31,75,0.08)] dark:border-white/10 dark:bg-white/[0.04]">
            <Sparkles className="h-5 w-5 text-[#C8102E] dark:text-[#C9A84C]" />
            <h3 className="mt-4 text-xl font-black text-[#1A1F4B] dark:text-zinc-50">{item.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-300">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-zinc-200/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
        <div className="flex flex-col gap-3 border-b border-zinc-200 pb-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E] dark:text-[#C9A84C]">Share Your Journey</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#1A1F4B] dark:text-zinc-50">Alumni Success Story</h2>
          </div>
          <p className="max-w-sm text-sm font-semibold leading-6 text-zinc-500 dark:text-zinc-400">Tell us where life has taken you since BIST. Required fields are kept short and simple.</p>
        </div>

        <form onSubmit={submitStory} className="mt-8 grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                Full Name
              </span>
              <input name="fullName" required placeholder="Your name" className={inputClass} />
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
                <GraduationCap className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                Graduation / Leaving Year
              </span>
              <input name="graduationYear" required inputMode="numeric" placeholder="2020" className={inputClass} />
            </label>

            <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                Current Location
              </span>
              <input name="currentLocation" placeholder="City, country" className={inputClass} />
            </label>
          </div>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            <span className="inline-flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
              Current Role / Study
            </span>
            <input name="currentRole" placeholder="University, company, profession or project" className={inputClass} />
          </label>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            <span className="inline-flex items-center gap-2">
              <PenLine className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
              Story Title
            </span>
            <input name="storyTitle" required placeholder="A short headline for your story" className={inputClass} />
          </label>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            Your Success Story
            <textarea name="story" required rows={6} minLength={80} placeholder="Share your journey after BIST, a proud achievement, or advice for current students." className={inputClass} />
          </label>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            Sharing Permission
            <select name="permission" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select permission
              </option>
              <option value="BIST may contact me before publishing my story">BIST may contact me before publishing my story</option>
              <option value="For internal alumni records only">For internal alumni records only</option>
            </select>
          </label>

          <label className="text-sm font-black text-zinc-700 dark:text-zinc-200">
            <span className="inline-flex items-center gap-2">
              <ImagePlus className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
              Alumni Photos
            </span>
            <input name="photos" type="file" multiple accept="image/jpeg,image/png,image/webp" className={inputClass} />
            <span className="mt-2 block text-xs font-semibold leading-5 text-zinc-500 dark:text-zinc-400">Optional: upload up to three JPG, PNG, or WebP photos.</span>
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
            Submit Story
          </button>
        </form>
      </div>
    </SchoolPageShell>
  );
}
