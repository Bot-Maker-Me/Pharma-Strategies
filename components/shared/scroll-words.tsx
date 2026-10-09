'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface ScrollWordsProps {
  text: string;
  /** Words drawn in the red accent (matched case- and punctuation-insensitively). */
  accent?: string[];
  className?: string;
  /** ScrollTrigger start/end for the scrub range. */
  start?: string;
  end?: string;
}

const normalise = (word: string) => word.replace(/[^a-zA-Z]/g, '').toLowerCase();

/**
 * Scroll-linked word reveal: every word brightens in sequence as the block
 * travels through the viewport. Opacity (+ a few px of travel) only, scrubbed
 * by ScrollTrigger, so it stays cheap and never fights Lenis.
 *
 * Render inside a heading/paragraph element — the type styles belong there.
 * Under reduced motion the final state is shown, no scroll listener is created.
 */
export function ScrollWords({
  text,
  accent = [],
  className,
  start = 'top 82%',
  end = 'bottom 62%',
}: ScrollWordsProps) {
  const scope = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.trim().split(/\s+/);
  const accentKeys = new Set(accent.map(normalise));

  useGSAP(
    () => {
      if (reduced || !scope.current) return;
      const targets = gsap.utils.toArray<HTMLElement>(
        scope.current.querySelectorAll('[data-word]')
      );
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0.12, y: 14 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          stagger: 0.32,
          scrollTrigger: {
            trigger: scope.current,
            start,
            end,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope, dependencies: [reduced, text, start, end] }
  );

  return (
    <span ref={scope} className={cn('block', className)} aria-label={text}>
      {words.map((word, index) => {
        const isAccent = accentKeys.has(normalise(word));
        return (
          <span key={`${word}-${index}`} className="inline-block whitespace-nowrap">
            <span
              data-word
              aria-hidden
              className={cn('inline-block will-change-transform', isAccent && 'text-accentRed')}
            >
              {word}
            </span>
            {index < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        );
      })}
    </span>
  );
}
