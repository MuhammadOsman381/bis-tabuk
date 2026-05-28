'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion, Reveal, staggerContainer } from '../ui/Motion';

const lifeActivities = [
  {
    title: "Sports & Athletics",
    desc: "World-class facilities for swimming, football, basketball, tennis and more.",
    tag: "Physical Education",
    img: "https://picsum.photos/id/1062/800/600",
    big: true
  },
  {
    title: "Outdoor Education",
    desc: "Duke of Edinburgh, adventure camps and environmental learning.",
    tag: "Experiential Learning",
    img: "https://picsum.photos/id/29/600/400"
  },
  {
    title: "Performing Arts",
    desc: "Drama, music, dance — from school productions to international festivals.",
    tag: "Creative Arts",
    img: "https://picsum.photos/id/342/600/400"
  },
  {
    title: "Student Council",
    desc: "Student voice at the heart of our community.",
    tag: "Leadership",
    img: "https://picsum.photos/id/1072/600/400"
  },
  {
    title: "Extra-Curricular",
    desc: "Over 100 clubs covering robotics, coding, debate, chess and more.",
    tag: "100+ Clubs",
    img: "https://picsum.photos/id/1078/600/400"
  },
  {
    title: "House System",
    desc: "Four houses, one community — belonging and healthy competition.",
    tag: "Community",
    img: "https://picsum.photos/id/1076/600/400"
  },
];

export default function SchoolLife() {
  return (
    <section id="school-life" className="relative overflow-hidden bg-[#0f1434] py-20 text-white dark:bg-zinc-950 sm:py-28">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#C8102E]/16 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-14 sm:mb-16">
          <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold tracking-[3px] text-[#C9A84C] uppercase backdrop-blur-xl">Life at BIST</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">School Life & <span className="text-[#C9A84C]">Enrichment</span></h2>
          <p className="mt-6 text-white/70 max-w-xl mx-auto leading-7">
            Education at BIST extends far beyond the classroom. We develop the whole person through extraordinary co-curricular experiences.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]"
        >
          {lifeActivities.map((item) => (
            <motion.a
              href="#"
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 250, damping: 23 }}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl shadow-black/20 outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/25 ${item.big ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes={item.big ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/34 to-transparent" />
              
              <div className="absolute top-4 left-4 bg-[#C8102E]/90 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                {item.tag}
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group-hover:bg-white group-hover:text-[#1A1F4B]">
                <ArrowUpRight className="h-4 w-4" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <h3 className="text-2xl font-bold mb-2 leading-tight">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <Reveal className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-3 border border-[#C9A84C]/80 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1F4B] font-bold px-8 py-3.5 rounded-full transition-all"
          >
            Explore All Activities <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
