'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  variants?: Variants;
}

/**
 * Content reveal. Long enough (0.95s) and far enough (48px) to actually read as
 * motion, with the design easing curve and a single shared ScrollTrigger-free
 * intersection observer per element.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.95,
  className,
  variants = defaultVariants,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, delay, ease: DESIGN_EASE_ARRAY }}
    >
      {children}
    </motion.div>
  );
}
