'use client';

import { ArrowRight, Check, CalendarDays } from 'lucide-react';
import Button from '../ui/Button';
import { motion, Reveal } from '../ui/Motion';

const steps = [
  'Submit online enquiry form',
  'Receive welcome pack & tour booking',
  'Student assessment & interview',
  'Place offered & confirmed',
];

const fieldClass = 'focus-ring w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-[#1A1F4B] placeholder:text-gray-400 shadow-sm shadow-[#1A1F4B]/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

export default function Admissions() {
  return (
    <section id="admissions" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/id/1080/1920/800')" }}
      />
      <div className="absolute inset-0 bg-[#11163c]/88 dark:bg-zinc-950/90" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <Reveal className="text-white">
          <span className="text-[#C9A84C] font-bold text-sm tracking-[3px] uppercase">Admissions 2025–26</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Begin Your <span className="text-[#C9A84C]">BISJ Journey</span>
          </h2>
          <p className="mt-6 text-white/80 text-lg leading-relaxed max-w-lg">
            We warmly welcome applications from families of all nationalities. 
            Our admissions team is here to guide you every step of the way.
          </p>

          <ul className="mt-10 space-y-4">
            {steps.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="flex items-center gap-4 text-white/90"
              >
                <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#C9A84C]/20">
                  <Check className="h-4 w-4 text-[#1A1F4B]" />
                </div>
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="#" variant="primary" className="px-10">Apply Now <ArrowRight className="h-4 w-4" /></Button>
            <Button href="#" variant="outline" className="px-10">Book an Open Day</Button>
          </div>
        </Reveal>

        {/* Right - Enquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10 dark:border dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/40 dark:backdrop-blur-xl"
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#C8102E]/18 dark:text-[#ff8fa0] dark:shadow-lg dark:shadow-[#C8102E]/10">
            <CalendarDays className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-[#1A1F4B] dark:text-zinc-50">Request Information</h3>
          <p className="text-gray-500 mt-2 dark:text-zinc-400">Our admissions team will respond within 24 hours.</p>

          <form className="mt-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1F4B] mb-2 dark:text-zinc-300">Parent&apos;s Full Name</label>
              <input 
                type="text" 
                className={fieldClass}
                placeholder="e.g. Sarah Al-Rashidi"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1F4B] mb-2 dark:text-zinc-300">Email Address</label>
              <input 
                type="email" 
                className={fieldClass}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1F4B] mb-2 dark:text-zinc-300">Phone Number</label>
              <input 
                type="tel" 
                className={fieldClass}
                placeholder="+966 5XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1F4B] mb-2 dark:text-zinc-300">Year Group</label>
              <select className={fieldClass}>
                <option>Select year group…</option>
                <option>Early Years (Age 2–5)</option>
                <option>Year 1–6 (Primary)</option>
                <option>Year 7–9 (Key Stage 3)</option>
                <option>Year 10–11 (IGCSE)</option>
                <option>Year 12–13 (IB Diploma)</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#C8102E] hover:bg-[#9B0D23] text-white py-4 rounded-2xl font-bold text-lg transition-all mt-4 shadow-lg shadow-[#C8102E]/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/20 dark:shadow-[#C8102E]/30 dark:hover:shadow-[#C8102E]/40"
            >
              Send Enquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
