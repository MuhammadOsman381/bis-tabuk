'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import img from "../../app/Logo.png"
import Image from 'next/image';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = [
  { href: '#about', label: 'About Us' },
  { href: '#admissions', label: 'Admissions' },
  { href: '#stages', label: 'Primary' },
  { href: '#stages', label: 'Secondary' },
  { href: '#stages', label: 'IB' },
  { href: '#life', label: 'School Life' },
  { href: '#news', label: 'News' },
];

type NavbarProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-[#C8102E]/10 bg-[#fffdfa]/94 px-4 py-3 shadow-[0_12px_34px_rgba(200,16,46,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/90 dark:shadow-[0_14px_42px_rgba(0,0,0,0.34),0_0_28px_rgba(200,16,46,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6"
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}

      <div className="flex items-center justify-center">
          <Link href="/" className="group flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-transparent text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
            <Image src={img} alt="" className='shadow-[#1A1F4B]/20'  />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C9A84C] rounded-full border-2 border-white dark:border-zinc-950" />
          </div>
          <div className="min-w-0">
            <strong className="text-[#1A1F4B] text-base sm:text-lg leading-tight block dark:text-zinc-50">British International</strong>
            <span className="text-[#C8102E] text-[11px] sm:text-xs font-bold tracking-widest">SCHOOL OF TABUK</span>
          </div>
        </Link>
      </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
            className="mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C8102E]/10 bg-white/86 text-[#1A1F4B] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#FFF8F0] hover:text-[#C8102E] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15 dark:border-white/10 dark:bg-[#111113]/82 dark:text-zinc-100 dark:hover:bg-white/10 dark:hover:text-[#C9A84C]"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="group relative rounded-full px-3.5 py-2 text-sm font-semibold text-[#1A1F4B]/78 transition-all hover:bg-[#C8102E]/7 hover:text-[#C8102E] dark:text-zinc-300 dark:hover:bg-white/7 dark:hover:text-[#C9A84C]"
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 rounded-full bg-current opacity-60 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}

          <ThemeToggle />

          <Link 
            href="/apply" 
            className="ml-2 bg-[#C8102E] text-white px-5 py-3 rounded-full font-bold text-sm shadow-lg shadow-[#C8102E]/20 hover:bg-[#9B0D23] hover:-translate-y-0.5 transition-all dark:shadow-[#C8102E]/30 dark:hover:shadow-[#C8102E]/40"
          >
            Apply Now
          </Link>
        </div>

        <div className="hidden items-center gap-3 max-lg:flex">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C8102E]/10 bg-white/86 text-[#1A1F4B] shadow-sm transition hover:bg-[#FFF8F0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15 dark:border-white/10 dark:bg-[#111113]/82 dark:text-zinc-100 dark:hover:bg-white/10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden rounded-b-[1.5rem] border border-t-0 border-white/80 bg-[#fffdfa]/96 shadow-[0_18px_44px_rgba(200,16,46,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090b]/94 lg:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4 text-base">
              {navItems
                .filter((item, index, array) => array.findIndex((candidate) => candidate.label === item.label) === index)
                .map((item) => (
                  <Link
                    key={`mobile-${item.label}`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl px-4 py-3 font-semibold text-[#1A1F4B] transition hover:bg-[#FFF8F0] hover:text-[#C8102E] dark:text-zinc-200 dark:hover:bg-white/7 dark:hover:text-[#C9A84C]"
                  >
                    {item.label}
                  </Link>
                ))}
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-full bg-[#C8102E] py-3 text-center font-bold text-white shadow-lg shadow-[#C8102E]/20 dark:shadow-[#C8102E]/30"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
