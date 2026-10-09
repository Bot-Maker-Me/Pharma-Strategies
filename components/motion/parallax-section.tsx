'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Total drift in pixels across the scroll range. Keep it small (24–64). */
  distance?: number;
}

/**
 * Subtle scroll parallax for a decorative layer or a section with vertical
 * breathing room. The wrapper clips overflow so nothing bleeds into neighbours.
 */
export function ParallaxSection({ children, className, distance = 48 }: ParallaxSectionProps) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const scopeEl = scope.current;
      const inner = scopeEl?.firstElementChild as HTMLElement | null;
      if (reduced || !scopeEl || !inner) return;

      gsap.fromTo(
        inner,
        { y: distance },
        {
          y: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: scopeEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope, dependencies: [reduced, distance] }
  );

  return (
    <div ref={scope} className={cn('overflow-hidden', className)}>
      <div className="h-full will-change-transform">{children}</div>
    </div>
  );
}
