'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const subjects = [
  'Arabic',
  'Art',
  'Drama',
  'English',
  'French',
  'Geography',
  'History',
  'ICT and Computing',
  'Mathematics',
  'Music',
  'Physical Education',
  'Science',
  'Wellbeing',
];

export default function KeyStageThreePage() {
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
            style={{ backgroundImage: "url('/images/secondary/ks3-key-stage.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/88 via-[#1A1F4B]/72 to-[#C8102E]/40 dark:from-zinc-950/92 dark:via-zinc-900/82 dark:to-[#C8102E]/38" />
          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <Reveal>
              <p className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl">
                Secondary
              </p>
              <h1 className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl">
                Years 7-9 (Key Stage Three)
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                In Key Stage 3 (Years 7, 8 and 9), students aged 11-14 develop their skills in a broad range of
                subjects, building the confidence, curiosity and independence needed for later academic success.
              </p>
            </Reveal>

            <Reveal className="mt-10 rounded-3xl border border-zinc-200/80 bg-white/75 p-7 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#C8102E]/18 dark:text-[#ff8fa0]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">Subject breadth</h2>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={staggerContainer}
                  className="mt-6 grid gap-3 sm:grid-cols-2"
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
              </div>
            </Reveal>

            <Reveal className="mt-8 text-left">
              <a
                href="#"
                className="luxury-link inline-flex items-center text-sm font-black uppercase tracking-[0.18em]"
              >
                View Subject Groups here
              </a>
            </Reveal>

            <Reveal className="mt-10 space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                The curriculum is supported by BIST&apos;s core principles of Learning to Live, Learning to Learn and
                Learning to Lead, helping students develop academically and personally.
              </p>
              <p>
                Outdoor Education, activities and service opportunities give students space to test themselves, work with
                others and build resilience beyond the classroom.
              </p>
            </Reveal>

          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
