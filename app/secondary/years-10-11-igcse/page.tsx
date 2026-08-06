'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const subjects = [
  'Arabic',
  'Art and Design',
  'Biology',
  'Business Studies',
  'Chemistry',
  'Computer Science',
  'English Language',
  'English Literature',
  'Mathematics',
  'Physical Education',
  'Physics',
];

export default function IgcsePage() {
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
            style={{ backgroundImage: "url('/images/secondary/ks4.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/88 via-[#1A1F4B]/72 to-[#C8102E]/40 dark:from-zinc-950/92 dark:via-zinc-900/82 dark:to-[#C8102E]/38" />
          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <Reveal>
              <p className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl">
                Secondary
              </p>
              <h1 className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl">
                Years 10 & 11 (IGCSE)
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                In Years 10 and 11, students aged 14-16 study a two-year programme leading to International General
                Certificate of Secondary Education qualifications.
              </p>
              <p>
                The IGCSE pathway provides academic challenge, subject choice and strong preparation for Sixth Form
                study. Students are guided to choose a balanced programme that reflects their strengths and future goals.
              </p>
            </Reveal>

            <Reveal className="mt-14 border-t border-zinc-200 pt-12 text-left dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Subjects on offer include:</h2>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
                className="mt-7 grid gap-3 sm:grid-cols-2"
              >
                {subjects.map((subject) => (
                  <motion.li
                    key={subject}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm font-bold text-[#1A1F4B] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100"
                  >
                    {subject}
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>

          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
