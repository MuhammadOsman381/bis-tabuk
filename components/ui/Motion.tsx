'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

export const softSpring = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.66, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({ children, className = '' }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.012, rotateX: 1.2, rotateY: -1.2 }}
      whileTap={{ scale: 0.992 }}
      transition={softSpring}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { motion };
