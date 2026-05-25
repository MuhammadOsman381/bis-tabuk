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

const principles = [
  {
    title: 'Learning to Live:',
    image: '/images/core/second.JPG',
    body: 'This principle focuses on personal development and well-being. It encourages students to interact positively with others, respect themselves and their peers, act ethically and empathetically, participate in community service, and maintain a healthy lifestyle. The goal is to foster individuals who are responsible, considerate, and aware of their impact on the world.',
  },
  {
    title: 'Learning to Learn:',
    image: '/images/core/third.png',
    body: 'This principle emphasises the development of academic skills and a love for learning. It encourages students to set high academic goals, engage positively in all tasks, meet deadlines with quality work, respond to feedback, and take ownership of their learning. The aim is to cultivate independent, lifelong learners who are motivated and resilient.',
  },
  {
    title: 'Learning to Lead:',
    image: '/images/core/fourth.JPG',
    body: 'This principle focuses on leadership development. It encourages students to be open-minded, good communicators, organised, goal-oriented, and considerate towards others. The goal is to develop individuals who can inspire and motivate others, demonstrate responsibility, and have a positive impact on their communities.',
  },
];

export default function CorePrinciplesPage() {
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
            style={{ backgroundImage: "url('/images/core/first.JPG')" }}
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
              Core Principles
            </motion.h1>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="space-y-6 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                Students learn more effectively when they are happy, and research shows that students gain higher
                academic outcomes when they are involved in the broader life of the school, including trips, activities
                and service.
              </p>
              <p>
                The British International School of Tabuk (BIST) emphasises three core principles:{' '}
                <strong>Learning to Live, Learning to Learn, and Learning to Lead</strong>. These principles guide the
                school&apos;s approach to education, aiming to develop well-rounded individuals who are prepared for the
                challenges of the future.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <blockquote className="border-l-4 border-[#C8102E] pl-6 text-left text-xl font-semibold leading-9 text-[#1A1F4B] dark:text-zinc-50">
                “BIST has a wonderful international atmosphere where children thrive happily, learning good values,
                developing great self-esteem and respect for each other&apos;s differences and diversity.”
              </blockquote>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-16 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10"
            >
              {principles.map((principle) => (
                <motion.section
                  key={principle.title}
                  variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="py-10 text-left"
                >
                  <div className="grid gap-6 md:grid-cols-[16rem_1fr] md:items-start">
                    <div
                      className="min-h-64 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10"
                      style={{ backgroundImage: `url('${principle.image}')` }}
                      aria-label={`${principle.title} image`}
                    />
                    <div>
                      <h2 className="text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">{principle.title}</h2>
                      <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">{principle.body}</p>
                    </div>
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
