'use client';

import {  GraduationCap, Mail, Phone, ShieldCheck, ShieldUser, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
              +966 (14) 4411088 x 83103
        </a>
        <a href="mailto:admissions@bis-jeddah.com" className="inline-flex items-center gap-1.5 truncate text-white/80 hover:text-[#C9A84C] transition-colors">
          <Mail className="h-3 w-3" />
          admin@bis-tabuk.org
        </a>
      </div>

        <div className="hidden md:flex items-center gap-3 text-white/70">
          {/* <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" /> */}
          <Link href={'/student'} className="hover:text-[#C9A84C] flex items-center gap-1 transition-colors">
          <User size={15} />
          Student Portal </Link>
          <span className="text-white/25">/</span>
          <Link href={'https://isksafh.vercel.app/'} className="hover:text-[#C9A84C] flex items-center gap-1 transition-colors">
          <GraduationCap size={15} />
          Teacher Portal</Link>
          <span className="text-white/25">/</span>
          <Link href={'/admin'} className="hover:text-[#C9A84C] flex items-center gap-1 transition-colors">
          <ShieldUser size={15} />
          Admin</Link>
        </div>
      </div>
    </motion.div>
  );
}
