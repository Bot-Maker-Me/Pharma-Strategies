'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface RevealFrameProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Pixels of upward travel while the frame opens. */
  y?: number;
  /** Use `clip` for product mocks, `fade` for plain blocks. */
  variant?: 'clip' | 'fade';
}

/**
 * Image / mock reveal. The frame opens with a clip-path wipe while the content
 * settles from a slight scale — the "screenshot appearing" beat, not a fade.
 */
export function RevealFrame({
  children,
  className,
  delay = 0,
  duration = 1.15,
  y = 56,
  variant = 'clip',
}: RevealFrameProps) {
  const closed =
    variant === 'clip'
      ? {
          opacity: 0,
          y,
          scale: 0.95,
          clipPath: 'inset(14% 8% 14% 8% round 14px)',
        }
      : { opacity: 0, y, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 14px)' };

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      style={{ clipPath: 'inset(0% 0% 0% 0% round 14px)' }}
      initial={closed}
      whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 14px)' }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration, delay, ease: DESIGN_EASE_ARRAY }}
    >
      {children}
    </motion.div>
  );
}
