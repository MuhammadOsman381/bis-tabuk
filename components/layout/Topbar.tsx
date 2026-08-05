'use client';

import { useState } from 'react';
import type { SVGProps } from 'react';
import Link from 'next/link';
import { Mail, Phone, ShieldCheck, X } from 'lucide-react';
import { motion } from 'framer-motion';
import MenuWordIcon from '@/components/ui/MenuWordIcon';

function TeacherTieIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="6" r="3" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      <path d="m10 13 2 2 2-2" />
      <path d="m12 15-1.5 5" />
      <path d="m12 15 1.5 5" />
      <path d="M9 21h6" />
    </svg>
  );
}

function StudentCapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 4 7l8 4 8-4-8-4Z" />
      <path d="M7 9v3c0 2.2 2.2 4 5 4s5-1.8 5-4V9" />
      <path d="M20 7v5" />
      <circle cx="12" cy="13" r="2" />
      <path d="M7 21a5 5 0 0 1 10 0" />
    </svg>
  );
}

function FamilyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="5.5" cy="9" r="2" />
      <circle cx="18.5" cy="9" r="2" />
      <path d="M8 21v-3a4 4 0 0 1 8 0v3" />
      <path d="M2.5 21v-2.2a3 3 0 0 1 4.1-2.8" />
      <path d="M21.5 21v-2.2a3 3 0 0 0-4.1-2.8" />
    </svg>
  );
}

const portalLinks = [
  { label: 'Teachers', href: 'https://isksafh.vercel.app', icon: TeacherTieIcon, isExternal: true },
  { label: 'Students', href: '/student', icon: StudentCapIcon },
  { label: 'Parents', href: '/apply', icon: FamilyIcon },
  { label: 'Admin', href: '/admin', icon: ShieldCheck },
];

export default function Topbar() {
  const [isPortalMenuOpen, setIsPortalMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative bg-[#11163c] px-4 py-2.5 text-[11px] text-white dark:border-b dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="mx-auto flex max-w-[140rem] items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
          <a href="tel:+966144411088,,83103" className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-[#C9A84C]">
            <Phone className="h-3 w-3" />
            (00966) (01) 4 4411088 x 83103
          </a>
          <a href="mailto:admin@ist-ksa.org" className="inline-flex items-center gap-1.5 truncate text-white/80 transition-colors hover:text-[#C9A84C]">
            <Mail className="h-3 w-3" />
            admin@ist-ksa.org
          </a>
        </div>

        <div className="hidden items-center gap-3 text-white/70 md:flex">
          {portalLinks.map(({ label, href, icon: Icon, isExternal }, index) => (
            <span key={href} className="inline-flex items-center gap-3">
              {index > 0 && <span className="text-white/25">/</span>}
              {isExternal ? (
                <a href={href} className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A84C]">
                  <Icon className="h-3.5 w-3.5 text-[#C9A84C]" />
                  {label}
                </a>
              ) : (
                <Link href={href} className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A84C]">
                  <Icon className="h-3.5 w-3.5 text-[#C9A84C]" />
                  {label}
                </Link>
              )}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsPortalMenuOpen((value) => !value)}
          aria-expanded={isPortalMenuOpen}
          aria-label={isPortalMenuOpen ? 'Close login menu' : 'Open login menu'}
          className="inline-flex h-8 w-12 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/8 text-white transition hover:border-[#C9A84C]/50 hover:text-[#C9A84C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/40 md:hidden"
        >
          {isPortalMenuOpen ? <X className="h-4 w-4" /> : <MenuWordIcon className="w-8" />}
        </button>
      </div>

      {isPortalMenuOpen && (
        <div className="absolute inset-x-4 top-full z-[80] mt-2 overflow-hidden rounded-2xl border border-white/12 bg-[#11163c] p-2 shadow-2xl shadow-black/25 md:hidden">
          {portalLinks.map(({ label, href, icon: Icon, isExternal }) =>
            isExternal ? (
              <a
                key={href}
                href={href}
                onClick={() => setIsPortalMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/82 transition hover:bg-white/8 hover:text-[#C9A84C]"
              >
                <Icon className="h-4 w-4 text-[#C9A84C]" />
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setIsPortalMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/82 transition hover:bg-white/8 hover:text-[#C9A84C]"
              >
                <Icon className="h-4 w-4 text-[#C9A84C]" />
                {label}
              </Link>
            ),
          )}
        </div>
      )}
    </motion.div>
  );
}
