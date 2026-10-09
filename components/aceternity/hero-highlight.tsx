'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface HeroHighlightProps {
  className?: string;
  children: ReactNode;
}

export function HeroHighlight({ className, children }: HeroHighlightProps) {
  return (
    <div className={cn('relative isolate overflow-hidden', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_50%_0%,rgba(29,53,87,0.55),transparent_70%)]"
      />
      <div aria-hidden className="grid-background pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <motion.div variants={container} initial="hidden" animate="visible">
        {children}
      </motion.div>
    </div>
  );
}

interface HighlightProps {
  className?: string;
  children: ReactNode;
}

export function Highlight({ className, children }: HighlightProps) {
  return (
    <motion.span
      variants={item}
      className={cn(
        'relative inline-block bg-[linear-gradient(120deg,transparent_0%,rgba(184,50,60,0.35)_50%,transparent_100%)] px-1 text-primaryText',
        className
      )}
    >
      {children}
    </motion.span>
  );
}
