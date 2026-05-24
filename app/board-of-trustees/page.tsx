'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const boardMembers = [
  {
    name: 'Olfat AlMutlaq-Juffali - Chairwoman',
    role: 'Chairwoman, Board of Trustees',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: [
      'Olfat AlMutlaq-Juffali, born and raised in Riyadh, Saudi Arabia, pursued her academic journey in the United States, where she earned a Bachelor’s degree in Economics from the American University in Washington D.C., followed by a Master’s degree in International Development.',
      'A dedicated philanthropist, Olfat focuses on advancing health and education. She serves on the boards of several esteemed organizations, including the Arab Thought Foundation, Effat University, and the Arab Fund for Arts & Culture.',
    ],
  },
  {
    name: 'Mrs Cecille El Beleidi - HM Consul General Tabuk',
    role: 'HM Consul General Tabuk',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: [
      'Mrs Cecille El Beleidi brings diplomatic leadership and deep community engagement to the Board of Trustees. Her work supports collaboration, international understanding, and strong links between BIST and the wider community.',
      'Her perspective helps reinforce the school’s global outlook and commitment to serving families from many nationalities and backgrounds.',
    ],
  },
  {
    name: 'Faisal Al Shawaf',
    role: 'Board Member',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    bio: [
      'Faisal Al Shawaf contributes strategic insight, professional experience, and a strong commitment to educational excellence. His work with the Board supports BIST’s continued growth as a forward-thinking international school.',
    ],
  },
  {
    name: 'Hisham El-Farouki',
    role: 'Board Member',
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    bio: [
      'Hisham El-Farouki brings broad professional expertise and a thoughtful approach to governance. He supports the Board’s responsibility to maintain high standards and guide the school’s long-term direction.',
    ],
  },
  {
    name: 'Sami Alhalabi',
    role: 'Board Member',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    bio: [
      'Sami Alhalabi works collaboratively with fellow trustees to strengthen the school community and support BIST’s mission of delivering a holistic education in a safe, inclusive environment.',
    ],
  },
  {
    name: 'Salman Alireza',
    role: 'Board Member',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: [
      'Salman Alireza contributes leadership, perspective, and commitment to the continued success of BIST. His role supports the Board’s focus on innovation, excellence, and responsible stewardship.',
    ],
  },
];

export default function BoardOfTrusteesPage() {
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
              <p className="luxury-kicker text-xs font-bold uppercase tracking-[0.24em]">Governance</p>
              <h1 className="mt-6 text-4xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">
                Board of Trustees
              </h1>
            </Reveal>

            <Reveal className="mt-12 space-y-6 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                The Board of Trustees at the British International School of Tabuk (BIST) is comprised of a dedicated
                group of professionals and community leaders who bring a wealth of experience and expertise to our school.
              </p>
              <p>
                Their vision, leadership, and commitment to the values of our institution help guide BIST toward its
                mission of providing an exceptional, holistic education for all students.
              </p>
            </Reveal>

            <Reveal className="mt-16 border-t border-zinc-200 pt-12 dark:border-white/10">
              <h2 className="text-left text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Our Board of Trustees</h2>
              <div className="mt-6 space-y-6 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                <p>
                  Each member of the Board plays an integral role in shaping the strategic direction of our school,
                  ensuring that we maintain the highest educational standards, uphold our values, and foster a supportive
                  and inclusive environment for our students, faculty, and staff.
                </p>
                <p>
                  Our Board members are deeply committed to the continued growth and success of BIST, and together, they
                  work collaboratively to ensure the school remains a dynamic, forward-thinking institution.
                </p>
                <p className="font-semibold text-[#1A1F4B] dark:text-zinc-100">
                  To contact the Board please email{' '}
                  <a className="text-[#C8102E] underline decoration-[#C8102E]/30 underline-offset-4 dark:text-[#ff8fa0]" href="mailto:BISTBoard@conti.sch.sa">
                    BISTBoard@conti.sch.sa
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-20 border-t border-zinc-200 pt-12 dark:border-white/10">
              <h2 className="text-left text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Meet our Board</h2>
              <p className="mt-6 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Here, you can get to know each of our distinguished Board Members. Click below to learn more about their
                professional backgrounds, areas of expertise, and their vision for the future of BIST.
              </p>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10"
            >
              {boardMembers.map((member) => (
                <motion.section
                  key={member.name}
                  variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="py-10 text-left"
                >
                  <div className="grid gap-6 sm:grid-cols-[9rem_1fr] sm:items-start">
                    <div
                      className="h-36 w-36 rounded-3xl bg-cover bg-center shadow-[0_18px_48px_rgba(26,31,75,0.14),inset_0_1px_0_rgba(255,255,255,0.24)] ring-1 ring-zinc-200 dark:ring-white/10"
                      style={{ backgroundImage: `url('${member.image}')` }}
                      aria-label={`${member.name} portrait`}
                    />
                    <div>
                      <h3 className="text-2xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50">{member.name}</h3>
                      <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#C8102E] dark:text-[#ff8fa0]">
                        {member.role}
                      </p>
                      <div className="mt-6 space-y-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                        {member.bio.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.section>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
