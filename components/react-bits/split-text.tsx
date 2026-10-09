'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText as GSAPSplitText, DESIGN_EASE } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  /** Per-unit (or per-line) stagger in milliseconds. */
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words' | 'lines';
  /** Animate on scroll (default) or immediately on mount. */
  trigger?: boolean;
  /** Mask lines so they slide up from behind their own bounding box. */
  mask?: boolean;
  /** Word revealed with the outline → filled red wipe (lines mode only). */
  highlight?: string;
  /** Fires once the reveal (and accent wipe) has finished. */
  onComplete?: () => void;
}

/**
 * Render the line content as a stable tree. It deliberately does NOT depend on
 * `prefers-reduced-motion`: keeping it identical across renders means React
 * never re-touches the DOM that GSAP SplitText restructured. All animated state
 * lives in CSS classes that GSAP toggles on the scope element.
 */
function renderLineContent(words: string[], highlight: string | undefined): ReactNode {
  const target = highlight?.toLowerCase();

  return words.map((word, index) => {
    const isAccent = Boolean(target) && word.toLowerCase() === target;
    const space = index < words.length - 1 ? ' ' : '';

    if (isAccent) {
      return (
        <span key={index}>
          <span className="split-accent" data-split-accent aria-hidden>
            <span className="split-accent__outline">{word}</span>
            <span className="split-accent__fill">{word}</span>
          </span>
          {space}
        </span>
      );
    }

    return (
      <span key={index} aria-hidden>
        {word}
        {space}
      </span>
    );
  });
}

/**
 * React Bits — Split Text.
 *
 * - `chars` / `words`: GSAP reveal, opt in to scroll triggering.
 * - `lines`: GSAP SplitText splits the copy into masked lines that slide up
 *   (0.9s, 0.1s stagger by default). Pass `highlight` to render one word as an
 *   outline that wipes to filled red once the lines have landed.
 *
 * The full text is exposed to assistive tech via `aria-label` while the
 * animated fragments stay `aria-hidden`. Reduced motion shows the final state.
 */
export function SplitText({
  text,
  className,
  delay = 40,
  duration = 1.1,
  splitType = 'chars',
  trigger = true,
  mask,
  highlight,
  onComplete,
}: SplitTextProps) {
  const scope = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const isLines = splitType === 'lines';
  const words = text.trim().split(/\s+/);
  const maskLines = mask ?? true;

  // chars / words — unchanged reveal behaviour.
  useGSAP(
    () => {
      if (isLines || reduced || !scope.current) return;
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
    { scope, dependencies: [reduced, text, splitType, delay, duration, trigger, isLines] }
  );

  // lines — SplitText for accurate line detection + masking.
  useEffect(() => {
    if (!isLines) return;
    const el = scope.current;
    if (!el) return;

    if (reduced) {
      el.classList.add('split-lines--ready', 'split-lines--filled');
      return () => {
        el.classList.remove('split-lines--ready', 'split-lines--filled');
      };
    }

    let split: GSAPSplitText | null = null;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const fill = el.querySelector<HTMLElement>('.split-accent__fill');
      if (fill) {
        gsap.to(fill, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
          ease: DESIGN_EASE,
          delay: 0.1,
        });
      }
      onComplete?.();
    };

    const run = () => {
      if (!scope.current) return;
      el.classList.add('split-lines--ready');
      split = new GSAPSplitText(el, {
        type: 'lines',
        mask: maskLines ? 'lines' : undefined,
        autoSplit: true,
        onSplit: (self) => {
          // Re-splits (resize / late font load) snap to the final state so the
          // reveal only ever plays once.
          if (done) return gsap.set(self.lines, { yPercent: 0, opacity: 1 });
          return gsap.from(self.lines, {
            yPercent: 100,
            opacity: 0,
            duration,
            ease: DESIGN_EASE,
            stagger: delay / 1000,
            onComplete: finish,
          });
        },
      });
    };

    if (document.fonts) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      split?.kill();
      split?.revert();
      gsap.killTweensOf(el.querySelectorAll('.split-accent__fill'));
      el.classList.remove('split-lines--ready', 'split-lines--filled');
    };
  }, [isLines, reduced, text, delay, duration, maskLines, onComplete]);

  return (
    <span ref={scope} className={cn(isLines && 'split-lines', className)} aria-label={text}>
      {isLines ? (
        renderLineContent(words, highlight)
      ) : (
        words.map((word, wordIndex) => (
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
        ))
      )}
    </span>
  );
}

export default SplitText;
