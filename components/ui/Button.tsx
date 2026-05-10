'use client';

import { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  href?: string;
} & HTMLMotionProps<'button'>;

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  href,
  ...props 
}: ButtonProps) {
  
  const baseStyles = "px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/20 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/20 hover:bg-[#9B0D23] hover:shadow-xl hover:shadow-[#C8102E]/25 dark:shadow-[#C8102E]/30 dark:hover:shadow-[#C8102E]/40",
    outline: "border border-white/70 text-white hover:bg-white hover:text-[#1A1F4B] hover:border-white dark:border-white/30 dark:hover:bg-white/90",
    ghost: "bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/18 dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/14"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={classes} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} {...props}>
      {children}
    </motion.button>
  );
}
