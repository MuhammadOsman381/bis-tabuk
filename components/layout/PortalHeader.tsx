'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import logo from '../../app/Logo.png';

export default function PortalHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute left-0 right-0 top-0 z-40"
    >
      <div className="border-b border-[#C8102E]/10 bg-[#fffdfa]/94 px-4 py-3 shadow-[0_12px_34px_rgba(200,16,46,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/90 dark:shadow-[0_14px_42px_rgba(0,0,0,0.34),0_0_28px_rgba(200,16,46,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/76 px-4 py-2.5 text-sm font-bold text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-[#C9A84C]/40 dark:hover:text-[#C9A84C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link href="/" className="hidden items-center gap-3 rounded-2xl sm:flex">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-transparent shadow-lg">
              <Image src={logo} alt="British International School of Tabuk logo" className="object-contain" />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-[#C9A84C] dark:border-zinc-950" />
            </div>
            <div className="">
            <strong className="text-[#C8102E] text-base sm:text-lg leading-tight block dark:text-zinc-50">British International</strong>
            <strong className="text-[#C8102E]  text-base sm:text-lg  block leading-tight dark:text-zinc-50">School of Tabuk</strong>
          </div>
          </Link>
        </div>

        <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
