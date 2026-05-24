'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const missionBullets = [
  "Our community of learners from many nations works together harmoniously. In a spirit of international mindedness, we develop understandings of our own and others' cultures.",
  'Our teachers, working with parents as partners, inspire in our students a love of learning, motivating and challenging them to become the best they can be.',
  'Our students build personal and interpersonal knowledge, skills and values. In developing these attributes in an innovative environment, we expect our students to flourish, becoming balanced individuals with the potential to make a difference as principled leaders of the future.',
];

const values = [
  {
    title: 'Respect',
    lines: ['We treat others with kindness, empathy, and courtesy.', 'We celebrate diversity and listen with an open mind.'],
  },
  {
    title: 'Responsibility',
    lines: [
      'We take ownership of our choices and actions.',
      'We strive to be honest, dependable, and considerate members of our community.',
    ],
  },
  {
    title: 'Integrity',
    lines: ['We do what is right-even when no one is watching.', 'Truthfulness, fairness, and trust lie at the heart of who we are.'],
  },
  {
    title: 'Open-mindedness',
    lines: ['We welcome new ideas and value different perspectives.', 'Curiosity leads us to deeper understanding.'],
  },
  {
    title: 'Resilience',
    lines: ['We face challenges with courage and a positive outlook.', 'We see setbacks as opportunities to learn and grow.'],
  },
  {
    title: 'Balance',
    lines: [
      'We care for our minds, bodies, and relationships.',
      'We strive to be well-rounded individuals who flourish in all aspects of life.',
    ],
  },
  {
    title: 'Enquiry & Reflection',
    lines: [
      'We ask thoughtful questions and think critically.',
      'By reflecting on our experiences, we continually improve ourselves and our learning.',
    ],
  },
  {
    title: 'Communication & Collaboration',
    lines: ['We express ourselves clearly and listen respectfully.', 'Working together, we achieve more.'],
  },
];

export default function VisionMissionValuesPage() {
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
            style={{ backgroundImage: "url('/images/vision/first.JPG')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/90 via-[#1A1F4B]/78 to-[#C8102E]/48 dark:from-zinc-950/94 dark:via-zinc-900/84 dark:to-[#C8102E]/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%)]" />

          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl"
            >
              About BIST
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              Vision, Mission & Values
            </motion.h1>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                To provide an outstanding international education, continuously striving for improvement and engaging our
                whole community with the concepts of:
              </p>
            </Reveal>

            <Reveal className="mt-16 border-t border-zinc-200 pt-12 dark:border-white/10">
              <h2 className="text-left text-2xl font-black tracking-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-3xl">
                MISSION:
              </h2>
              <p className="mt-5 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                We provide excellent British-style education with an international perspective, within a safe environment,
                where individuals feel secure, respected, valued, happy and successful.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div
                  className="min-h-64 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  style={{ backgroundImage: "url('/images/vision/second.png')" }}
                  aria-label="Students collaborating in a classroom"
                />
                <div
                  className="min-h-64 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  style={{ backgroundImage: "url('/images/vision/third.jpg')" }}
                  aria-label="School community learning together"
                />
              </div>

              <h3 className="mt-10 text-left text-xl font-black text-[#1A1F4B] dark:text-zinc-50">
                To achieve our mission:
              </h3>
              <ul className="mt-5 space-y-5 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {missionBullets.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[#C8102E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-20 border-t border-zinc-200 pt-12 dark:border-white/10">
              <h2 className="text-left text-3xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-4xl">
                Our Core Values: Growing Together as a Global Community
              </h2>
              <p className="mt-6 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                At BIST, we nurture confident, compassionate, and principled learners. Our values guide every member of
                our school-from our youngest pupils to our graduates-as we learn, grow, and lead together.
              </p>

              <div
                className="mt-8 min-h-80 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]"
                style={{ backgroundImage: "url('/images/vision/fourth.jpg')" }}
                aria-label="Students representing core values"
              />
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10"
            >
              {values.map((value) => (
                <motion.section
                  key={value.title}
                  variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="py-8 text-left"
                >
                  <h3 className="text-2xl font-black text-[#C8102E] dark:text-[#ff8fa0]">{value.title}</h3>
                  <div className="mt-4 space-y-2 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                    {value.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </motion.div>

            <Reveal className="mt-16 text-center">
              <p className="text-2xl font-black leading-9 text-[#1A1F4B] dark:text-zinc-50">
                At BIST, these values unite us. They inspire us. They define us.
              </p>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
