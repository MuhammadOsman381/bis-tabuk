'use client';

import { ArrowRight } from 'lucide-react';
import { motion, MotionCard, Reveal, staggerContainer } from '../ui/Motion';

const stages = [
  {
    title: "Early Years",
    age: "Age 2–5",
    pupils: "280+",
    tagline: "A nurturing start to lifelong learning",
    desc: "Our EYFS provides a safe, stimulating environment where curiosity flourishes and confidence grows.",
    color: "#f59e0b",
    img: "https://picsum.photos/id/217/600/400"
  },
  {
    title: "Primary",
    age: "Age 5–11",
    pupils: "500+",
    tagline: "Building foundations for the future",
    desc: "An inspiring British curriculum delivered by expert teachers, fostering academic excellence.",
    color: "#10b981",
    img: "https://picsum.photos/id/20/600/400"
  },
  {
    title: "Key Stage 3",
    age: "Age 11–14",
    pupils: "300+",
    tagline: "Growing independent minds",
    desc: "A broad curriculum that challenges students intellectually while supporting personal development.",
    color: "#3b82f6",
    img: "https://picsum.photos/id/119/600/400"
  },
  {
    title: "IGCSE",
    age: "Age 14–16",
    pupils: "250+",
    tagline: "Internationally recognised qualifications",
    desc: "Cambridge IGCSE courses that open doors to the world's leading universities.",
    color: "#8b5cf6",
    img: "https://picsum.photos/id/160/600/400"
  },
  {
    title: "IB Diploma",
    age: "Age 16–18",
    pupils: "150+",
    tagline: "The pinnacle of international education",
    desc: "The globally acclaimed IB Diploma Programme, preparing students for world-class universities.",
    color: "#C8102E",
    img: "https://picsum.photos/id/26/600/400"
  },
];

export default function Stages() {
  return (
    <section id="stages" className="bg-[#FFF8F0] py-20 sm:py-24 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-14 sm:mb-16">
          <span className="text-[#C8102E] font-bold text-sm tracking-[3px] uppercase">Our School</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1F4B] mt-3 dark:text-zinc-50">With You Every Step</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-7 dark:text-zinc-400">
            From the earliest years to IB graduation, we walk alongside your child at every stage.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {stages.map((stage) => (
            <MotionCard key={stage.title} className="premium-card group overflow-hidden rounded-2xl">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={stage.img} 
                  alt={stage.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${stage.color}40, transparent)` }} />
                <span 
                  className="absolute top-4 left-4 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg"
                  style={{ background: stage.color }}
                >
                  {stage.age}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-[#1A1F4B] dark:text-zinc-50">{stage.title}</h3>
                <p className="text-[#C8102E] text-sm font-bold tracking-widest mt-1 dark:text-[#f07185]">{stage.tagline}</p>
                <p className="text-gray-600 mt-4 text-[15px] leading-relaxed dark:text-zinc-400">{stage.desc}</p>

                <div className="flex justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-zinc-500">Pupils</span>
                    <p className="font-bold text-[#1A1F4B] dark:text-zinc-100">{stage.pupils}</p>
                  </div>
                  <a href="#" className="text-[#C8102E] font-bold inline-flex items-center gap-2 transition-all hover:translate-x-1 dark:text-[#f07185] dark:hover:text-[#C9A84C]">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </MotionCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
