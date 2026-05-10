'use client';

import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Topbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-[#11163c] text-white text-[11px] px-4 py-2.5 dark:border-b dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
        <a href="tel:+966126656700" className="inline-flex items-center gap-1.5 text-white/80 hover:text-[#C9A84C] transition-colors">
          <Phone className="h-3 w-3" />
          +966 12 665 6700
        </a>
        <a href="mailto:admissions@bis-jeddah.com" className="inline-flex items-center gap-1.5 truncate text-white/80 hover:text-[#C9A84C] transition-colors">
          <Mail className="h-3 w-3" />
          admissions@bis-tabuk.com
        </a>
      </div>

        <div className="hidden md:flex items-center gap-3 text-white/70">
          <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" />
          <a href="#" className="hover:text-[#C9A84C] transition-colors">Student Portal</a>
          <span className="text-white/25">/</span>
          <a href="#" className="hover:text-[#C9A84C] transition-colors">Parent Portal</a>
          <span className="text-white/25">/</span>
          <a href="#" className="hover:text-[#C9A84C] transition-colors">Staff</a>
        </div>
      </div>
    </motion.div>
  );
}
