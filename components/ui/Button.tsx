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
  
  const baseStyles = "group relative isolate overflow-hidden px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/20 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[linear-gradient(135deg,#E11D48_0%,#C8102E_45%,#7F1024_100%)] text-white shadow-[0_18px_38px_rgba(200,16,46,0.26),inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_24px_60px_rgba(200,16,46,0.34),inset_0_1px_0_rgba(255,255,255,0.26)] dark:shadow-[0_18px_50px_rgba(200,16,46,0.24),0_0_32px_rgba(200,16,46,0.12),inset_0_1px_0_rgba(255,255,255,0.18)]",
    outline: "border border-white/60 bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl hover:bg-white hover:text-[#1A1F4B] hover:border-white dark:border-white/20 dark:bg-white/6 dark:hover:bg-white/90",
    ghost: "bg-white/10 backdrop-blur-xl border border-white/25 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/18 dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/14"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;
  const shine = (
    <span className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full">
      <span className="absolute inset-y-0 -left-1/2 w-1/3 rotate-12 bg-white/35 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.28),transparent_42%)]" />
    </span>
  );

  if (href) {
    return (
      <motion.a href={href} className={classes} whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.975 }}>
        {shine}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.975 }} {...props}>
      {shine}
      {children}
    </motion.button>
  );
}
