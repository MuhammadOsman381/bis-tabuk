'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, Phone, ShieldCheck, UsersRound, X } from 'lucide-react';
import { motion } from 'framer-motion';
import MenuWordIcon from '@/components/ui/MenuWordIcon';

const portalLinks = [
  { label: 'Teachers', href: 'https://isksafh.vercel.app', icon: GraduationCap, isExternal: true },
  { label: 'Parents', href: '/apply', icon: UsersRound },
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
