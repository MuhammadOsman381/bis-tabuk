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

const offers = [
  'Screening assessments for interventions and access arrangements',
  'Evidence-based interventions',
  'EAL (English as an Additional Language) support',
  'Homework Club (open to all students)',
];

export default function LearningSupportPage() {
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
                Learning Support
              </h1>
            </Reveal>

            <Reveal className="mt-14 grid gap-8 text-left md:grid-cols-[1fr_18rem] md:items-start">
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
              <div
                className="min-h-80 rounded-3xl bg-cover bg-center shadow-[0_22px_60px_rgba(26,31,75,0.14),inset_0_1px_0_rgba(255,255,255,0.22)] ring-1 ring-zinc-200 dark:ring-white/10"
                style={{ backgroundImage: "url('https://picsum.photos/id/1076/800/1000')" }}
                aria-label="Teacher supporting student learning"
              />
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
