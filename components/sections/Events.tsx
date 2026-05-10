'use client';

import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { motion, MotionCard, Reveal, staggerContainer } from '../ui/Motion';

const events = [
  {
    day: "15",
    month: "May",
    year: "2025",
    title: "Primary Sports Day 2025",
    desc: "Annual celebration of athletic achievement for Key Stage 1 & 2 students.",
    time: "8:00 AM – 12:00 PM",
    location: "BISJ Sports Field",
    category: "Primary",
    color: "#10b981"
  },
  {
    day: "22",
    month: "May",
    year: "2025",
    title: "Secondary Drama Production",
    desc: "KS3 & KS4 students present this year's spectacular production.",
    time: "6:30 PM – 9:00 PM",
    location: "BISJ Performing Arts Centre",
    category: "Secondary",
    color: "#5B2C8D"
  },
  {
    day: "28",
    month: "May",
    year: "2025",
    title: "IB Diploma Results Celebration",
    desc: "Celebration event for our Class of 2025 IB graduates.",
    time: "10:00 AM – 1:00 PM",
    location: "Main Assembly Hall",
    category: "IB",
    color: "#C8102E"
  },
  {
    day: "04",
    month: "Jun",
    year: "2025",
    title: "Open Day – Prospective Families",
    desc: "Explore our campus and discover why BISJ is the right choice.",
    time: "9:00 AM – 1:00 PM",
    location: "Main Campus, Jeddah",
    category: "Admissions",
    color: "#C9A84C"
  },
];

export default function Events() {
  return (
    <section id="events" className="py-20 sm:py-24 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-end mb-12">
          <div>
            <span className="text-[#C8102E] font-bold text-sm tracking-[3px] uppercase">What&apos;s On</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-[#1A1F4B] dark:text-zinc-50">Upcoming Events</h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-[#C8102E] font-bold transition-all hover:translate-x-1 dark:text-[#f07185] dark:hover:text-[#C9A84C]">
            View Full Calendar <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {events.map((event) => (
            <MotionCard key={event.title} className="premium-card group overflow-hidden rounded-2xl">
              <div className="h-1.5" style={{ backgroundColor: event.color }} />
              
              <div className="p-6 sm:p-8">
                <div className="flex gap-5 sm:gap-6">
                  <div className="text-center flex-shrink-0">
                    <div className="bg-[#1A1F4B] text-white w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-[#1A1F4B]/15 dark:bg-zinc-950 dark:ring-1 dark:ring-white/10">
                      <div className="text-3xl font-bold">{event.day}</div>
                      <div className="text-xs -mt-1">{event.month}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 dark:text-zinc-500">{event.year}</div>
                  </div>

                  <div className="flex-1">
                    <span 
                      className="inline-block px-4 py-1 text-xs font-bold rounded-full mb-4"
                      style={{ backgroundColor: event.color + '20', color: event.color }}
                    >
                      {event.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#1A1F4B] group-hover:text-[#C8102E] transition-colors dark:text-zinc-50 dark:group-hover:text-[#f07185]">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mt-3 line-clamp-2 dark:text-zinc-400">{event.desc}</p>

                    <div className="mt-6 space-y-2 text-sm text-gray-500 dark:text-zinc-400">
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#C8102E] dark:text-[#f07185]" /> {event.time}</div>
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#C8102E] dark:text-[#f07185]" /> {event.location}</div>
                    </div>

                    <a href="#" className="mt-6 inline-flex items-center gap-2 text-[#C8102E] font-bold transition-all hover:translate-x-1 dark:text-[#f07185] dark:hover:text-[#C9A84C]">
                      Read More <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
