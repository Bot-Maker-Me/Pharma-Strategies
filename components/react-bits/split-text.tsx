'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  /** Per-unit stagger in milliseconds. */
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
  /** Animate on scroll (default) or immediately on mount. */
  trigger?: boolean;
}

/**
 * React Bits — Split Text.
 * Splits a string and animates it in with GSAP. The full text is exposed to
 * assistive tech via aria-label while the animated fragments stay aria-hidden.
 */
export function SplitText({
  text,
  className,
  delay = 40,
  duration = 1.1,
  splitType = 'chars',
  trigger = true,
}: SplitTextProps) {
  const scope = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const targets = scope.current.querySelectorAll('[data-split-unit]');
      if (!targets.length) return;

      gsap.from(targets, {
        opacity: 0,
        yPercent: 60,
        rotateX: -40,
        duration,
        ease: 'power3.out',
        stagger: delay / 1000,
        scrollTrigger: trigger
          ? { trigger: scope.current, start: 'top 90%', once: true }
          : undefined,
      });
    },
    { scope, dependencies: [reduced, text, splitType, delay, duration, trigger] }
  );

  return (
    <span
      ref={scope}
      className={cn('inline-block [perspective:800px]', className)}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap" aria-hidden>
          {(splitType === 'words' ? [word] : word.split('')).map((unit, unitIndex) => (
            <span
              key={unitIndex}
              data-split-unit
              className="inline-block [transform-style:preserve-3d] will-change-transform"
            >
              {unit}
            </span>
          ))}
          {wordIndex < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
