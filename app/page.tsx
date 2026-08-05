'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Hero from '@/components/sections/Hero';
import SchoolLife from '@/components/sections/SchoolLife';
import KeyDates from '@/components/sections/KeyDates';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? 'relative transition-all duration-300 lg:pl-80' : 'relative transition-all duration-300 lg:pl-0'}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />
        <Hero />
        <SchoolLife />
        <KeyDates />
        <Footer />
      </div>
    </motion.main>
  );
}
