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
