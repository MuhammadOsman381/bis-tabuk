'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, FileText } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Motion';

const faqs = [
  {
    question: 'What ages does BIST accept?',
    answer: 'BIST welcomes students from ages 2-18, subject to availability, admissions requirements and year group placement.',
  },
  {
    question: 'How do I start an application?',
    answer: 'Families begin by completing the online application form and submitting the required documents for review.',
  },
  {
    question: 'What documents are required?',
    answer: 'Typical documents include passports, residence information where applicable, previous school reports, vaccination records and any relevant learning support information.',
  },
  {
    question: 'Is there an assessment?',
    answer: 'Students may be asked to complete an age-appropriate assessment or interview so the school can understand readiness and support needs.',
  },
  {
    question: 'How is the year group decided?',
    answer: 'Year group placement is based on age, previous schooling and the school’s placement guidance.',
  },
  {
    question: 'Can I apply from outside Saudi Arabia?',
    answer: 'Yes. International applications can be reviewed remotely, and the admissions team will advise families on next steps.',
  },
  {
    question: 'Is admission guaranteed after applying?',
    answer: 'Admission depends on availability, assessment outcomes, documentation and the school’s ability to meet the student’s needs.',
  },
  {
    question: 'Who can I contact for help?',
    answer: 'The admissions team can guide families through the process and answer questions about availability, documentation and tours.',
  },
];

export default function HowToApplyPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(faqs[0].question);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="relative min-h-[58vh] overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: "url('https://picsum.photos/id/1026/1920/980')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#10163d]/90 via-[#1A1F4B]/76 to-[#C8102E]/48 dark:from-zinc-950/94 dark:via-zinc-900/82 dark:to-[#C8102E]/42" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%)]" />

          <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#C9A84C] backdrop-blur-xl"
            >
              Admissions
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-black leading-tight drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              How to Apply to BIST
            </motion.h1>
          </div>
        </section>

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal className="space-y-7 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                The British International School of Tabuk warmly welcomes students from ages 2-18 to join our diverse,
                ambitious and caring international community.
              </p>
              <p>
                Our admissions team is here to guide families through each stage of the application process, from initial
                enquiry and year group placement to assessment, offer and enrolment.
              </p>
            </Reveal>

            <Reveal className="mt-14 grid gap-8 rounded-3xl border border-zinc-200/80 bg-white/75 p-7 shadow-[0_18px_55px_rgba(26,31,75,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] md:grid-cols-[1fr_18rem]">
              <div className="text-left">
                <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Find Your Child&apos;s Year Group</h2>
                <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                  Use the year group guidance to understand where your child may be placed before starting the application.
                </p>
                <Link
                  href="/apply"
                  className="group relative isolate mt-7 inline-flex overflow-hidden rounded-full border border-[#C8102E]/15 bg-white px-6 py-3 text-sm font-black text-[#C8102E] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#C8102E] hover:text-white dark:border-white/10 dark:bg-white/[0.05] dark:text-[#ff8fa0] dark:hover:bg-[#C9A84C] dark:hover:text-zinc-950"
                >
                  Check Year Group
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div
                className="min-h-64 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10"
                style={{ backgroundImage: "url('https://picsum.photos/id/1071/800/900')" }}
                aria-label="Admissions family visiting school"
              />
            </Reveal>

            <Reveal className="mt-16 border-t border-zinc-200 pt-12 text-left dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Frequently Asked Questions (FAQs)</h2>
              <div className="mt-8 space-y-4">
                {faqs.map((faq) => {
                  const isOpen = openFaq === faq.question;

                  return (
                    <div key={faq.question} className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/75 dark:border-white/10 dark:bg-white/[0.04]">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? '' : faq.question)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-black text-[#1A1F4B] transition hover:bg-zinc-50 dark:text-zinc-50 dark:hover:bg-white/[0.04]"
                      >
                        <span>{faq.question}</span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="h-5 w-5" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-zinc-200 px-6 py-5 text-lg leading-8 text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal className="mt-14 border-t border-zinc-200 pt-12 text-left dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Student Enrolment Agreements</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {['Primary Student Enrolment Agreement', 'Secondary Student Enrolment Agreement'].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/75 px-5 py-4 text-sm font-black text-[#C8102E] transition hover:-translate-y-0.5 hover:border-[#C8102E]/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#ff8fa0]"
                  >
                    <FileText className="h-5 w-5" />
                    {label}
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-16 border-t border-zinc-200 pt-12 text-center dark:border-white/10">
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">Register Online</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
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
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </motion.main>
  );
}
