'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="group relative inline-flex h-11 w-[4.25rem] items-center rounded-full border border-zinc-200/80 bg-white/80 p-1 shadow-sm shadow-slate-900/5 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C8102E]/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/15 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-black/30 dark:hover:shadow-[#C9A84C]/20 dark:focus-visible:ring-[#C9A84C]/20"
    >
      <Sun className="ml-1.5 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
      <Moon className="ml-auto mr-1.5 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
      <motion.span
        layout
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className="absolute left-1 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25 dark:bg-[#C9A84C] dark:text-zinc-950 dark:shadow-[#C9A84C]/20"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
