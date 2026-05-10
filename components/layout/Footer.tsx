'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '../ui/Motion';
import img from "../../app/Logo.png"
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#11163c] text-white dark:bg-zinc-950">
      <Reveal className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl border-none flex items-center justify-center text-white font-bold text-sm relative shadow-lg shadow-black/15 dark:from-[#C8102E] dark:via-zinc-800 dark:to-zinc-950 dark:ring-1 dark:ring-white/10">
            <Image src={img} alt="" className='shadow-[#1A1F4B]/20'  />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C9A84C] rounded-full border-2 border-white" />
              </div>
              <div>
                <strong className="text-xl">British International</strong>
                <p className="text-[#C8102E] text-sm font-bold tracking-widest">SCHOOL OF TABUK</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              An outstanding international school in Jeddah, Saudi Arabia. Educating young people aged 2–18 with the British National Curriculum and IB Diploma since 1977.
            </p>
          </div>

          <div>
            <h4 className="text-[#C9A84C] uppercase text-xs font-bold tracking-widest mb-6">School</h4>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">About BIST</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leadership Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accreditations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#C9A84C] uppercase text-xs font-bold tracking-widest mb-6">Learning</h4>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Early Years</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Primary</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IGCSE</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IB Diploma</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#C9A84C] uppercase text-xs font-bold tracking-widest mb-6">Contact</h4>
            <p className="flex gap-3 text-white/70 text-sm leading-relaxed">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A84C]" />
              <span>Corniche Al Hamra District<br />Tabuk 23521, Saudi Arabia</span>
            </p>
            <a href="tel:+966126656700" className="mt-4 flex gap-3 text-white/70 hover:text-white transition-colors">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A84C]" />
              +966 12 665 6700
            </a>
            <a href="mailto:admissions@bis-tabuk.com" className="mt-3 flex gap-3 text-white/70 hover:text-white transition-colors">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A84C]" />
              admissions@bis-tabuk.com
            </a>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © 2025 The British International School of Tabuk. All rights reserved.
      </div>
    </footer>
  );
}
