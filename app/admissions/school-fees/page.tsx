'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Motion';

const oneTimeFees = [
  ['Application Fee', 'TBC'],
  ['Assessment Fee', 'TBC'],
  ['Entrance Fee', 'TBC'],
];

const primaryFees = [
  ['Reception', 'TBC', 'TBC', 'TBC'],
  ['Years 1-6', 'TBC', 'TBC', 'TBC'],
];

const secondaryFees = [
  ['Years 7-9', 'TBC', 'TBC', 'TBC'],
  ['Years 10-11', 'TBC', 'TBC', 'TBC'],
  ['AS Level / Year 12', 'TBC', 'TBC', 'TBC'],
  ['A2 Level / Year 13', 'TBC', 'TBC', 'TBC'],
];

function FeeTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <Reveal className="mt-12 text-left">
      <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">{title}</h2>
      <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-200 bg-white/75 shadow-[0_18px_55px_rgba(26,31,75,0.08)] dark:border-white/10 dark:bg-white/[0.04]">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#1A1F4B] text-white dark:bg-white/10">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
            {rows.map((row) => (
              <tr key={row.join('-')}>
                {row.map((cell) => (
                  <td key={cell} className="px-5 py-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export default function SchoolFeesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="relative min-h-[52vh] overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/admissions/school-fees-title.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/88 via-[#1A1F4B]/72 to-[#C8102E]/40 dark:from-zinc-950/92 dark:via-zinc-900/82 dark:to-[#C8102E]/38" />
          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <Reveal>
              <p className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl">
                Admissions
              </p>
              <h1 className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl">
                School Fees
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal className="text-left">
              <div className="space-y-7 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                <p>
                  BIST provides a clear fee structure for families joining and continuing at the school. Fees support the
                  delivery of high-quality teaching, pastoral care, facilities and co-curricular opportunities.
                </p>
                <p>
                  Priority for admissions may be given to British passport holders where applicable, alongside the
                  school&apos;s admissions criteria and availability.
                </p>
              </div>
            </Reveal>

            <FeeTable title="One-time fees" headers={['Fee', 'Amount']} rows={oneTimeFees} />
            <FeeTable title="Primary Section fees" headers={['Year Group', 'Term 1', 'Term 2', 'Term 3']} rows={primaryFees} />
            <FeeTable title="Secondary Section fees" headers={['Year Group', 'Term 1', 'Term 2', 'Term 3']} rows={secondaryFees} />

            <Reveal className="mt-12 rounded-3xl border border-[#C8102E]/15 bg-[#C8102E]/6 p-6 text-left dark:border-[#C9A84C]/20 dark:bg-[#C9A84C]/8">
              <div className="space-y-4 text-lg leading-8 text-[#1A1F4B] dark:text-zinc-100">
                <p>Fees may be subject to VAT where applicable.</p>
                <p>External examination fees are charged separately where applicable.</p>
              </div>
            </Reveal>

            <Reveal className="mt-16 border-t border-zinc-200 pt-12 text-center dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Register Online</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Click below to register your interest-we&apos;d love to hear from you!
              </p>
              <Link
                href="/apply"
                className="group relative isolate mt-8 inline-flex overflow-hidden rounded-full bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_38px_rgba(200,16,46,0.26)] transition hover:-translate-y-0.5"
              >
                <span className="absolute inset-y-0 -left-1/2 -z-10 w-1/3 rotate-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
                Join Our School
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
