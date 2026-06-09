'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Download, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

const handbookHref = '/policies/handbook.pdf';

export default function HandbookPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="relative overflow-hidden bg-[#fffaf4] px-6 py-16 dark:bg-zinc-950 sm:py-24">
          <div className="absolute left-[-12rem] top-10 h-80 w-80 rounded-full bg-[#C8102E]/10 blur-3xl dark:bg-[#C8102E]/12" />
          <div className="absolute right-[-10rem] top-24 h-96 w-96 rounded-full bg-[#C9A84C]/18 blur-3xl dark:bg-[#C9A84C]/10" />
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-[#C8102E]/10 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#C8102E] shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-[#C9A84C]">
                BIST Handbook
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">
                School Handbook
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                Access the British International School of Tabuk handbook in a clean document viewer, with options to open or download the original PDF.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={handbookHref} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] dark:bg-[#C9A84C] dark:text-zinc-950">
                  <ExternalLink className="h-4 w-4" />
                  Open PDF
                </Link>
                <Link href={handbookHref} download className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-black text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-100 dark:hover:text-[#C9A84C]">
                  <Download className="h-4 w-4" />
                  Download
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-[2rem] border border-zinc-200/80 bg-white/86 p-5 shadow-2xl shadow-[#1A1F4B]/10 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-black/30"
            >
              <div className="flex h-36 items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,#1A1F4B,#C8102E)] text-white shadow-inner shadow-black/20 dark:bg-[linear-gradient(135deg,#18181b,#C9A84C)]">
                <BookOpen className="h-14 w-14" />
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { icon: FileText, label: 'Official PDF handbook' },
                  { icon: ShieldCheck, label: 'School guidance and reference' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-black text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200">
                      <Icon className="h-4 w-4 text-[#C8102E] dark:text-[#C9A84C]" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 dark:bg-zinc-950 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E] dark:text-[#C9A84C]">Document Viewer</p>
                <h2 className="mt-2 text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Read Online</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                If your browser does not display the document below, use the Open PDF button above.
              </p>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-zinc-100 p-2 shadow-[0_28px_80px_rgba(26,31,75,0.14)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/35 sm:p-3">
              <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-3 dark:border-white/10">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 truncate text-xs font-black uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Hand Book.pdf</span>
              </div>
              <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white dark:border-white/10">
                <iframe
                  src={`${handbookHref}#view=FitH`}
                  title="BIST Handbook PDF"
                  className="h-[82vh] min-h-[620px] w-full bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
