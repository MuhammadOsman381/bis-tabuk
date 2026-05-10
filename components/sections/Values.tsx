'use client';

import { ArrowRight, Globe2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, MotionCard, Reveal, staggerContainer } from '../ui/Motion';

const values = [
  {
    title: "A Global Mindset",
    desc: "Our international community of over 60 nationalities creates a unique environment where students develop global perspectives and intercultural understanding.",
    icon: Globe2,
    color: "#3b82f6",
    img: "https://picsum.photos/id/48/600/400"
  },
  {
    title: "Safe & Supportive",
    desc: "Every child deserves to feel safe, valued and supported. Our pastoral care system and inclusive ethos ensure every student can flourish.",
    icon: ShieldCheck,
    color: "#10b981",
    img: "https://picsum.photos/id/96/600/400"
  },
  {
    title: "Beyond the Classroom",
    desc: "From elite sports academies to performing arts, outdoor education and over 100 extra-curricular activities — we help students discover their passions.",
    icon: Sparkles,
    color: "#C8102E",
    img: "https://picsum.photos/id/37/600/400"
  },
];

export default function Values() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-14 sm:mb-16">
          <span className="text-[#C8102E] font-bold text-sm tracking-[3px] uppercase">Our Curriculum</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1F4B] mt-3 dark:text-zinc-50">
            A Global Curriculum, <span className="gradient-text">Locally Rooted</span>
          </h2>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-8 dark:text-zinc-400">
            The British National Curriculum enhanced for an international context — blending academic rigour, creative thinking, and cultural awareness.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {values.map((value) => {
            const Icon = value.icon;

            return (
            <MotionCard key={value.title} className="premium-card group overflow-hidden rounded-2xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={value.img} 
                  alt={value.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div 
                  className="absolute bottom-6 left-6 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: value.color }}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-[#1A1F4B] mb-4 dark:text-zinc-50">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed dark:text-zinc-400">{value.desc}</p>
                
                <a href="#" className="mt-8 inline-flex items-center gap-2 text-[#C8102E] font-bold transition-all hover:translate-x-1 dark:text-[#f07185] dark:hover:text-[#C9A84C]">
                  Learn more <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </MotionCard>
            );
          })}
        </motion.div>

        {/* Accreditations */}
        <Reveal className="mt-20 pt-12 border-t border-gray-100 text-center dark:border-white/10">
          <p className="text-xs font-bold tracking-[3px] uppercase text-gray-400 mb-6 dark:text-zinc-500">Accredited & Recognised By</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[#1A1F4B]/45 font-bold text-sm dark:text-zinc-500">
            <span>Cambridge Assessment</span>
            <span>IBO</span>
            <span>BSO</span>
            <span>COBIS</span>
            <span>BSME</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
