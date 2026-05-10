'use client';

import {
  ArrowRight,
  CalendarDays,
  Eye,
  MessageCircle,
  Heart,
  Trophy,
  Globe,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { motion, Reveal, staggerContainer } from '../ui/Motion';

const featuredNews = {
  title: 'BIST Students Excel in Cambridge IGCSE Examinations',
  excerpt:
    'We are thrilled to share that our Year 11 cohort has delivered outstanding results in the May IGCSE session, with over 85% of grades at A*–B.',
  date: 'May 6, 2025',
  category: 'Academic',
  image: 'https://picsum.photos/id/1082/800/500',
  likes: 312,
  comments: 47,
};

const sideNews = [
  {
    title: 'BIST U16 Football Team Wins BSME Regional Championship',
    date: 'April 30, 2025',
    category: 'Sport',
    image: 'https://picsum.photos/id/169/300/200',
    icon: Trophy,
    color: 'emerald',
  },
  {
    title: 'Earth Day 2025: BIST Goes Green for a Day',
    date: 'April 24, 2025',
    category: 'Community',
    image: 'https://picsum.photos/id/145/300/200',
    icon: Globe,
    color: 'amber',
  },
  {
    title: 'Inspiring Talk by BIST Alumni on Her Journey to Oxford',
    date: 'April 18, 2025',
    category: 'Alumni',
    image: 'https://picsum.photos/id/180/300/200',
    icon: GraduationCap,
    color: 'purple',
  },
];

const categoryStyles = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-300/20',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/70 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-300/20',
  purple: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200/70 dark:bg-purple-400/10 dark:text-purple-300 dark:ring-purple-300/20',
};

const stats = [
  { value: '24', label: 'Stories this term' },
  { value: '8', label: 'Student highlights' },
  { value: '5', label: 'Community events' },
];

export default function News() {
  return (
    <section
      id="news"
      className="relative overflow-hidden bg-[#FFF8F0] py-20 sm:py-24 dark:bg-zinc-950"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8102E]/20 to-transparent" />
      <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl dark:bg-[#C9A84C]/8" />
      <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-[#C8102E]/8 blur-3xl dark:bg-[#C8102E]/14" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Reveal className="mb-12 grid gap-8 lg:mb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C8102E]/10 bg-white px-4 py-2 shadow-sm shadow-[#1A1F4B]/5 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-black/20">
              <Sparkles className="w-4 h-4 text-[#C8102E]" />
              <span className="text-[#C8102E] font-semibold text-xs tracking-[2px] uppercase dark:text-[#ff8fa0]">
                Latest News
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mt-5 text-[#1A1F4B] leading-tight dark:text-zinc-50">
              Together We Are{' '}
              <span className="text-[#C8102E]">BIST</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-zinc-400">
              A polished look at the achievements, events, and community moments shaping daily life across campus.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-black/5 bg-white/80 shadow-lg shadow-[#1A1F4B]/5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/70 dark:shadow-black/30">
              {stats.map((stat) => (
                <div key={stat.label} className="border-r border-gray-100 px-4 py-3 text-center last:border-r-0 dark:border-white/10">
                  <div className="text-xl font-bold text-[#1A1F4B] dark:text-zinc-50">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C8102E] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/20 transition-all hover:-translate-y-0.5 hover:bg-[#9B0D23] dark:shadow-[#C8102E]/30 dark:hover:shadow-[#C8102E]/40"
            >
              All News & Updates
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Featured Card */}
          <motion.article
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_18px_50px_rgba(26,31,75,0.08)] transition-shadow duration-500 hover:shadow-[0_24px_70px_rgba(26,31,75,0.12)] lg:col-span-3 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/30 dark:hover:shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
          >
            <div className="relative h-[320px] overflow-hidden sm:h-[420px]">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent" />

              {/* Badges */}
              <div className="absolute left-5 top-5 flex flex-wrap gap-3 sm:left-6 sm:top-6">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-[#1A1F4B] text-xs font-semibold px-4 py-2 rounded-full dark:bg-zinc-950/80 dark:text-zinc-100 dark:ring-1 dark:ring-white/10">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {featuredNews.category}
                </div>

                <div className="bg-[#C9A84C] text-[#1A1F4B] text-xs font-bold px-4 py-2 rounded-full">
                  Featured
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 p-6 text-white sm:p-8">
                <p className="inline-flex items-center gap-2 text-sm text-white/75">
                  <CalendarDays className="h-4 w-4" />
                  {featuredNews.date}
                </p>

                <h3 className="mt-3 max-w-2xl text-2xl font-bold leading-tight sm:text-4xl">
                  {featuredNews.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-gray-600 text-[15px] leading-relaxed dark:text-zinc-400">
                {featuredNews.excerpt}
              </p>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5 text-sm text-gray-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 dark:bg-white/7">
                    <Heart className="w-4 h-4" />
                    {featuredNews.likes}
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 dark:bg-white/7">
                    <MessageCircle className="w-4 h-4" />
                    {featuredNews.comments}
                  </div>

                  <div className="hidden items-center gap-2 rounded-full bg-gray-50 px-3 py-2 sm:flex dark:bg-white/7">
                    <Eye className="w-4 h-4" />
                    2.8k
                  </div>
                </div>

                <a
                  href="#"
                  className="group inline-flex items-center gap-2 font-semibold text-[#C8102E] dark:text-[#f07185] dark:hover:text-[#C9A84C]"
                >
                  View Post
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Side Cards */}
          <motion.div variants={staggerContainer} className="lg:col-span-2 flex flex-col gap-6">
            {sideNews.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_12px_34px_rgba(26,31,75,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(26,31,75,0.1)] sm:flex-row sm:gap-5 dark:border-white/10 dark:bg-zinc-900/86 dark:shadow-black/25 dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.36)]"
                >
                  {/* Image */}
                  <div className="relative h-44 rounded-2xl overflow-hidden flex-shrink-0 sm:h-36 sm:w-36">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col  justify-between flex-1 min-w-0 py-1">
                    <div className="space-x-2" >
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${categoryStyles[item.color as keyof typeof categoryStyles]}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {item.category}
                      </div>

                      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-zinc-500">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {item.date}
                      </p>

                      <h4 className="mt-2 text-[17px] font-bold leading-snug text-[#1A1F4B] transition-colors group-hover:text-[#C8102E] line-clamp-3 dark:text-zinc-50 dark:group-hover:text-[#f07185]">
                        {item.title}
                      </h4>
                    </div>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#C8102E] dark:text-[#f07185] dark:hover:text-[#C9A84C]"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
