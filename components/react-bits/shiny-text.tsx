'use client';

import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  /** Seconds per shine sweep. */
  speed?: number;
  className?: string;
}

/**
 * React Bits — Shiny Text.
 * Pure-CSS sheen that sweeps across the text. Automatically paused by the
 * global prefers-reduced-motion rule in globals.css.
 */
export function ShinyText({ text, disabled = false, speed = 5, className }: ShinyTextProps) {
  return (
    <span
      className={cn('inline-block bg-clip-text text-transparent', className, disabled && 'text-primaryText')}
      style={
        disabled
          ? undefined
          : {
              backgroundImage:
                'linear-gradient(120deg, rgba(237,230,218,0.5) 40%, rgba(255,255,255,1) 50%, rgba(237,230,218,0.5) 60%)',
              backgroundSize: '200% 100%',
              animation: `shiny-text ${speed}s linear infinite`,
            }
      }
    >
      {text}
    </span>
  );
}
