'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion, Reveal, staggerContainer } from '../ui/Motion';

const lifeActivities = [
  {
    title: "Sports & Athletics",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Physical Education",
    img: "data:image/jpeg;base64,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", 
    big: true
  },
  {
    title: "Outdoor Education",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Experiential Learning",
    img: "https://picsum.photos/id/29/600/400"
  },
  {
    title: "Performing Arts",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Creative Arts",
    img: "https://picsum.photos/id/342/600/400"
  },
  {
    title: "Student Council",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "Leadership",
    img: "https://picsum.photos/id/1072/600/400"
  },
  {
    title: "Extra-Curricular",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tag: "100+ Clubs",
    img: "https://picsum.photos/id/1078/600/400"
  },
  {
    title: "House System",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
