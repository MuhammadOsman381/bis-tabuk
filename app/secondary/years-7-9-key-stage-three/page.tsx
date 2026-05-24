'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
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
  'Spanish',
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

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-center">
              <p className="luxury-kicker text-xs font-bold uppercase tracking-[0.24em]">Secondary</p>
              <h1 className="mt-6 text-4xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">
                Years 7-9 (Key Stage Three)
              </h1>
            </Reveal>

            <Reveal className="mt-14 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                In Key Stage 3 (Years 7, 8 and 9), students aged 11-14 develop their skills in a broad range of
                subjects, building the confidence, curiosity and independence needed for later academic success.
              </p>
            </Reveal>

            <Reveal className="mt-10 grid gap-8 rounded-3xl border border-zinc-200/80 bg-white/75 p-7 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] md:grid-cols-[1fr_16rem]">
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
              <div
                className="min-h-72 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]"
                style={{ backgroundImage: "url('/images/secondary/second.jpg')" }}
                aria-label="Secondary students in learning activities"
              />
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
