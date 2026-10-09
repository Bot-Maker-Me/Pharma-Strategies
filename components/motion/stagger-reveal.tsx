'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each direct child. */
  stagger?: number;
  /** Pixels of upward travel. */
  y?: number;
  /** Seconds each child takes. */
  duration?: number;
  start?: string;
}

/**
 * Staggered entrance for a list of direct children (grid cards, table rows).
 * One ScrollTrigger for the whole group, transform + opacity only.
 */
export function StaggerReveal({
  children,
  className,
  stagger = 0.12,
  y = 48,
  duration = 0.95,
  start = 'top 88%',
}: StaggerRevealProps) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const items = Array.from(scope.current.children);
      if (items.length === 0) return;

      gsap.from(items, {
        opacity: 0,
        y,
        duration,
        ease: 'power3.out',
        stagger,
        scrollTrigger: { trigger: scope.current, start, once: true },
      });
    },
    { scope, dependencies: [reduced, stagger, y, duration, start] }
  );

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
