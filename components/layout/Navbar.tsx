'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { School } from 'lucide-react';
import AuthAction from '../ui/AuthAction';
import ThemeToggle from '../ui/ThemeToggle';

type NavbarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function Navbar({}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-[#C8102E]/10 bg-[#fffdfa]/94 px-4 py-3 shadow-[0_12px_34px_rgba(200,16,46,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/90 dark:shadow-[0_14px_42px_rgba(0,0,0,0.34),0_0_28px_rgba(201,168,76,0.07),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20 transition-transform duration-300 group-hover:scale-105 dark:bg-[#C9A84C] dark:text-zinc-950 dark:shadow-[#C9A84C]/15">
              <School className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <strong className="block text-base font-black leading-tight text-zinc-950 dark:text-zinc-50 sm:text-lg">BIST</strong>
              <span className="block max-w-52 truncate text-[10px] font-semibold leading-tight text-zinc-500 dark:text-zinc-400 sm:max-w-none sm:text-xs">British International School of Tabuk</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <AuthAction />
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
