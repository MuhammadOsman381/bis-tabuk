'use client';

import { CalendarDays } from 'lucide-react';
import { motion, Reveal, staggerContainer } from '../ui/Motion';

const schoolEvents = [
  { event: 'Staff Return', date: '16 August 2026 (Sunday)' },
  { event: 'Student Return', date: '23 August 2026 (Sunday)' },
  { event: 'Term 1 Internal Assessment (Years 3-10)', date: '9-15 December 2026' },
  { event: 'Return from Winter Break (Term 2 Begins)', date: '10 January 2027 (Sunday)' },
  { event: 'Parent-Teacher Conference', date: '11 February 2027 (Thursday)' },
  { event: 'Term 2 Internal Assessment (Years 3-10)', date: '24 February - 2 March 2027' },
  { event: 'Return from Spring Break (Term 3 Begins)', date: '28 March 2027 (Sunday)' },
  { event: 'Parent-Teacher Conference', date: '11 April 2027 (Sunday)' },
  { event: 'Term 3 Internal Assessment (Years 3-10)', date: '23-29 June 2027' },
  { event: 'Summer Break Begins', date: '4 July 2027 (Sunday)' },
];

const holidays = [
  { event: 'Saudi National Day', date: '23 September 2026 (Wednesday)' },
  { event: 'Half-Term Break', date: '25-29 October 2026 (Sunday-Thursday)' },
  { event: 'Winter Break', date: '20 December 2026 - 7 January 2027 (Sunday-Thursday)' },
  { event: 'Foundation Day', date: '22 February 2027 (Monday)' },
  { event: 'Eid Al Fitr Holidays', date: '7-18 March 2027 (Sunday-Thursday)' },
  { event: 'Spring Break', date: '21-25 March 2027 (Sunday-Thursday)' },
  { event: 'Eid Al Adha Holidays', date: '9-20 May 2027 (Sunday-Thursday)' },
];

function DateList({ title, items }: { title: string; items: Array<{ event: string; date: string }> }) {
  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white/82 p-5 shadow-[0_18px_55px_rgba(26,31,75,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-zinc-200 pb-4 dark:border-white/10">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#C9A84C]/12 dark:text-[#C9A84C]">
          <CalendarDays className="h-5 w-5" />
        </span>
        <h3 className="text-xl font-black text-[#1A1F4B] dark:text-zinc-50">{title}</h3>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-white/10">
        {items.map((item) => (
          <div key={`${title}-${item.event}`} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.75fr)] sm:gap-5">
            <p className="text-sm font-black leading-6 text-zinc-800 dark:text-zinc-100">{item.event}</p>
            <p className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-300 sm:text-right">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KeyDates() {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-[#1A1F4B] dark:bg-zinc-950 dark:text-white sm:py-24">
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#C8102E]/7 blur-3xl dark:bg-[#C9A84C]/10" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-[#C8102E]/10 bg-[#fffaf2] px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-[#C8102E] shadow-sm shadow-[#1A1F4B]/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:text-[#C9A84C]">Academic Calendar</span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">Key Dates to <span className="text-[#C8102E] dark:text-[#C9A84C]">Remember</span></h2>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}>
            <DateList title="School Events" items={schoolEvents} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}>
            <DateList title="Holidays" items={holidays} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
