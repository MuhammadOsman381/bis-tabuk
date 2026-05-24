'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import SchoolPageShell from '@/components/layout/SchoolPageShell';

const contactItems = [
  { icon: MapPin, label: 'Address', value: 'The British International School Tabuk, Tabuk, Saudi Arabia' },
  { icon: Phone, label: 'General Phone', value: '+966 12 000 0000' },
  { icon: Mail, label: 'General Email', value: 'info@conti.sch.sa' },
  { icon: Mail, label: 'Admissions Email', value: 'Registrar@conti.sch.sa' },
];

export default function ContactUsPage() {
  return (
    <SchoolPageShell
      eyebrow="Contact"
      title="Contact Us"
      heroImage="https://picsum.photos/id/1041/1920/980"
      heroAlt="Welcoming school campus entrance"
    >
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4 text-left">
          <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Contact Information</h2>
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex gap-4 rounded-3xl border border-zinc-200 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#C9A84C]/15 dark:text-[#C9A84C]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold leading-7 text-[#1A1F4B] dark:text-zinc-100">{item.value}</p>
                </div>
              </div>
            );
          })}
          <div className="flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white/60 text-center text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 dark:border-white/15 dark:bg-white/[0.04] dark:text-zinc-400">
            Google Maps Placeholder
          </div>
        </div>

        <form className="rounded-[2rem] border border-zinc-200 bg-white/80 p-6 text-left shadow-[0_22px_70px_rgba(26,31,75,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
          <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Send a Message</h2>
          <div className="mt-6 grid gap-4">
            {['Full Name', 'Email', 'Phone'].map((label) => (
              <label key={label} className="block">
                <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">{label}</span>
                <input className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-[#C8102E] focus:ring-4 focus:ring-[#C8102E]/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-50" />
              </label>
            ))}
            <label className="block">
              <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">Subject</span>
              <select className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-[#C8102E] focus:ring-4 focus:ring-[#C8102E]/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-50">
                <option>General enquiry</option>
                <option>Admissions</option>
                <option>Partnership</option>
                <option>Sponsorship</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">Message</span>
              <textarea rows={5} className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-[#C8102E] focus:ring-4 focus:ring-[#C8102E]/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-50" />
            </label>
            <button type="button" className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] px-6 py-3 text-sm font-black text-white shadow-[0_18px_38px_rgba(200,16,46,0.24)] transition hover:-translate-y-0.5">
              Submit
              <Send className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-14 rounded-3xl border border-zinc-200 bg-white/75 p-8 text-center dark:border-white/10 dark:bg-white/[0.04]">
        <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Visit Our School</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">We would be delighted to welcome you for a tour of our campus and learning spaces.</p>
        <Link href="/admissions/book-a-tour" className="mt-7 inline-flex rounded-full bg-[#C8102E] px-7 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5">
          Book a Tour
        </Link>
      </div>
    </SchoolPageShell>
  );
}
