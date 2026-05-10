'use client';

import { ArrowDown, ArrowRight, Book, Globe, User } from 'lucide-react';
import Button from '../ui/Button';
import { motion } from '../ui/Motion';

const badges = [
  { label: 'Learning', icon: Book, className: 'bg-[#C8102E]' },
  { label: 'Leading', icon: Globe, className: 'bg-[#5B2C8D] dark:bg-zinc-800 dark:ring-1 dark:ring-white/10' },
  { label: 'Living', icon: User, className: 'bg-[#1A1F4B] dark:bg-zinc-900 dark:ring-1 dark:ring-white/10' },
];

const stats = [
  { value: '1,300+', label: 'Students' },
  { value: '60+', label: 'Nationalities' },
  { value: '50', label: 'Years of Excellence' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-104px)] overflow-hidden text-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ 
          backgroundImage: "url('https://picsum.photos/id/1015/1920/1080')" 
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/92 via-[#1A1F4B]/82 to-[#C8102E]/55 dark:from-zinc-950/94 dark:via-zinc-900/86 dark:to-[#C8102E]/48" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FFF8F0] to-transparent dark:from-zinc-950" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-104px)] max-w-5xl flex-col items-center justify-center px-4 py-20 sm:px-6"
      >
        {/* Badges */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          {badges.map(({ label, icon: Icon, className }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className={`${className} flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold tracking-widest text-white shadow-lg shadow-black/10`}
            >
              <Icon size={13} />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <h1 className="text-5xl font-black leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Welcome to <span className="text-[#C9A84C] block">BIST</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/88 md:text-xl">
          Learning to live, learn and lead — an outstanding international school 
          with a global vision, educating young people aged 2–18 in the heart of Tabuk.
        </p>

        <p className="mt-5 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-[#f6d974] backdrop-blur-md sm:text-sm">
          Nearly 50 Years of Exceptional Education in Saudi Arabia
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="#admissions" variant="primary">Apply Now <ArrowRight className="h-4 w-4" /></Button>
          <Button href="#about" variant="outline">Learn More</Button>
          <Button href="#stages" variant="ghost">Explore Our School</Button>
        </div>

        {/* Stats */}
        <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-3 text-white sm:grid-cols-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/12 bg-white/10 px-6 py-5 backdrop-blur-md"
            >
              <div className="text-3xl font-bold text-[#C9A84C] md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/72">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-xs tracking-widest text-white/60"
      >
        SCROLL
        <ArrowDown className="mt-1 h-5 w-5" />
      </motion.div>
    </section>
  );
}
