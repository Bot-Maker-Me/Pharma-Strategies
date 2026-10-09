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
  /** Seconds between words as the scrub advances. */
  stagger?: number;
  /** ScrollTrigger start/end for the scrub range. */
  start?: string;
  end?: string;
}

const normalise = (word: string) => word.replace(/[^a-zA-Z]/g, '').toLowerCase();

/**
 * Scroll-linked word reveal. Each word lifts and brightens in sequence as the
 * block travels through the viewport, scrubbed by ScrollTrigger. Accent words
 * travel further and land last so they read as stamped.
 *
 * Render inside a heading/paragraph element — the type styles belong there.
 * Transform + opacity only; under reduced motion the final state is shown.
 */
export function ScrollWords({
  text,
  accent = [],
  className,
  stagger = 0.45,
  start = 'top 85%',
  end = 'bottom 55%',
}: ScrollWordsProps) {
  const scope = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.trim().split(/\s+/);
  const accentKeys = new Set(accent.map(normalise));

  useGSAP(
    () => {
      if (reduced || !scope.current) return;

      // Accent words get their own tween, so they are excluded here to avoid
      // two tweens fighting over the same element's transform.
      const body = gsap.utils.toArray<HTMLElement>(
        scope.current.querySelectorAll('[data-word]:not([data-word-accent])')
      );
      const accents = gsap.utils.toArray<HTMLElement>(
        scope.current.querySelectorAll('[data-word-accent]')
      );
      if (!body.length && !accents.length) return;

      const trigger = () => ({
        trigger: scope.current,
        start,
        end,
        scrub: 0.75,
        invalidateOnRefresh: true,
      });

      if (body.length) {
        gsap.fromTo(
          body,
          { opacity: 0.06, y: 30 },
          { opacity: 1, y: 0, ease: 'none', stagger, scrollTrigger: trigger() }
        );
      }

      if (accents.length) {
        gsap.fromTo(
          accents,
          { y: 46, opacity: 0.1 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
            stagger: stagger * 2.6,
            scrollTrigger: trigger(),
          }
        );
      }
    },
    { scope, dependencies: [reduced, text, start, end, stagger] }
  );

  return (
    <span ref={scope} className={cn('block', className)} aria-label={text}>
      {words.map((word, index) => {
        const isAccent = accentKeys.has(normalise(word));
        return (
          <span key={`${word}-${index}`} className="inline-block whitespace-nowrap">
            <span
              data-word
              data-word-accent={isAccent ? '' : undefined}
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
