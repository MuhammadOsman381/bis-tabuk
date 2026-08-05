'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Globe2, Newspaper, School, UsersRound } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';
import Image from 'next/image';

const timings = [
  {
    day: 'Sunday to Thursday',
    timings: ['Reception: 7:30 AM - 13:00 PM', 'Primary: 7:30 AM - 13:00 PM', 'Secondary: 7:30 AM - 13:00 PM'],
  },
  {
    day: 'Friday & Saturday',
    timings: ['Campus closed for regular lessons', 'Events and activities as scheduled'],
  },
];

const newsPosts = [
  {
    title: 'International Day Brings Our Community Together',
    date: 'May 12, 2025',
    image: 'https://picsum.photos/id/1067/640/420',
    content:
      'Students, parents, and staff celebrated the cultures, languages, and traditions that make BIST such a vibrant international community.',
  },
  {
    title: 'IB Students Lead Sustainability Campaign',
    date: 'April 28, 2025',
    image: 'https://picsum.photos/id/1048/640/420',
    content:
      'Student leaders launched a campus-wide initiative focused on reducing waste, improving recycling, and encouraging responsible daily choices.',
  },
  {
    title: 'Primary Learners Showcase IPC Projects',
    date: 'April 16, 2025',
    image: 'https://picsum.photos/id/1080/640/420',
    content:
      'Our primary students shared inquiry-led projects with families, demonstrating confidence, collaboration, and creative thinking.',
  },
];

export default function WelcomeToBistPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="relative min-h-[58vh] overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/welcome/first.JPG')" }}
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
              About BIST
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-black leading-[0.95] drop-shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl"
            >
              Welcome to BIST
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base leading-8 text-white/86 md:text-xl"
            >
              A trusted international school community rooted in British values, academic excellence, and a global outlook.
            </motion.p>
          </div>
        </section>

        <article className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="space-y-6 text-left text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              <blockquote className="relative border-l-4 border-[#C8102E] pl-6 text-xl font-semibold leading-9 text-[#1A1F4B] dark:text-zinc-50">
                <span className="absolute -left-8 top-0 text-3xl font-black text-[#C8102E]">&gt;</span>
                The British International School of Tabuk (BIST) is an international community with a global vision.
                Our innovative teaching and curriculum prepare students for the global stage.
              </blockquote>

              <p>
                We are a community co-educational school in Saudi Arabia with a long history of academic excellence and
                innovation. With 47 years of excellence in education, BIST is a trusted name in the region. Recognised
                for its commitment to nurturing young minds, BIST leads in delivering world-class education, providing a
                strong foundation for academic and personal growth.
              </p>

              <p>
                Rooted in British educational values, but with a broad international outlook, we empower students to gain
                the skills and knowledge they need to succeed in a rapidly changing world.
              </p>
            </Reveal>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl px-6">
            <Reveal className="premium-card rounded-[2rem] p-7 sm:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#C8102E]/18 dark:text-[#ff8fa0]">
                <Globe2 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50 sm:text-4xl">
                British values, global perspective
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Founded in 1977, we operate on a purpose-built site, with over <strong>500 students</strong> from
                over <strong>20 countries</strong> and with more than <strong>50 staff</strong> from
                <strong> 20 countries</strong>.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {/* <div
                  className="min-h-64 rounded-3xl bg-cover bg-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                  style={{ backgroundImage: "url('/images/welcome/second.JPG')" }}
                  aria-label="Students learning together on campus"
                />
                 */}
                <Image
                    src="/images/welcome/second.JPG"
                    alt="Students learning together on campus"
                    width={640}
                    height={420}
                    className="min-h-64 rounded-3xl bg-cover bg-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                />
{/* 
                <div
                  className="min-h-64 rounded-3xl bg-cover bg-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                  style={{ backgroundImage: "url('/images/welcome/third.JPG')" }}
                  aria-label="International school community activity"
                /> */}

                <Image
                    src="/images/welcome/third.JPG"
                    alt="Students learning together on campus"
                    width={640}
                    height={420}
                    className="min-h-64 rounded-3xl bg-cover bg-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                />

              </div>

              {/* <div className="mt-5 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 shadow-2xl shadow-zinc-900/12 dark:border-white/10 dark:shadow-black/40">
                <iframe
                  className="aspect-video w-full"
                  src="https://www.youtube.com/embed/5VnQgM32YCs"
                  title="BIST community video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div> */}
            </Reveal>
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl px-6">
            <Reveal className="premium-card rounded-[2rem] p-7 sm:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C]/14 text-[#8a6d1f] dark:bg-[#C9A84C]/16 dark:text-[#C9A84C]">
                <School className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50 sm:text-4xl">
                International curriculum
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Our curriculum reflects the international nature of the school. Our primary curriculum is based on the
                International Primary Curriculum, while in the secondary curriculum students follow a programme leading
                to the International General Certificate of Secondary Education in Year 10 & 11 and A-Levels in year 12 & 13.
              </p>
              {/* <blockquote className="mt-8 rounded-3xl border border-[#C8102E]/10 bg-white/70 p-6 text-left text-lg font-semibold leading-8 text-[#1A1F4B] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-100">
                “BIST has many traditions, but my favorite is International Day, where all the cultures come together.
                It’s something I look forward to every year.”
                <span className="mt-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#C8102E] dark:text-[#ff8fa0]">
                  Hana, IB2
                </span>
              </blockquote> */}
            </Reveal>
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl px-6">
            <Reveal className="premium-card rounded-[2rem] p-7 sm:p-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                <UsersRound className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50 sm:text-4xl">
                A close-knit community
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Our school is large enough to offer exceptional opportunities and small enough to know every student.
                Strong relationships between students, staff, and families help create a culture of belonging.
              </p>

              {/* <div
                className="mt-8 aspect-[4/3] rounded-3xl bg-zinc-100 bg-contain bg-center bg-no-repeat shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] dark:bg-zinc-900"
                style={{ backgroundImage: "url('/images/welcome/fourth.JPG')" }}
                aria-label="Close-knit school community"
              />
`` */}

                <Image
                    src="/images/welcome/fourth.JPG"
                    alt="Students learning together on campus"
                    width={760}
                    height={420}
                className="mt-8 aspect-[4/3] rounded-3xl bg-zinc-100 bg-contain bg-center bg-no-repeat shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] dark:bg-zinc-900"
                />

              <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950/60">
                <div className="border-b border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                    School timings 2026/2027
                  </h3>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-white text-xs uppercase tracking-[0.18em] text-zinc-500 dark:bg-zinc-950 dark:text-zinc-500">
                    <tr>
                      <th className="px-5 py-4 font-bold">Day</th>
                      <th className="px-5 py-4 font-bold">Timings list</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                    {timings.map((item) => (
                      <tr key={item.day} className="align-top">
                        <td className="w-1/3 px-5 py-5 font-bold text-[#1A1F4B] dark:text-zinc-100">{item.day}</td>
                        <td className="px-5 py-5 text-zinc-600 dark:text-zinc-400">
                          <ul className="space-y-2">
                            {item.timings.map((time) => (
                              <li key={time}>{time}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </article>

        {/* <section className="relative overflow-hidden bg-white py-16 dark:bg-zinc-900 sm:py-24">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#C8102E]/8 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E]/10 text-[#C8102E] dark:bg-[#C8102E]/18 dark:text-[#ff8fa0]">
                <Newspaper className="h-7 w-7" />
              </div>
              <h2 className="text-4xl font-black text-[#1A1F4B] dark:text-zinc-50 sm:text-5xl">
                Together We Are BIST
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                We encourage our students to be change-makers. Browse our student-led news content for an insight into
                daily life at the school.
              </p>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-12 grid gap-6 md:grid-cols-3"
            >
              {newsPosts.map((post) => (
                <motion.article
                  key={post.title}
                  variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="premium-card group overflow-hidden rounded-[1.75rem]"
                >
                  <div
                    className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                      <CalendarDays className="h-3.5 w-3.5 text-[#C8102E] dark:text-[#ff8fa0]" />
                      {post.date} · BIST
                    </div>
                    <h3 className="text-xl font-black leading-snug text-[#1A1F4B] dark:text-zinc-50">{post.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{post.content}</p>
                    <Link
                      href="#"
                      className="luxury-link mt-6 inline-flex items-center gap-2 text-sm text-[#C8102E] dark:text-[#ff8fa0] dark:hover:text-[#C9A84C]"
                    >
                      View Post <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section> */}

        <Footer />
      </div>
    </motion.main>
  );
}
