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
import type { BeyondPage, BeyondSection } from './content';

function SectionBlock({ section }: { section: BeyondSection }) {
  return (
    <Reveal className="mt-14 border-t border-zinc-200 pt-12 text-left dark:border-white/10">
      <div className={section.image ? 'grid gap-8 md:grid-cols-[1fr_20rem] md:items-start' : ''}>
        <div>
          <h2 className="text-3xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50">{section.title}</h2>

          {section.paragraphs && (
            <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}

          {section.bullets && (
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-7 grid gap-3 sm:grid-cols-2"
            >
              {section.bullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  className="flex gap-4 rounded-2xl border border-zinc-200 bg-white/70 px-5 py-4 text-base font-semibold leading-7 text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                >
                  <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#C8102E] dark:bg-[#C9A84C]" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>

        {section.image && (
          <div
            className="min-h-80 rounded-3xl bg-cover bg-center shadow-[0_22px_60px_rgba(26,31,75,0.14),inset_0_1px_0_rgba(255,255,255,0.22)] ring-1 ring-zinc-200 dark:ring-white/10"
            style={{ backgroundImage: `url('${section.image}')` }}
            aria-label={section.imageAlt}
          />
        )}
      </div>

      {section.cards && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {section.cards.map((card) => {
            const content = (
              <motion.article
                variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="h-full overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
              >
                {card.image && (
                  <div
                    className="h-36 bg-cover bg-center"
                    style={{ backgroundImage: `url('${card.image}')` }}
                    aria-label={`${card.title} image`}
                  />
                )}
                <div className="p-5">
                  <h3 className="text-lg font-black leading-tight text-[#1A1F4B] dark:text-zinc-50">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{card.description}</p>
                </div>
              </motion.article>
            );

            return card.href ? (
              <Link key={card.title} href={card.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={card.title}>{content}</div>
            );
          })}
        </motion.div>
      )}

      {section.table && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white/75 shadow-[0_18px_55px_rgba(26,31,75,0.08)] dark:border-white/10 dark:bg-white/[0.04]">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#1A1F4B] text-white dark:bg-white/10">
              <tr>
                {section.table.headers.map((header) => (
                  <th key={header} className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
              {section.table.rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((cell) => (
                    <td key={cell} className="px-5 py-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Reveal>
  );
}

export default function BeyondClassroomPageClient({ page }: { page: BeyondPage }) {
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
            style={{ backgroundImage: `url('${page.heroImage}')` }}
            aria-label={page.heroAlt}
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
              Beyond the Classroom
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              {page.title}
            </motion.h1>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            {page.intro && (
              <Reveal className="space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                {page.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>
            )}

            {page.gallery && (
              <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
                {page.gallery.map((item) => (
                  <div
                    key={item.alt}
                    className="min-h-52 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    aria-label={item.alt}
                  />
                ))}
              </Reveal>
            )}

            {page.quote && (
              <Reveal className="mt-12">
                <blockquote className="border-l-4 border-[#C8102E] pl-6 text-left text-xl font-semibold leading-9 text-[#1A1F4B] dark:border-[#C9A84C] dark:text-zinc-50">
                  {page.quote}
                </blockquote>
              </Reveal>
            )}

            {page.sections?.map((section) => (
              <SectionBlock key={section.title} section={section} />
            ))}

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
