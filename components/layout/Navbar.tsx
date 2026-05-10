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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-white/88 shadow-sm shadow-[#1A1F4B]/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/78 dark:shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15">
          <div className="w-11 h-11  rounded-full  flex items-center justify-center text-white font-bold text-sm relative shadow-lg bg-transparent ">
            <Image src={img} alt="" className='shadow-[#1A1F4B]/20'  />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C9A84C] rounded-full border-2 border-white dark:border-zinc-950" />
          </div>
          <div className="min-w-0">
            <strong className="text-[#1A1F4B] text-base sm:text-lg leading-tight block dark:text-zinc-50">British International</strong>
            <span className="text-[#C8102E] text-[11px] sm:text-xs font-bold tracking-widest">SCHOOL OF TABUK</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="px-3.5 py-2 text-sm font-semibold text-[#1A1F4B]/80 hover:text-[#C8102E] rounded-full hover:bg-[#C8102E]/7 transition-all dark:text-zinc-300 dark:hover:bg-white/7 dark:hover:text-[#C9A84C]"
            >
              {item.label}
            </Link>
          ))}

          <ThemeToggle />

          <Link 
            href="#admissions" 
            className="ml-2 bg-[#C8102E] text-white px-5 py-3 rounded-full font-bold text-sm shadow-lg shadow-[#C8102E]/20 hover:bg-[#9B0D23] hover:-translate-y-0.5 transition-all dark:shadow-[#C8102E]/30 dark:hover:shadow-[#C8102E]/40"
          >
            Apply Now
          </Link>
        </div>

        <div className="hidden items-center gap-3 max-lg:flex">
          <ThemeToggle />

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-[#1A1F4B] shadow-sm transition hover:bg-[#FFF8F0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15 dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-white/10"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="px-4 py-4 flex flex-col gap-2 text-base">
              {navItems.filter((item, index, array) => array.findIndex((candidate) => candidate.label === item.label) === index).map((item) => (
                <Link
                  key={`mobile-${item.label}`}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 font-semibold text-[#1A1F4B] hover:bg-[#FFF8F0] hover:text-[#C8102E] transition dark:text-zinc-200 dark:hover:bg-white/7 dark:hover:text-[#C9A84C]"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="#admissions" onClick={() => setIsOpen(false)} className="mt-2 bg-[#C8102E] text-white py-3 rounded-full text-center font-bold shadow-lg shadow-[#C8102E]/20 dark:shadow-[#C8102E]/30">Apply Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
