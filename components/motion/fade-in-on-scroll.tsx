'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Pixels of upward travel. */
  y?: number;
  start?: string;
}

/**
 * Subtle fade + rise as the element scrolls into view. Transform/opacity only.
 * Skipped entirely under reduced motion. Timelines revert on unmount (useGSAP).
 */
export function FadeInOnScroll({
  children,
  className,
  delay = 0,
  y = 40,
  start = 'top 85%',
}: FadeInOnScrollProps) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      gsap.from(scope.current, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start, once: true },
      });
    },
    { scope, dependencies: [reduced, delay, y, start] }
  );

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
