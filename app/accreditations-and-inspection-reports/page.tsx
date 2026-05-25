'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Events from '@/components/sections/Events';
import { Reveal, staggerContainer } from '@/components/ui/Motion';

const accreditations = [
  {
    title: 'Council of International Schools (CIS) and New England Association of Schools and Colleges (NEASC)',
    body: 'Accreditation confirms that BIST meets recognised global and US educational standards, supporting a balanced and academically strong education.',
  },
  {
    title: 'International Baccalaureate (IB)',
    body: 'BIST is an authorised IB World School, offering internationally recognised IB programmes that focus on critical thinking and inquiry-based learning.',
  },
  {
    title: 'Cambridge International Examinations',
    body: 'BIST is a registered Cambridge centre, offering globally recognised IGCSE qualifications.',
  },
  {
    title: 'British Schools in the Middle East (BSME)',
    body: 'Membership connects BIST with leading British international schools, supporting collaboration, competitions, and professional development.',
  },
  {
    title: 'Council of British International Schools (COBIS)',
    body: 'BIST is an Accredited Member of COBIS, reflecting strong governance, safeguarding, and British educational practice.',
  },
  {
    title: 'HMC International Membership',
    body: 'BIST is welcomed into HMC International, strengthening global leadership links and academic networks.',
  },
  {
    title: 'British School Overseas (BSO)',
    body: 'BIST was inspected by Education Development Trust, approved by the UK Department for Education. The inspection confirmed Good overall quality of education, with Outstanding leadership and management and Outstanding welfare, health and safety.',
    link: 'Link to BIST BSO Report 2025',
  },
  {
    title: 'Saudi Ministry of Education',
    body: 'BIST is fully licensed, ensuring compliance with national regulations.',
  },
];

export default function AccreditationsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="relative min-h-[52vh] overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/inspection/first.JPG')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/90 via-[#1A1F4B]/78 to-[#C8102E]/48 dark:from-zinc-950/94 dark:via-zinc-900/84 dark:to-[#C8102E]/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%)]" />

          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl"
            >
              Quality Assurance
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              Accreditations and Inspection Reports
            </motion.h1>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                The British International School of Tabuk (BIST) holds several prestigious accreditations and
                affiliations, underscoring its commitment to providing a high-quality international education.
              </p>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-white/10 dark:border-white/10"
            >
              {accreditations.map((item) => (
                <motion.section
                  key={item.title}
                  variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="py-8 text-left"
                >
                  <h2 className="text-2xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50">{item.title}</h2>
                  <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">{item.body}</p>
                  {item.link && (
                    <a
                      href="#"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#C8102E]/15 px-4 py-2 text-sm font-bold text-[#C8102E] transition hover:bg-[#C8102E]/8 dark:border-white/10 dark:text-[#ff8fa0]"
                    >
                      <FileText className="h-4 w-4" />
                      {item.link}
                    </a>
                  )}
                </motion.section>
              ))}
            </motion.div>
          </div>
        </section>

        <Events />

        <Footer />
      </div>
    </motion.main>
  );
}
