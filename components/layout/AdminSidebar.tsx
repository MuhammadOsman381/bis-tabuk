'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers3, LayoutDashboard, Sparkles } from 'lucide-react';

type AdminSidebarProps = {
  active?: 'dashboard' | 'teachers' | 'school-life' | 'classes';
};

const adminLinks = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  // {
  //   key: 'teachers',
  //   label: 'Teachers',
  //   href: '/admin/teachers',
  //   icon: UsersRound,
  // },
  {
    key: 'classes',
    label: 'Classes / Years',
    href: '/admin/classes',
    icon: Layers3,
  },
  {
    key: 'school-life',
    label: 'School Life',
    href: '/admin/school-life',
    icon: Sparkles,
  },
] as const;

export default function AdminSidebar({ active }: AdminSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="h-fit rounded-3xl border border-zinc-200/80 bg-white/90 p-4 shadow-xl shadow-zinc-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/30 lg:sticky lg:top-28"
    >
      <div className="px-3 pb-4">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8796B3] dark:text-zinc-500">Admin Portal</p>
        <h2 className="mt-2 text-lg font-black tracking-tight text-zinc-950 dark:text-zinc-50">BIST Control</h2>
      </div>

      <nav className="space-y-2" aria-label="Admin navigation">
        {adminLinks.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-black transition ${
                isActive
                  ? 'bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20 dark:bg-[#C9A84C] dark:text-zinc-950 dark:shadow-[#C9A84C]/15'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50'
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  isActive
                    ? 'bg-white/16 text-white dark:bg-zinc-950/12 dark:text-zinc-950'
                    : 'bg-zinc-100 text-zinc-500 group-hover:text-[#C8102E] dark:bg-white/[0.06] dark:text-zinc-400 dark:group-hover:text-[#C9A84C]'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
