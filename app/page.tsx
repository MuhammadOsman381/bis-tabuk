'use client';

import { useState } from "react";
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Hero from "@/components/sections/Hero";
import Stages from "@/components/sections/Stages";
import Values from "@/components/sections/Values";
import SchoolLife from "@/components/sections/SchoolLife";
import Events from "@/components/sections/Events";
import News from "@/components/sections/News";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Sidebar isDesktopOpen={isSidebarOpen} onDesktopClose={() => setIsSidebarOpen(false)} />
      <div className={isSidebarOpen ? "relative transition-all duration-300 lg:pl-80" : "relative transition-all duration-300 lg:pl-0"}>
        <Topbar />
        <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((value) => !value)} />
        <Hero />
        <Stages />
        <Values />
        <SchoolLife />
        {/* <Admissions /> */}
        <Events />
        <News />
        <Footer />
      </div>
    </motion.main>
  );
}
