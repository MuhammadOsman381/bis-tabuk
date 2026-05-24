'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Motion';

const paragraphs = [
  'A very warm welcome to the British International School Tabuk, an oasis of learning on the shores of the Red Sea. We are a not-for-profit, co-educational school, proudly providing excellence in learning since 1977 for the community here in Tabuk. We place a strong emphasis on holistic education, with a proven track record of high academic outcomes.',
  'Wellbeing threads through all we do, ensuring that students are happy, supporting them to flourish in their academic and co-curricular endeavours. We are a vibrant community of over 60 nationalities leveraging from this diversity to enrich the learning for our students. Whilst we celebrate our differences, we collaborate together towards common goals. The shared values of fairness, respect, kindness, compassion and empathy underpin our work.',
  'Our school environment fosters high-standards with students encouraged to be the very best they can be. BIST students achieve academic excellence, with outcomes exceeding their peers in other similar schools. Learning at BIST is supported by three pillars: Learning to Learn, Learning to Lead, and Learning to Live. As part of this holistic approach, students participate in trips, activities and service opportunities, alongside their academic studies. We support them to reflect, improve and challenge themselves.',
  'We follow the UK early learning goals for our youngest students and broadly follow the English national curriculum for students in Years 1-9, adapting this for our local and international context. Students in Years 10 and 11 follow a two year IGCSE programme of study, and our oldest students complete the rigorous two year International Baccalaureate Diploma programme. Upon leaving BIST students are equipped to both access and succeed at top universities across the world.',
  "Home-school partnerships are vital for students' success and we work closely with our families to achieve this. This sense of partnership and community is a real strength of our school with a high number of alumni choosing BIST as the educational home for their children.",
];

export default function DirectorsWelcomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-center">
              <p className="luxury-kicker text-xs font-bold uppercase tracking-[0.24em]">About BIST</p>
              <h1 className="mt-6 text-4xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">
                Director&apos;s Welcome
              </h1>
              <div
                className="mx-auto mt-10 min-h-80 max-w-3xl rounded-3xl bg-cover bg-center shadow-[0_18px_48px_rgba(26,31,75,0.14),inset_0_1px_0_rgba(255,255,255,0.24)] ring-1 ring-zinc-200 dark:ring-white/10"
                style={{ backgroundImage: "url('https://picsum.photos/id/1027/1200/700')" }}
                aria-label="Director welcome campus image"
              />
            </Reveal>

            <Reveal className="mt-14 space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="font-bold text-[#1A1F4B] dark:text-zinc-100">
                Learning at BIST is supported by three pillars: Learning to Learn, Learning to Lead, and Learning to Live.
              </p>
            </Reveal>

            <Reveal className="mt-14 border-t border-zinc-200 pt-10 text-left dark:border-white/10">
              <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">Sincerely</p>
              <p className="mt-5 text-2xl font-black text-[#1A1F4B] dark:text-zinc-50">Helen Olds</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-[#C8102E] dark:text-[#ff8fa0]">
                Director, British International School Tabuk (BIST)
              </p>
            </Reveal>

            <Reveal className="mt-14 border-t border-zinc-200 pt-10 text-left dark:border-white/10">
              <div className="space-y-3 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                <p>
                  To book a tour of our school, please contact:{' '}
                  <a className="font-semibold text-[#C8102E] underline decoration-[#C8102E]/30 underline-offset-4 dark:text-[#ff8fa0]" href="mailto:Registrar@conti.sch.sa">
                    Registrar@conti.sch.sa
                  </a>
                </p>
                <p>
                  To contact me directly, please email:{' '}
                  <a className="font-semibold text-[#C8102E] underline decoration-[#C8102E]/30 underline-offset-4 dark:text-[#ff8fa0]" href="mailto:Director@conti.sch.sa">
                    Director@conti.sch.sa
                  </a>
                </p>
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Register Online</h2>
                <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                  Click below to register your interest-we&apos;d love to hear from you!
                </p>
                <Link
                  href="/apply"
                  className="group relative isolate mt-8 inline-flex overflow-hidden rounded-full bg-[linear-gradient(135deg,#E11D48,#C8102E_45%,#7F1024)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_38px_rgba(200,16,46,0.26)] transition hover:-translate-y-0.5"
                >
                  <span className="absolute inset-y-0 -left-1/2 -z-10 w-1/3 rotate-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
                  Join Our School
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
