'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const subjects = [
  {
    name: 'English Language & Literature',
    image: 'https://picsum.photos/id/1011/640/420',
    description: 'Students develop analytical reading, confident writing, speaking, listening and literary interpretation.',
  },
  {
    name: 'Arabic',
    image: 'https://picsum.photos/id/1060/640/420',
    description: 'Arabic learning supports language growth, cultural understanding and confident communication.',
  },
  {
    name: 'Art',
    image: 'https://picsum.photos/id/1025/640/420',
    description: 'Creative practice encourages experimentation, visual confidence and personal expression.',
  },
  {
    name: 'Biology',
    image: 'https://picsum.photos/id/1020/640/420',
    description: 'Biology explores living systems through inquiry, practical investigation and scientific thinking.',
  },
  {
    name: 'Business Studies',
    image: 'https://picsum.photos/id/1031/640/420',
    description: 'Students learn how organisations work, make decisions and respond to changing markets.',
  },
  {
    name: 'Drama & Theatre Studies',
    image: 'https://picsum.photos/id/1035/640/420',
    description: 'Drama builds performance skills, collaboration, creativity and critical reflection.',
  },
  {
    name: 'Environmental Systems and Society',
    image: 'https://picsum.photos/id/1039/640/420',
    description: 'Learners examine sustainability, ecosystems and the relationship between people and planet.',
  },
  {
    name: 'French',
    image: 'https://picsum.photos/id/1043/640/420',
    description: 'French develops communication skills and intercultural understanding through language learning.',
  },
  {
    name: 'Geography',
    image: 'https://picsum.photos/id/1044/640/420',
    description: 'Geography helps students understand places, environments, people and global change.',
  },
  {
    name: 'History',
    image: 'https://picsum.photos/id/1048/640/420',
    description: 'Students investigate the past, evaluate evidence and understand historical significance.',
  },
  {
    name: 'Mathematics',
    image: 'https://picsum.photos/id/1056/640/420',
    description: 'Mathematics develops fluency, reasoning, problem solving and confidence with abstract ideas.',
  },
  {
    name: 'Music',
    image: 'https://picsum.photos/id/1059/640/420',
    description: 'Music supports performance, composition, listening skills and creative collaboration.',
  },
  {
    name: 'Physical Education',
    image: 'https://picsum.photos/id/1066/640/420',
    description: 'PE promotes health, teamwork, resilience, movement skills and lifelong wellbeing.',
  },
  {
    name: 'Physics',
    image: 'https://picsum.photos/id/1067/640/420',
    description: 'Physics explores forces, energy and matter through practical and theoretical investigation.',
  },
  {
    name: 'Theory Of Knowledge (TOK)',
    image: 'https://picsum.photos/id/1070/640/420',
    description: 'TOK asks students to reflect on knowledge, evidence, perspectives and how we know what we know.',
  },
  {
    name: 'Spanish',
    image: 'https://picsum.photos/id/1071/640/420',
    description: 'Spanish develops practical communication and appreciation of Spanish-speaking cultures.',
  },
  {
    name: 'Chemistry',
    image: 'https://picsum.photos/id/1074/640/420',
    description: 'Chemistry studies substances, reactions and scientific patterns through lab-based inquiry.',
  },
  {
    name: 'Economics',
    image: 'https://picsum.photos/id/1080/640/420',
    description: 'Economics introduces students to choices, systems, markets and real-world decision making.',
  },
];

export default function SubjectsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState('All');

  const visibleSubjects = useMemo(() => {
    if (activeSubject === 'All') {
      return subjects;
    }

    return subjects.filter((subject) => subject.name === activeSubject);
  }, [activeSubject]);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="relative min-h-[52vh] overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: "url('https://picsum.photos/id/1021/1920/980')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/90 via-[#1A1F4B]/76 to-[#C8102E]/48 dark:from-zinc-950/94 dark:via-zinc-900/82 dark:to-[#C8102E]/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%)]" />

          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl"
            >
              Secondary
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-black leading-[0.95] drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              Subjects
            </motion.h1>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-6xl px-6">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Explore the breadth of Secondary subjects available at BIST, from languages and humanities to sciences,
                arts and applied learning.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <div className="flex flex-wrap justify-center gap-2">
                {['All', ...subjects.map((subject) => subject.name)].map((subject) => {
                  const isActive = activeSubject === subject;

                  return (
                    <button
                      key={subject}
                      type="button"
                      onClick={() => setActiveSubject(subject)}
                      className={`relative overflow-hidden rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${
                        isActive
                          ? 'border-[#C8102E] bg-[#C8102E] text-white shadow-[0_12px_30px_rgba(200,16,46,0.22)] dark:border-[#C9A84C] dark:bg-[#C9A84C] dark:text-zinc-950'
                          : 'border-zinc-200 bg-white/70 text-zinc-600 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:text-zinc-100'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-subject-chip"
                          className="absolute inset-0 -z-10 rounded-full bg-inherit"
                          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                        />
                      )}
                      {subject}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <motion.div
              layout
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visibleSubjects.map((subject) => (
                  <motion.article
                    layout
                    key={subject.name}
                    variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url('${subject.image}')` }}
                      aria-label={`${subject.name} subject image`}
                    />
                    <div className="p-6 text-left">
                      <h2 className="text-xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50">{subject.name}</h2>
                      <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">{subject.description}</p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

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
