'use client';

import Link from 'next/link';
import type { ElementType } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Home,
  Mail,
  Menu,
  Newspaper,
  School,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

type SidebarItem = {
  label: string;
  href: string;
  icon: ElementType;
  children?: Array<string | { label: string; href: string }>;
};

const sidebarItems: SidebarItem[] = [
  { label: 'Home', href: '/', icon: Home },
  {
    label: 'About Us',
    href: '/welcome-to-bist',
    icon: School,
    children: [
      { label: 'Welcome to BIST', href: '/welcome-to-bist' },
      { label: 'Vision, Mission & Values', href: '/vision-mission-values' },
      { label: 'Leadership Teams', href: '/leadership-teams' },
      { label: 'Core Principles', href: '/core-principles' },
      { label: 'Academic Results', href: '/academic-results' },
      { label: 'Policies', href: '/privacy-policy' },
    ],
  },
  {
    label: 'Primary',
    href: '/primary/about-bist-primary-section',
    icon: GraduationCap,
    children: [
      { label: 'About BIST Primary Section', href: '/primary/about-bist-primary-section' },
      { label: 'Reception', href: '/primary/reception' },
      { label: 'Years 1-6', href: '/primary/years-1-6' },
    ],
  },
  {
    label: 'Secondary',
    href: '/secondary/about-bist-secondary-section',
    icon: GraduationCap,
    children: [
      { label: 'About BIST Secondary Section', href: '/secondary/about-bist-secondary-section' },
      { label: 'Years 7-9 (Key Stage Three)', href: '/secondary/years-7-9-key-stage-three' },
      { label: 'Years 10 & 11 (IGCSE)', href: '/secondary/years-10-11-igcse' },
      { label: 'A Levels', href: '/secondary/a-levels' },
      { label: 'Subjects', href: '/secondary/subjects' },
      { label: 'Learning Support (Secondary)', href: '/secondary/learning-support' },
    ],
  },
  {
    label: 'Beyond the Classroom',
    href: '/beyond-the-classroom/learning-beyond-the-classroom',
    icon: Sparkles,
    children: [
      { label: 'Learning Beyond the Classroom', href: '/beyond-the-classroom/learning-beyond-the-classroom' },
      { label: 'Sports and Athletics', href: '/beyond-the-classroom/sports-and-athletics' },
      { label: 'Outdoor Education', href: '/beyond-the-classroom/outdoor-education' },
      { label: "Duke of Edinburgh's Award", href: '/beyond-the-classroom/duke-of-edinburghs-award' },
      { label: 'Performing Arts', href: '/beyond-the-classroom/performing-arts' },
      { label: 'Co-Curricular Music', href: '/beyond-the-classroom/co-curricular-music' },
      { label: 'Model United Nations (MUN)', href: '/beyond-the-classroom/model-united-nations-mun' },
      { label: 'The Student Council', href: '/beyond-the-classroom/the-student-council' },
      { label: 'Our House System', href: '/beyond-the-classroom/our-house-system' },
      { label: 'Our Extra-Curricular Programme', href: '/beyond-the-classroom/our-extra-curricular-programme' },
      { label: 'Our Community', href: '/beyond-the-classroom/our-community' },
      { label: 'Uniform Shop', href: '/beyond-the-classroom/uniform-shop' },
      { label: 'Cafeteria', href: '/beyond-the-classroom/cafeteria' },
    ],
  },
  {
    label: 'Admissions',
    href: '/admissions/how-to-apply-to-bisj',
    icon: CalendarDays,
    children: [
      { label: 'How to apply to BIST', href: '/admissions/how-to-apply-to-bisj' },
      { label: 'School Fees', href: '/admissions/school-fees' },
      { label: 'Book a tour', href: '/admissions/book-a-tour' },
    ],
  },
  {
    label: 'News & Dates / Media',
    href: '/news-and-media/news',
    icon: Newspaper,
    children: [
      { label: 'News', href: '/news-and-media/news' },
      { label: 'Newsletters', href: '/news-and-media/newsletters' },
      { label: 'School Calendar', href: '/news-and-media/school-calendar' },
      { label: 'Term Dates', href: '/news-and-media/term-dates' },
    ],
  },
  {
    label: 'Alumni',
    href: '/alumni/bist-connect',
    icon: Users,
    children: [{ label: 'BIST-Network', href: '/alumni/bist-connect' }],
  },
  {
    label: 'Employment Opportunities',
    href: '/employment/why-work-at-bisj',
    icon: BriefcaseBusiness,
    children: [
      { label: 'Why Work at BIST', href: '/employment/why-work-at-bisj' },
      { label: 'Overseas Hire benefits', href: '/employment/overseas-hire-benefits' },
      { label: 'Local hires benefits', href: '/employment/local-hire-benefits' },
      { label: 'Apply', href: '/employment/local-hire-benefits/apply' },
      { label: 'About Tabuk', href: '/employment/about-tabuk' },
    ],
  },
  {
    label: 'Contact Us',
    href: '/contact/contact-us',
    icon: Mail,
    children: [
      { label: 'Contact Us', href: '/contact/contact-us' },
    ],
  },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  return (
    <div className="flex h-full min-h-0 flex-col">
      <nav className="sidebar-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-5 pr-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isOpen = openItems[item.label];
          const hasChildren = Boolean(item.children?.length);

          return (
            <div key={item.label}>
              <div className="flex items-center gap-2">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-[#C8102E]/8 hover:text-[#C8102E] hover:shadow-sm dark:text-zinc-300 dark:hover:bg-white/7 dark:hover:text-[#C9A84C]"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-zinc-400 transition group-hover:text-[#C8102E] dark:text-zinc-500 dark:group-hover:text-[#C9A84C]" />
                  <span className="truncate">{item.label}</span>
                </Link>

                {hasChildren && (
                  <button
                    type="button"
                    onClick={() => setOpenItems((current) => ({ ...current, [item.label]: !isOpen }))}
                    aria-label={`Toggle ${item.label} sublinks`}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-[#C8102E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15 dark:hover:bg-white/7 dark:hover:text-[#C9A84C]"
                  >
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                )}
              </div>

              <AnimatePresence initial={false}>
                {hasChildren && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 mt-1 border-l border-zinc-200 pl-3 dark:border-white/10">
                      {item.children?.map((child) => {
                        const childLabel = typeof child === 'string' ? child : child.label;
                        const childHref = typeof child === 'string' ? item.href : child.href;

                        return (
                          <Link
                            key={`${item.label}-${childLabel}`}
                            href={childHref}
                            onClick={onNavigate}
                            className="block rounded-xl px-3 py-2 text-xs font-medium leading-snug text-zinc-500 transition hover:bg-zinc-100 hover:text-[#C8102E] dark:text-zinc-500 dark:hover:bg-white/7 dark:hover:text-zinc-100"
                          >
                            {childLabel}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200/70 p-4 dark:border-white/10">
        <Link
          href="/apply"
          onClick={onNavigate}
          className="group relative isolate flex items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 dark:bg-[linear-gradient(135deg,#D8B95B,#C9A84C_45%,#8F7430)] dark:text-zinc-950 dark:shadow-[#C9A84C]/20"
        >
          <span className="absolute inset-y-0 -left-1/2 -z-10 w-1/3 rotate-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
          Apply Now
        </Link>
      </div>
    </div>
  );
}

type SidebarProps = {
  isDesktopOpen: boolean;
  onDesktopClose: () => void;
  showMobileTrigger?: boolean;
};

export default function Sidebar({ isDesktopOpen, onDesktopClose, showMobileTrigger = true }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.aside
        animate={{ x: isDesktopOpen ? 0 : '-100%' }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 left-0 z-[60] hidden w-80 border-r border-zinc-200/80 bg-white/90 shadow-2xl shadow-zinc-900/10 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/92 dark:shadow-black/40 lg:block"
      >
        <div className="h-full">
          <SidebarContent onNavigate={onDesktopClose} />
        </div>
      </motion.aside>

      {showMobileTrigger && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar navigation"
          className="fixed bottom-5 left-5 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-2xl shadow-[#C8102E]/25 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/20 dark:bg-[#C9A84C] dark:text-zinc-950 dark:shadow-[#C9A84C]/25 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close sidebar navigation"
              className="fixed inset-0 z-[80] bg-zinc-950/45 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-[90] w-[min(88vw,22rem)] border-r border-zinc-200/80 bg-white/94 shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/94 lg:hidden"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close sidebar navigation"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="h-full pt-12">
                <SidebarContent onNavigate={() => setIsOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
