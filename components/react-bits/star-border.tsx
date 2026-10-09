'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StarBorderProps {
  children: ReactNode;
  className?: string;
  /** Accent colour of the animated border star. */
  color?: string;
  /** CSS duration string, e.g. '6s'. */
  speed?: string;
}

/**
 * React Bits — Star Border.
 * A moving gradient "star" behind a bordered surface. Composes with shadcn
 * primitives by wrapping any content (buttons, cards, links).
 */
export function StarBorder({ children, className, color = '#B8323C', speed = '6s' }: StarBorderProps) {
  const starStyle = {
    background: `radial-gradient(circle, ${color}, transparent 10%)`,
    animationDuration: speed,
  };

  return (
    <div className={cn('relative inline-block overflow-hidden rounded-button p-px', className)}>
      <div
        aria-hidden
        className="animate-star-move absolute bottom-[-11px] right-[-250%] z-0 h-1/2 w-[300%] rounded-full opacity-70"
        style={starStyle}
      />
      <div
        aria-hidden
        className="animate-star-move absolute left-[-250%] top-[-10px] z-0 h-1/2 w-[300%] rounded-full opacity-70"
        style={starStyle}
      />
      <div className="relative z-10 flex items-center justify-center rounded-button border border-hairline bg-midnight px-6 py-3 font-mono text-xs uppercase tracking-widest text-primaryText">
        {children}
      </div>
    </div>
  );
}
