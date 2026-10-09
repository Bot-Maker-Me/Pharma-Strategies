'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  variants?: Variants;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  className,
  variants = defaultVariants,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
