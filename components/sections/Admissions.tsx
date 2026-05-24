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

const fieldClass = 'focus-ring w-full rounded-2xl border border-gray-200 bg-white/88 px-5 py-4 text-[#1A1F4B] placeholder:text-gray-400 shadow-sm shadow-[#1A1F4B]/5 backdrop-blur transition hover:border-[#C8102E]/25 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

export default function Admissions() {
  return (
    <section id="admissions" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/id/1080/1920/800')" }}
      />
      <div className="absolute inset-0 bg-[#11163c]/90 dark:bg-zinc-950/92" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,0.16),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(200,16,46,0.18),transparent_30%)]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <Reveal className="text-white">
          <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold tracking-[3px] text-[#C9A84C] uppercase backdrop-blur-xl">Admissions 2025–26</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Begin Your <span className="text-[#C9A84C]">BIST Journey</span>
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
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/6 px-4 py-3 text-white/90 backdrop-blur-xl"
              >
                <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#C9A84C]/20">
                  <Check className="h-4 w-4 text-[#1A1F4B]" />
                </div>
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/apply" variant="primary" className="px-10">Apply Now <ArrowRight className="h-4 w-4" /></Button>
            <Button href="#" variant="outline" className="px-10">Book an Open Day</Button>
          </div>
        </Reveal>

        {/* Right - Enquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_26px_80px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-2xl sm:p-8 lg:p-10 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/40"
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

            <motion.button
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative isolate mt-4 w-full overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] py-4 text-lg font-bold text-white shadow-[0_18px_44px_rgba(200,16,46,0.28)] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/20 dark:shadow-[#C8102E]/30"
            >
              <span className="absolute inset-y-0 -left-1/2 -z-10 w-1/3 rotate-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
              Send Enquiry
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
