'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

export type PolicySection = {
  title: string;
  paragraphs: string[];
};

type PolicyPageShellProps = {
  title: string;
  subtitle: string;
  effectiveLabel: string;
  pdfHref: string;
  sections: PolicySection[];
};

export default function PolicyPageShell({ title, subtitle, effectiveLabel, pdfHref, sections }: PolicyPageShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="bg-[#fffaf4] px-6 py-20 dark:bg-zinc-950 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C8102E] dark:text-[#C9A84C]">{effectiveLabel}</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{subtitle}</p>
            <Link href={pdfHref} target="_blank" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] dark:bg-[#C9A84C] dark:text-zinc-950">
              <Download className="h-4 w-4" />
              Download PDF
            </Link>
          </div>
        </section>

        <section className="bg-white px-6 py-16 dark:bg-zinc-950 sm:py-20">
          <div className="mx-auto max-w-4xl space-y-10">
            {sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/80 sm:p-8">
                <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">{section.title}</h2>
                <div className="mt-5 space-y-4 text-left text-base leading-8 text-zinc-700 dark:text-zinc-300">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
