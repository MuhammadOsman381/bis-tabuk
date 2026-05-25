'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const curriculumSources = [
  'International Primary Curriculum (IPC)',
  'International Baccalaureate (IB) Learner Profile',
  'Current research',
  'Best practices from around the world.',
];

const fourRs = ['Resilience', 'Reciprocity', 'Resourcefulness', 'Reflectiveness'];

export default function AboutPrimarySectionPage() {
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
            style={{ backgroundImage: "url('/images/primary/first.JPG')" }}
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
              className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              About BIST Primary Section
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/86 md:text-xl"
            >
              For children aged 2-11 years old
            </motion.p>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>BIST Primary is a warm, vibrant and welcoming school, where learning is at the heart of everything we do.</p>
              <p>
                We are committed to providing a safe, secure and happy environment where our students, from around sixty
                nationalities, come together to learn in an atmosphere of mutual respect and international mindedness.
              </p>
              <p>Our Golden Rule says it all: &quot;We treat others the way we would like to be treated.&quot;</p>
            </Reveal>

            <Reveal className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/75 p-7 text-left shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">Curriculum Sources</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">Our curriculum is derived from the:</p>
              <ul className="mt-5 space-y-3 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {curriculumSources.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#C8102E] dark:bg-[#C9A84C]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <blockquote className="border-l-4 border-[#C8102E] pl-6 text-left text-xl font-semibold leading-9 text-[#1A1F4B] dark:border-[#C9A84C] dark:text-zinc-50">
                &quot;BIST supported me in writing my book by organising Book Days, Book Weeks, and various competitions.
                These events inspired me to write, explore my imagination, and bring my ideas to life.&quot; - Aaliyah, Y5-3
              </blockquote>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-16 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10"
            >
              <motion.section
                variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                className="py-10 text-left"
              >
                <div className="grid gap-8 md:grid-cols-[18rem_1fr] md:items-start">
                  <div
                    className="min-h-80 rounded-3xl bg-cover bg-center shadow-[0_22px_60px_rgba(26,31,75,0.14),inset_0_1px_0_rgba(255,255,255,0.22)] ring-1 ring-zinc-200 dark:ring-white/10"
                    style={{ backgroundImage: "url('/images/primary/second.png')" }}
                    aria-label="Primary students learning together"
                  />
                  <div>
                    <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">Holistic Learning</h2>
                    <div className="mt-5 space-y-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                      <p>
                        Our curriculum supports each child to develop holistically, to become life-long learners and to grow
                        socially, emotionally, physically, morally, creatively and academically.
                      </p>
                      <p>In addition, we actively encourage all our students to develop and recognise the four Rs:</p>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {fourRs.map((item) => (
                          <li key={item} className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 font-bold text-[#1A1F4B] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100">
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p>We cater for a wide range of students&apos; needs with Student Support Service Teams.</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                className="py-10 text-left"
              >
                <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">Strong home-school links</h2>
                <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                  We work hard to build positive and effective home-school partnerships. We encourage and expect all our
                  parents to participate not only in their own child&apos;s education but also in the wider life of the school.
                </p>
              </motion.section>
            </motion.div>

            <Reveal className="mt-12 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                A child&apos;s time in Primary School is very special. We are proud of our commitment to making their
                experience rewarding and positive.
              </p>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
