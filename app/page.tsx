'use client';

import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Stages from "@/components/sections/Stages";
import Values from "@/components/sections/Values";
import SchoolLife from "@/components/sections/SchoolLife";
import Admissions from "@/components/sections/Admissions";
import Events from "@/components/sections/Events";
import News from "@/components/sections/News";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Topbar />
      <Navbar />
      <Hero />
      <Stages />
      <Values />
      <SchoolLife />
      <Admissions />
      <Events />
      <News />
      <Footer />
    </motion.main>
  );
}
