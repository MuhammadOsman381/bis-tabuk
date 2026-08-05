'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Motion';

const intro = [
  'The BIST Secondary School is a vibrant place of learning where students aged 11-18 are encouraged to be ambitious, thoughtful and globally minded.',
  'We are very proud of the excellent academic outcomes achieved by our students, and equally proud of the character, confidence and curiosity they develop during their time with us.',
  'Students learn in a supportive international community where strong relationships, high expectations and meaningful opportunities help them prepare for the next stage of their education.',
];

const curriculum = [
  'Our British-style curriculum is broad, balanced and internationally focused. It gives students a strong academic foundation while encouraging independence, creativity and critical thinking.',
  'In the lower years, students build confidence across a wide range of subjects before moving into carefully guided IGCSE and post-16 pathways.',
  'Across the Secondary School, students are supported by experienced teachers, pastoral teams and enrichment opportunities that help them become resilient learners and principled young adults.',
];

export default function AboutSecondarySectionPage() {
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
            style={{ backgroundImage: "url('/images/secondary/first.JPG')" }}
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
              Secondary
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              About BIST Secondary Section
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/86 md:text-xl"
            >
              For children aged 11-18 years old
            </motion.p>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal className="mt-14 border-t border-zinc-200 pt-12 text-left dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">British-style curriculum</h2>
              <div className="mt-6 space-y-7 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {curriculum.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
