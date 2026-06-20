'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpenText,
  ExternalLink,
  GraduationCap,
  School,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import AuthAction from '@/components/ui/AuthAction';

type PortalLink = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  external?: boolean;
};

const portalLinks: PortalLink[] = [
  {
    label: 'Handbook',
    href: '/handbook',
    description: 'Read school guidance, policies, and essential information.',
    icon: BookOpenText,
  },
  {
    label: 'Admin',
    href: '/admin',
    description: 'Manage applications, teachers, classes, and school content.',
    icon: ShieldCheck,
  },
  {
    label: 'Parents',
    href: '/apply',
    description: 'Start a new admission application or continue an existing one.',
    icon: UsersRound,
  },
  {
    label: 'Teachers',
    href: 'https://isksafh.vercel.app/',
    description: 'Open the teaching and learning management workspace.',
    icon: School,
    external: true,
  },
  {
    label: 'Students',
    href: '/student',
    description: 'Access assigned learning materials and student resources.',
    icon: GraduationCap,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: 'easeOut' as const } },
};

function PortalCard({ item }: { item: PortalLink }) {
  const Icon = item.icon;
  const content = (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      className="premium-card group relative h-full overflow-hidden rounded-2xl p-6 sm:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8102E]/50 to-transparent dark:via-[#C9A84C]/45" />
      <div className="flex items-start justify-between gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20 transition-transform duration-300 group-hover:scale-105 dark:bg-[#C9A84C] dark:text-zinc-950 dark:shadow-[#C9A84C]/15">
          <Icon className="h-5 w-5" />
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-500 transition group-hover:border-[#C8102E]/25 group-hover:bg-[#C8102E] group-hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400 dark:group-hover:border-[#C9A84C] dark:group-hover:bg-[#C9A84C] dark:group-hover:text-zinc-950">
          {item.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        </span>
      </div>
      <h2 className="mt-7 text-2xl font-bold text-zinc-950 dark:text-zinc-50">{item.label}</h2>
      <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.description}</p>
    </motion.div>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className="block h-full" aria-label={`${item.label} portal (opens in a new tab)`}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className="block h-full">
      {content}
    </Link>
  );
}

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="luxury-section min-h-screen">
      <header className="relative z-30 border-b border-zinc-200/80 bg-white/80 shadow-sm shadow-zinc-950/5 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/78 dark:shadow-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="https://bis-tabuk.vercel.app/" className="group flex min-w-0 items-center gap-3" aria-label="International School home">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20 transition group-hover:-translate-y-0.5 dark:bg-[#C9A84C] dark:text-zinc-950 dark:shadow-[#C9A84C]/15">
              <School className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-base font-black text-zinc-950 dark:text-zinc-50">IS</strong>
              <span className="block truncate text-xs font-semibold text-zinc-500 dark:text-zinc-400">International School</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <AuthAction />
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="luxury-kicker text-xs font-black uppercase tracking-[0.18em]">IS Digital Hub</span>
          <h1 className="mt-7 text-4xl font-black leading-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
            Everything you need, in one place.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Choose your destination to access school information, admissions, teaching tools, or student learning resources.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {portalLinks.map((item) => <PortalCard key={item.label} item={item} />)}
        </motion.div>
      </section>

    </motion.main>
  );
}
