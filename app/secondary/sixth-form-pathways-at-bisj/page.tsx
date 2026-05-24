'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const pathways = [
  {
    title: 'International Baccalaureate (IB)',
    icon: GraduationCap,
    image: 'https://picsum.photos/id/1031/640/480',
    body: 'A broad, academically rigorous pathway for students who want depth, breadth, research, reflection and a highly respected international qualification.',
  },
  {
    title: 'Advanced Level (A Level)',
    icon: Award,
    image: 'https://picsum.photos/id/1048/640/480',
    body: 'A focused academic pathway for students who want to specialise in a smaller number of subjects and prepare for competitive university courses.',
  },
  {
    title: 'BTEC',
    icon: BriefcaseBusiness,
    image: 'https://picsum.photos/id/1071/640/480',
    body: 'An applied pathway for students who learn best through practical, career-connected projects and portfolio-based evidence.',
  },
];

const subjectGroups = [
  {
    title: 'First Language',
    items: ['English', 'Arabic'],
  },
  {
    title: 'Additional Language',
    items: ['French', 'Spanish'],
  },
  {
    title: 'Individuals and Societies',
    items: ['Business Management', 'Economics', 'Geography', 'History', 'Psychology'],
  },
  {
    title: 'Sciences and Mathematics',
    items: ['Biology', 'Chemistry', 'Physics', 'Computer Science', 'Mathematics'],
  },
  {
    title: 'Arts and Applied Learning',
    items: ['Theatre', 'Visual Arts', 'BTEC pathways'],
  },
];

export default function SixthFormPathwaysPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="relative min-h-[58vh] overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: "url('https://picsum.photos/id/1026/1920/980')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/90 via-[#1A1F4B]/76 to-[#C8102E]/48 dark:from-zinc-950/94 dark:via-zinc-900/82 dark:to-[#C8102E]/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%)]" />

          <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl"
            >
              Sixth Form
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              Sixth Form Pathways at BIST
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/86 md:text-xl"
            >
              Your Future Starts Here...
            </motion.p>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal className="mx-auto max-w-3xl text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                BIST offers three Post-16 pathways so students can choose the route that best matches their interests,
                ambitions, learning style and future plans.
              </p>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-12 grid gap-5 lg:grid-cols-3"
            >
              {pathways.map((pathway) => {
                const Icon = pathway.icon;

                return (
                  <motion.article
                    key={pathway.title}
                    variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div
                      className="h-44 bg-cover bg-center"
                      style={{ backgroundImage: `url('${pathway.image}')` }}
                      aria-label={`${pathway.title} image`}
                    />
                    <div className="p-6 text-left">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#C8102E]/18 dark:text-[#ff8fa0]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50">{pathway.title}</h2>
                      <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">{pathway.body}</p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

            <Reveal className="mx-auto mt-16 max-w-3xl border-t border-zinc-200 pt-12 text-left dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Subjects and categories</h2>
              <div className="mt-8 space-y-6">
                {subjectGroups.map((group) => (
                  <div key={group.title} className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                    <h3 className="text-xl font-black text-[#1A1F4B] dark:text-zinc-50">{group.title}</h3>
                    <p className="mt-3 text-lg leading-8 text-zinc-700 dark:text-zinc-300">{group.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mx-auto mt-10 max-w-3xl rounded-3xl border border-[#C8102E]/15 bg-[#C8102E]/6 p-6 text-left dark:border-[#C9A84C]/20 dark:bg-[#C9A84C]/8">
              <p className="text-lg font-semibold leading-8 text-[#1A1F4B] dark:text-zinc-100">
                A-Level and BTEC pathways are planned to begin from 2026/27, expanding the range of choices available to
                BIST Sixth Form students.
              </p>
            </Reveal>

            <Reveal className="mx-auto mt-16 max-w-3xl border-t border-zinc-200 pt-12 text-center dark:border-white/10">
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
