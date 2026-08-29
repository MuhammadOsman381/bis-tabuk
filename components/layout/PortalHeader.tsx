'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AuthAction from '../ui/AuthAction';
import ThemeToggle from '../ui/ThemeToggle';

export default function PortalHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute left-0 right-0 top-0 z-40"
    >
      <div className="border-b border-[#C8102E]/10 bg-[#fffdfa]/94 px-4 py-3 shadow-[0_12px_34px_rgba(200,16,46,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/90 dark:shadow-[0_14px_42px_rgba(0,0,0,0.34),0_0_28px_rgba(201,168,76,0.07),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 items-center">
          <Link href="https://bis-tabuk.vercel.app/" className="flex min-w-0 items-center gap-2 rounded-2xl sm:gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg shadow-[#1A1F4B]/12 ring-1 ring-[#C8102E]/10 dark:bg-white dark:shadow-black/30 dark:ring-white/10">
              <Image
                src="/international-school-logo.jpeg"
                alt="British International School of Tabuk logo"
                width={48}
                height={48}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <strong className="block text-base font-black leading-tight text-zinc-950 dark:text-zinc-50 sm:text-lg">BIST</strong>
              <span className="block max-w-52 truncate text-[10px] font-semibold leading-tight text-zinc-500 dark:text-zinc-400 sm:max-w-none sm:text-xs">British International School of Tabuk</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <AuthAction />
        </div>
        </div>
      </div>
    </motion.header>
  );
}
