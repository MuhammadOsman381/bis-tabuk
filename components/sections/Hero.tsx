'use client';

import Image from 'next/image';
import { ArrowDown, ArrowRight, Book, Globe, User } from 'lucide-react';
import Button from '../ui/Button';
import { motion } from '../ui/Motion';
const heroImage = "/images/landing-page/hero-img.JPG";

const badges = [
  { label: 'Learning', icon: Book, className: 'bg-[#C8102E]' },
  { label: 'Leading', icon: Globe, className: 'bg-[#5B2C8D] dark:bg-zinc-800 dark:ring-1 dark:ring-white/10' },
  { label: 'Living', icon: User, className: 'bg-[#1A1F4B] dark:bg-zinc-900 dark:ring-1 dark:ring-white/10' },
];

const stats = [
  { value: '500+', label: 'Students' },
  { value: '20+', label: 'Nationalities' },
  { value: '50', label: 'Years of Excellence' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-104px)] overflow-hidden text-center">
      <Image
        src={heroImage}
        alt="BIST campus and students"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 scale-105 object-cover"
      />
      
      {/* Overlay */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.72, 0.92, 0.72], scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C8102E]/25 blur-3xl"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/94 via-[#1A1F4B]/84 to-[#C8102E]/58 dark:from-zinc-950/95 dark:via-zinc-900/88 dark:to-[#C8102E]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:auto,72px_72px,72px_72px] opacity-60" />
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
              variants={{ hidden: { opacity: 0, y: 12, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
              whileHover={{ y: -2, scale: 1.035 }}
              className={`${className} flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-5 py-2 text-xs font-bold tracking-widest text-white shadow-lg shadow-black/10 backdrop-blur-xl`}
            >
              <Icon size={13} />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <h1 className="max-w-5xl text-5xl font-black leading-[0.95] text-white drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl lg:text-8xl">
          Welcome to <span className="text-[#C9A84C] block">International Leaders Education Foundation</span>
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-base  text-white/88 md:text-lg">
      
      International Leaders Education Foundation, formerly known as the British International School of Tabuk, is a non-profit educational institution. The school is registered with the Ministry of Education and accredited by Cambridge Assessment International Education to offer IGCSE and A Level programmes following the British curriculum.

      
        </p>

        <p className="mt-5 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-[#f6d974] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md sm:text-sm">
          Nearly 50 Years of Exceptional Education in Saudi Arabia
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/apply" variant="primary">Apply Now <ArrowRight className="h-4 w-4" /></Button>
          {/* <Button href="#about" variant="outline">Learn More</Button> */}
          <Button href="#school-life" variant="ghost">Explore Our School</Button>
        </div>

        {/* Stats */}
        <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-3 text-white sm:grid-cols-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="rounded-3xl border border-white/12 bg-white/10 px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_48px_rgba(0,0,0,0.16)] backdrop-blur-xl"
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
