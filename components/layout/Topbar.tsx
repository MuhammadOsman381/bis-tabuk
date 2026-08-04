'use client';

import Link from 'next/link';
import { Mail, Phone, ShieldCheck, UserCog, UsersRound } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Topbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-[#11163c] px-4 py-2.5 text-[11px] text-white dark:border-b dark:border-white/10 dark:bg-zinc-950"
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
          <Link href="/teacher" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A84C]">
            <UserCog className="h-3.5 w-3.5 text-[#C9A84C]" />
            Teachers
          </Link>
          <span className="text-white/25">/</span>
          <Link href="/apply" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A84C]">
            <UsersRound className="h-3.5 w-3.5 text-[#C9A84C]" />
            Parents
          </Link>
          <span className="text-white/25">/</span>
          <Link href="/admin" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C9A84C]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" />
            Admin
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
