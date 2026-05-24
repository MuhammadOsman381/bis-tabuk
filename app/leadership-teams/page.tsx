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

const teams = [
  {
    title: 'Leadership Team',
    image: 'https://picsum.photos/id/1012/1200/650',
    caption:
      'From Left to Right: Michael Holiday (Head of Secondary), Helen Olds (Director), Andrew Berry (Head of Operations and Finance), Timothy Belfield (Head of Primary).',
  },
  {
    title: 'Primary Leadership Team',
    image: 'https://picsum.photos/id/1027/1200/650',
    caption:
      'From Left to Right: Amy Walters (Deputy Head Teacher - Early Years), Simon Clark (Deputy Head Teacher - Curriculum), Timothy Belfield (Head Teacher), Lorna Mallory (Deputy Head Teacher - Administration), Ann English* (Deputy Head Teacher - Pastoral).',
    note:
      '*Ann English is the Designated Safeguarding Lead (DSL) for Primary, responsible for overseeing the safety and welfare of our younger students.',
  },
  {
    title: 'Secondary Leadership Team',
    image: 'https://picsum.photos/id/1041/1200/650',
    caption:
      'From Left to Right: Rachel Henwood (Assistant Head -Teaching and Learning), Dean El Hoss (Deputy Head Teacher - Curriculum), Michael Holiday (Head Teacher), Miles Walbank* (Deputy Head Teacher - Pastoral), Oliver Meyer (Assistant Head - IBDP Coordinator), David Nicholls (Assistant Head - Enrichment).',
    note:
      '*Miles Walbank is the Designated Safeguarding Lead (DSL) for Secondary, ensuring the protection and well-being of our senior students.',
  },
];

export default function LeadershipTeamsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal className="text-center">
              <p className="luxury-kicker text-xs font-bold uppercase tracking-[0.24em]">About BIST</p>
              <h1 className="mt-6 text-4xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">
                Leadership Teams
              </h1>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-16 space-y-16"
            >
              {teams.map((team) => (
                <motion.section
                  key={team.title}
                  variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="border-t border-zinc-200 pt-12 text-left dark:border-white/10"
                >
                  <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">{team.title}</h2>

                  <div
                    className="mx-auto mt-7 min-h-80 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10"
                    style={{ backgroundImage: `url('${team.image}')` }}
                    aria-label={`${team.title} group photo`}
                  />

                  <p className="mt-5 text-left text-base leading-7 text-zinc-600 dark:text-zinc-400">{team.caption}</p>
                  {team.note && (
                    <p className="mt-4 text-left text-sm font-semibold leading-7 text-[#1A1F4B] dark:text-zinc-200">{team.note}</p>
                  )}
                </motion.section>
              ))}
            </motion.div>

            <Reveal className="mt-20 border-t border-zinc-200 pt-12 text-center dark:border-white/10">
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
