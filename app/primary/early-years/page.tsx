'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const sections = [
  {
    title: 'Our Nursery',
    body: [
      "In Nursery, children are beginning their learning journey by exploring the world around them with curiosity and enthusiasm.",
      'Learning is planned around the Characteristics of Effective Learning, helping children to play, explore, create, think critically and keep trying when challenges appear.',
      'Children develop through the Prime Areas of communication and language, physical development, and personal, social and emotional development, while also being gently introduced to the Specific Areas of literacy, mathematics, understanding the world, and expressive arts and design.',
    ],
  },
  {
    title: 'Foundation Stage 1 (FS1)',
    body: [
      'Our Foundation Stage 1 (FS1) team has a wealth of experience and creates a warm, stimulating environment where children feel safe, valued and ready to learn.',
      'Children are encouraged to become increasingly independent through purposeful play, routines, collaboration and rich language experiences.',
      'The FS1 programme supports early confidence, social skills, creativity and problem solving, while helping children develop the foundations they need for future learning.',
    ],
  },
  {
    title: 'Foundation Stage 2 (FS2)',
    body: [
      'Foundation Stage 2 (FS2) is an exciting year where children grow in confidence, independence and readiness for Year 1.',
      'Students continue to learn through a careful balance of play-based exploration, focused teaching and guided activities that develop critical thinking, communication and collaboration.',
      'Children build early literacy and mathematical understanding through meaningful contexts, stories, numbers, patterns, practical experiences and opportunities to explain their thinking.',
    ],
  },
];

export default function EarlyYearsPage() {
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
            style={{ backgroundImage: "url('/images/early/first.JPG')" }}
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
              Primary
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-black leading-[0.95] drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              Early Years
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/86 md:text-xl"
            >
              Early Years learning is for children aged 2-5, giving every child a joyful and secure start to school life.
            </motion.p>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                Positive relationships between staff, children, and parents are at the heart of BIST&apos;s Early Years
                environment. We create a caring, language-rich setting where children learn through play, exploration and
                meaningful experiences. Our youngest learners are encouraged to become confident communicators,
                independent thinkers and kind friends as they begin their school journey.
              </p>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-14 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10"
            >
              {sections.map((section) => (
                <motion.section
                  key={section.title}
                  variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="py-10 text-left"
                >
                  <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">{section.title}</h2>
                  <div className="mt-5 space-y-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </motion.div>

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
