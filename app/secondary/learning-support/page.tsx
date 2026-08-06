'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const offers = [
  'Screening assessments for interventions and access arrangements',
  'Evidence-based interventions',
  'EAL (English as an Additional Language) support',
];

export default function LearningSupportPage() {
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
            style={{ backgroundImage: "url('/images/secondary/learning-support-title.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/88 via-[#1A1F4B]/72 to-[#C8102E]/40 dark:from-zinc-950/92 dark:via-zinc-900/82 dark:to-[#C8102E]/38" />
          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <Reveal>
              <p className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl">
                Secondary
              </p>
              <h1 className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl">
                Learning Support
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-left">
              <div className="space-y-7 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                <p>
                  We provide a range of support to ensure we meet the needs of all our learners. This begins with high
                  quality teaching provision in the mainstream classroom, augmented by support from the class teacher or a
                  member of the Learning Support department.
                </p>
                <p>
                  Where a need is identified, students are assigned a key worker and we put in place a personal support
                  plan involving all staff who will work with that child.
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-14 border-t border-zinc-200 pt-12 text-left dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Currently we offer:</h2>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
                className="mt-7 space-y-4"
              >
                {offers.map((offer) => (
                  <motion.li
                    key={offer}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    className="flex gap-4 rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 text-lg leading-8 text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                  >
                    <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#C8102E] dark:bg-[#C9A84C]" />
                    <span>{offer}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>

            <Reveal className="mt-12 space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                Our Learning Support team works in conjunction with our in-school counsellor to ensure students have
                comprehensive support with their social, emotional and mental health support.
              </p>
              <p>
                BIST is able to support mild to moderate learning needs. Please contact us to discuss whether we can
                accommodate your child&apos;s specific needs.
              </p>
            </Reveal>

          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
