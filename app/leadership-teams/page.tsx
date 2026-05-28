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
import Image from 'next/image';

const teams = [
  {
    title: 'Director General',
    name: 'Dr. Khaled Khader Abudhaim',
    image: '/images/dg.jpeg',
    caption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Principal',
    name: 'Dr. Areej Faraj Al Atawi',
    image: '/images/p.jpeg',
    caption:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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

                  {/* <div
                    className="mx-auto mt-7 min-h-80 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10"
                    style={{ backgroundImage: `url('${team.image}')` }}
                    aria-label={`${team.title} group photo`}
/> */}

                <Image 
                src={team.image} alt={team.title} width={300} height={650} className="mx-auto mt-7 min-h-80 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10" />


                    <div className='text-xl font-bold text-center mt-3' >
                      {team.name}
                    </div>


                  <p className="mt-5 text-left text-base leading-7 text-zinc-600 dark:text-zinc-400">{team.caption}</p>
                </motion.section>
              ))}
            </motion.div>

            
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
