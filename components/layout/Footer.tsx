'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '../ui/Motion';

const schoolLinks = [
  { label: 'About BIST', href: '/welcome-to-bist' },
  { label: 'Leadership Team', href: '/leadership-teams' },
  { label: 'Handbook', href: '/handbook' },
  { label: 'Privacy Policy', href: '/policies/privacy-policy.pdf', target: '_blank' },
  { label: 'Terms of Use', href: '/policies/terms-of-use.pdf', target: '_blank' },
];

const learningLinks = [
  { label: 'Reception', href: '/primary/reception' },
  { label: 'Primary', href: '/primary/about-bist-primary-section' },
  { label: 'IGCSE', href: '/secondary/years-10-11-igcse' },
  { label: 'A Levels', href: '/secondary/a-levels' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f1434] text-white dark:bg-zinc-950">
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#C8102E]/12 blur-3xl dark:bg-[#C9A84C]/10" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <Reveal className="relative mx-auto max-w-7xl px-6 pb-8 pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex w-fit items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/15">
                <Image src="/international-school-logo.jpeg" alt="International Leaders Education Foundation logo" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-[#C9A84C]" />
              </span>
              <span>
                <strong className="block text-xl leading-tight">International Leaders Education Foundation</strong>
                <span className="block text-sm font-bold tracking-widest text-[#C9A84C]">BRITISH INTERNATIONAL SCHOOL OF TABUK</span>
              </span>
            </Link>
            <p className="max-w-md leading-relaxed text-white/70">
              An outstanding international school in Tabuk, Saudi Arabia. Educating young people aged 4-18 with a rigorous British-style curriculum and global outlook.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">School</h4>
            <ul className="space-y-3 text-white/70">
              {schoolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} target={link.target} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Learning</h4>
            <ul className="space-y-3 text-white/70">
              {learningLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Contact</h4>
            <p className="flex gap-3 text-sm leading-relaxed text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A84C]" />
              <span>Tabuk, Kingdom of Saudi Arabia</span>
            </p>
            <a href="tel:+966144411088,,83103" className="mt-4 flex gap-3 text-white/70 transition-colors hover:text-white">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A84C]" />
              (00966) (01) 4 4411088 x 83103
            </a>
            <a href="mailto:admin@ist-ksa.org" className="mt-3 flex gap-3 text-white/70 transition-colors hover:text-white">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A84C]" />
              admin@ist-ksa.org
            </a>
          </div>
        </div>
      </Reveal>

      <div className="relative border-t border-white/10 py-6 text-center text-xs text-white/40">
        @ 2026 International Leaders Education Foundation
      </div>
    </footer>
  );
}
