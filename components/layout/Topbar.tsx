'use client';

import Link from 'next/link';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Topbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-[#11163c] px-4 py-2.5 text-[11px] text-white dark:border-b dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
          <a href="tel:+966126656700" className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-[#C9A84C]">
            <Phone className="h-3 w-3" />
            +966 12 665 6700
          </a>
          <a href="mailto:admissions@bis-tabuk.com" className="inline-flex items-center gap-1.5 truncate text-white/80 transition-colors hover:text-[#C9A84C]">
            <Mail className="h-3 w-3" />
            admissions@bis-tabuk.com
          </a>
        </div>

        <div className="hidden items-center gap-3 text-white/70 md:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" />
          <Link href="/student" className="transition-colors hover:text-[#C9A84C]">
            Student Portal
          </Link>
          <span className="text-white/25">/</span>
          <Link href="/apply" className="transition-colors hover:text-[#C9A84C]">
            Parent Portal
          </Link>
          <span className="text-white/25">/</span>
          <a href="https://isksafh.vercel.app/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#C9A84C]">
            Staff
          </a>
        </div>
      </div>
    </motion.div>
  );
}
