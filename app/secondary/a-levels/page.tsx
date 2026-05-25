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

const subjects = [
  'Arabic',
  'Biology',
  'Business Management',
  'Chemistry',
  'Computer Science',
  'Economics',
  'English',
  'French',
  'Geography',
  'History',
  'Mathematics',
  'Physics',
  'Psychology',
  'Spanish',
  'Theatre',
  'Visual Arts',
];

export default function IbOneAndTwoPage() {
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
                A Levels
              </h1>
            </Reveal>

            <Reveal className="mt-12">
              <div
                className="min-h-96 rounded-3xl bg-cover bg-center shadow-[0_22px_60px_rgba(26,31,75,0.14),inset_0_1px_0_rgba(255,255,255,0.22)] ring-1 ring-zinc-200 dark:ring-white/10"
                style={{ backgroundImage: "url('/images/secondary/fourth.png')" }}
                aria-label="Sixth Form students collaborating"
              />
            </Reveal>

            <Reveal className="mt-14 space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                In Sixth Form, students aged 16-18 can choose from three pathways designed to support a wide range of
                ambitions, university destinations and career interests.
              </p>
              <p>
                The A Levels Programme is a rigorous two-year course that develops academic
                depth, breadth, research skills and international mindedness.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <blockquote className="border-l-4 border-[#C8102E] pl-6 text-left text-xl font-semibold leading-9 text-[#1A1F4B] dark:border-[#C9A84C] dark:text-zinc-50">
                &quot;A Levels at BIST has helped me organise my time, think independently and prepare for university life.&quot; - Hadi, IB2
              </blockquote>
            </Reveal>

            <Reveal className="mt-12 space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                Students can build a programme that reflects their strengths while retaining the balanced learning
                experience that makes the IB such a respected qualification around the world.
              </p>
              <p>
                Alternative pathways provide additional routes for students who want a more specialised or applied
                approach to post-16 study.
              </p>
            </Reveal>

            <Reveal className="mt-14 border-t border-zinc-200 pt-12 text-left dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">The choice of subjects includes:</h2>
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

            <Reveal className="mt-12 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                University guidance is embedded throughout the Sixth Form experience, helping students research options,
                prepare applications and make confident decisions about their future.
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
