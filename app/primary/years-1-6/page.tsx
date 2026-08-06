'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Motion';

const paragraphs = [
  'From Years 1 to 6, children aged 5-11 follow a broad and engaging curriculum that fosters academic growth, independence, and lifelong learning.',
  'Our dynamic programme ensures that students develop essential skills while encouraging Curiosity, Teamwork, and Resilience.',
  'Throughout these years, children transition from creative play to more structured learning, building strong foundations in literacy, mathematics, science, humanities, creative arts, languages and physical education.',
  'Learning experiences are designed to be active, purposeful and connected, helping students make links between subjects and apply their understanding in meaningful ways.',
  'Leadership roles, such as Student Council and House Captains, provide opportunities for students to serve others, develop confidence and contribute to the wider school community.',
  'Special events like Sports Day, class assemblies, performances, themed learning days and community projects enrich the curriculum and help children celebrate their achievements.',
  'Programmes like Bring Your Own Device support responsible digital learning, encouraging students to use technology thoughtfully, creatively and safely.',
  "The school's guiding principle of 'Treat Others the Way You Want to Be Treated' helps students grow as respectful, kind and internationally minded young people.",
];

export default function YearsOneToSixPage() {
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
            style={{ backgroundImage: "url('/images/primary/years-1-6-classroom.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/88 via-[#1A1F4B]/72 to-[#C8102E]/40 dark:from-zinc-950/92 dark:via-zinc-900/82 dark:to-[#C8102E]/38" />
          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <Reveal>
              <p className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl">
                Primary
              </p>
              <h1 className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl">
                Years 1-6
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {paragraphs.slice(0, 4).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <blockquote className="border-l-4 border-[#C8102E] pl-6 text-left text-xl font-semibold leading-9 text-[#1A1F4B] dark:border-[#C9A84C] dark:text-zinc-50">
                Personal development is equally emphasised, with children learning to manage their materials, set goals,
                and take responsibility for their learning.
              </blockquote>
            </Reveal>

            <Reveal className="mt-12 space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {paragraphs.slice(4).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
