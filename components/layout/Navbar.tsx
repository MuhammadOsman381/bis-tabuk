'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import AuthAction from '../ui/AuthAction';
import ThemeToggle from '../ui/ThemeToggle';

type NavbarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-[#C8102E]/10 bg-[#fffdfa]/94 px-4 py-3 shadow-[0_12px_34px_rgba(200,16,46,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/90 dark:shadow-[0_14px_42px_rgba(0,0,0,0.34),0_0_28px_rgba(201,168,76,0.07),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label={isSidebarOpen ? 'Close sidebar navigation' : 'Open sidebar navigation'}
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C8102E]/10 bg-white/80 text-[#1A1F4B] shadow-sm shadow-[#1A1F4B]/5 transition hover:-translate-y-0.5 hover:border-[#C8102E]/20 hover:text-[#C8102E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:hover:border-[#C9A84C]/40 dark:hover:text-[#C9A84C] lg:inline-flex"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link href="https://bis-tabuk.vercel.app/" className="group flex min-w-0 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg shadow-[#1A1F4B]/12 ring-1 ring-[#C8102E]/10 transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:shadow-black/30 dark:ring-white/10">
                <Image
                  src="/international-school-logo.jpeg"
                  alt="International School logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  priority
                />
              </span>
              <span className="min-w-0">
                <strong className="block text-base font-black leading-tight text-zinc-950 dark:text-zinc-50 sm:text-lg">IS</strong>
                <span className="block max-w-52 truncate text-[10px] font-semibold leading-tight text-zinc-500 dark:text-zinc-400 sm:max-w-none sm:text-xs">International School</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <AuthAction />
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
