'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Motion';

const igcseYears = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
const aLevelYears = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
const igcseRows = ['A*-A grades', 'A*-C grades'];
const aLevelRows = ['Pass rate', 'A*-A grades', 'A*-C grades', 'BIST average grade', 'World average'];

function ResultsTable({ years, rows, title }: { years: string[]; rows: string[]; title: string }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950/60">
      <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-white/5">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">{title}</h3>
      </div>
      <table className="min-w-[760px] w-full text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.18em] text-zinc-500 dark:bg-zinc-950 dark:text-zinc-500">
          <tr>
            <th className="px-5 py-4 font-bold">Result</th>
            {years.map((year) => (
              <th key={year} className="px-5 py-4 font-bold">{year}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
          {rows.map((row) => (
            <tr key={row}>
              <td className="px-5 py-5 font-bold text-[#1A1F4B] dark:text-zinc-100">{row}</td>
              {years.map((year) => (
                <td key={`${row}-${year}`} className="px-5 py-5 text-zinc-600 dark:text-zinc-400">TBC</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AcademicResultsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal className="text-center">
              <p className="luxury-kicker text-xs font-bold uppercase tracking-[0.24em]">Performance</p>
              <h1 className="mt-6 text-4xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">
                Academic Results
              </h1>
            </Reveal>

            <Reveal className="mx-auto mt-14 max-w-3xl text-left">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Outstanding Academic Achievements</h2>
              <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Outcomes for students at BIST compare with the very best schools across the world, preparing them
                extremely well for life on the world stage.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <ResultsTable title="Cambridge IGCSE results" years={igcseYears} rows={igcseRows} />
            </Reveal>

            <Reveal className="mt-12">
              <ResultsTable title="A Level results" years={aLevelYears} rows={aLevelRows} />
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
