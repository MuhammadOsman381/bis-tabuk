'use client';

import { useState } from 'react';
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

export type ShellCard = {
  title: string;
  description: string;
  image?: string;
  tag?: string;
  date?: string;
  href?: string;
  cta?: string;
};

export type ShellTable = {
  headers: string[];
  rows: string[][];
};

export type ShellSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  cards?: ShellCard[];
  table?: ShellTable;
};

type SchoolPageShellProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroAlt?: string;
  intro?: string[];
  quote?: string;
  sections?: ShellSection[];
  children?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  ctaTitle?: string;
};

function DataTable({ table }: { table: ShellTable }) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white/75 shadow-[0_18px_55px_rgba(26,31,75,0.08)] dark:border-white/10 dark:bg-white/[0.04]">
      <table className="w-full border-collapse text-left">
        <thead className="bg-[#1A1F4B] text-white dark:bg-white/10">
          <tr>
            {table.headers.map((header) => (
              <th key={header} className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
          {table.rows.map((row) => (
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
  );
}

function SectionBlock({ section }: { section: ShellSection }) {
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
          <div className="relative min-h-80 overflow-hidden rounded-3xl shadow-[0_22px_60px_rgba(26,31,75,0.14),inset_0_1px_0_rgba(255,255,255,0.22)] ring-1 ring-zinc-200 dark:ring-white/10">
            <Image
              src={section.image}
              alt={section.imageAlt ?? section.title}
              fill
              sizes="(min-width: 768px) 20rem, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
      {section.cards && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {section.cards.map((card) => (
            <motion.article
              key={card.title}
              variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/75 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
            >
              {card.image && (
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={`${card.title} image`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#C8102E] dark:text-[#ff8fa0]">
                  {card.date && <span>{card.date}</span>}
                  {card.tag && <span>{card.tag}</span>}
                </div>
                <h3 className="text-xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">{card.description}</p>
                {card.cta && (
                  <Link href={card.href ?? '#'} className="luxury-link mt-5 inline-flex text-sm font-black">
                    {card.cta}
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
      {section.table && <DataTable table={section.table} />}
    </Reveal>
  );
}

export default function SchoolPageShell({
  eyebrow,
  title,
  subtitle,
  heroImage,
  heroAlt,
  intro,
  quote,
  sections,
  children,
  ctaLabel = 'Join Our School',
  ctaHref = '/apply',
  ctaTitle = 'Register Online',
}: SchoolPageShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        {heroImage ? (
          <section className="relative min-h-[58vh] overflow-hidden">
            <Image
              src={heroImage}
              alt={heroAlt ?? title}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0  object-contain "
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/90 via-[#1A1F4B]/76 to-[#C8102E]/48 dark:from-zinc-950/94 dark:via-zinc-900/82 dark:to-[#C8102E]/42" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%)]" />
            <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center text-white">
              <p className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl">{eyebrow}</p>
              <h1 className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl">{title}</h1>
              {subtitle && <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/86 md:text-xl">{subtitle}</p>}
            </div>
          </section>
        ) : (
          <section className="luxury-section bg-[#fffaf4] pt-16 dark:bg-zinc-950 sm:pt-24">
            <Reveal className="mx-auto max-w-4xl px-6 text-center">
              <p className="luxury-kicker text-xs font-bold uppercase tracking-[0.24em]">{eyebrow}</p>
              <h1 className="mt-6 text-4xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">{title}</h1>
              {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-zinc-600 dark:text-zinc-300">{subtitle}</p>}
            </Reveal>
          </section>
        )}

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            {intro && (
              <Reveal className="space-y-7 text-left text-xl leading-8 text-zinc-700 dark:text-zinc-300">
                {intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>
            )}
             <div className="mt-5 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 shadow-2xl shadow-zinc-900/12 dark:border-white/10 dark:shadow-black/40">
                <iframe
                  className="aspect-video w-full"
                  src="https://www.youtube.com/embed/5VnQgM32YCs"
                  title="BIST community video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            {quote && (
              <Reveal className="mt-12">
                <blockquote className="border-l-4 border-[#C8102E] pl-6 text-left text-xl font-semibold leading-9 text-[#1A1F4B] dark:border-[#C9A84C] dark:text-zinc-50">{quote}</blockquote>
              </Reveal>
            )}
            {sections?.map((section) => <SectionBlock key={section.title} section={section} />)}
            {children}
            {/* <Reveal className="mt-16 border-t border-zinc-200 pt-12 text-center dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">{ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">Click below to register your interest-we&apos;d love to hear from you!</p>
              <Link href={ctaHref} className="group relative isolate mt-8 inline-flex overflow-hidden rounded-full bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_38px_rgba(200,16,46,0.26)] transition hover:-translate-y-0.5">
                <span className="absolute inset-y-0 -left-1/2 -z-10 w-1/3 rotate-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Reveal> */}
          </div>
        </section>
        {/* <Footer /> */}
      </div>
    </motion.main>
  );
}
