'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Reveal, staggerContainer } from '@/components/ui/Motion';
import Image from 'next/image';

const teams = [
  {
    title: 'Director General',
    name: 'Dr. Khaled Khader Abudhaim',
    image: '/images/dg.jpeg',
    caption:
      'Welcome to British International School, Tabuk, Kingdom of Saudi Arabia At British International School, we believe that education is the foundation upon which future leaders, innovators, and entrepreneurs are built. Our mission extends beyond academic excellence; we are committed to nurturing confident, responsible, and forward-thinking individuals who are prepared to thrive in an ever-changing global society. We strive to create an environment where curiosity is encouraged, creativity is celebrated, and leadership is cultivated. Through a dynamic curriculum, innovative teaching practices, and a strong emphasis on character development, we empower our students to think critically, communicate effectively, and act with integrity. Entrepreneurship is at the heart of the modern world, and we encourage our students to embrace initiative, innovation, and problem-solving. By fostering an entrepreneurial mindset, we prepare young people not only to pursue successful careers but also to create opportunities, contribute to their communities, and make a positive impact on society. Leadership is not simply about holding positions of authority; it is about inspiring others, demonstrating responsibility, and serving with purpose. We are dedicated to developing leaders who possess vision, resilience, compassion, and the confidence to meet future challenges with determination. As we continue our journey of excellence, we remain committed to providing a worldclass education that equips our students with the knowledge, skills, and values needed to succeed in the 21st century. Together, let us inspire learning, encourage innovation, and develop the leaders and entrepreneurs of tomorrow.'
    
    },
  {
    title: 'Principal',
    name: 'Dr. Areej Faraj Al Atawi',
    image: '/images/p.jpeg',
    caption:
      'Welcome to British International School, Tabuk, Kingdom of Saudi Arabia. As Principal, I am honoured to lead a learning community that is dedicated to academic excellence, personal growth, and lifelong learning. Our goal is to provide every student with a stimulating and supportive environment where they can discover their strengths, develop their talents, and achieve their fullest potential. Education is more than the acquisition of knowledge; it is the development of character, confidence, and critical thinking. We strive to inspire a love of learning while equipping students with the skills necessary to succeed in an increasingly interconnected and dynamic world. At British International School, we embrace high standards, innovative teaching practices, and a student-centred approach to learning. Our committed educators work collaboratively with parents and the wider community to ensure that every child receives the guidance, encouragement, and opportunities needed to excel academically and socially. We believe that every student can make a meaningful contribution to society. Through a balanced educational experience, we nurture responsible global citizens who demonstrate integrity, respect, resilience, and compassion. Together, we continue to inspire excellence and shape a bright future for our students. '
    },
];

export default function LeadershipTeamsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />

        <section className="luxury-section bg-[#fffaf4] py-16 dark:bg-zinc-950 sm:py-24">
          <div className="relative mx-auto max-w-4xl px-6">
            <Reveal className="text-center">
              <p className="luxury-kicker text-xs font-bold uppercase tracking-[0.24em]">About BIST</p>
              <h1 className="mt-6 text-4xl font-black leading-tight text-[#1A1F4B] dark:text-zinc-50 sm:text-6xl">
                Leadership Teams
              </h1>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="mt-16 space-y-16"
            >
              {teams.map((team) => (
                <motion.section
                  key={team.title}
                  variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
                  className="border-t border-zinc-200 pt-12 text-left dark:border-white/10"
                >
                  <h2 className="text-3xl font-black text-[#1A1F4B] dark:text-zinc-50">{team.title}</h2>

                  {/* <div
                    className="mx-auto mt-7 min-h-80 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10"
                    style={{ backgroundImage: `url('${team.image}')` }}
                    aria-label={`${team.title} group photo`}
/> */}

                <Image 
                src={team.image} alt={team.title} width={300} height={650} className="mx-auto mt-7 min-h-80 rounded-3xl bg-cover bg-center shadow-[0_18px_50px_rgba(26,31,75,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-zinc-200 dark:ring-white/10" />


                    <div className='text-xl font-bold text-center mt-3' >
                      {team.name}
                    </div>


                  <p className="mt-5 text-left text-base leading-7 text-zinc-600 dark:text-zinc-400">{team.caption}</p>
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
