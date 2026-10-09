'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/react-bits';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** Mono eyebrow, e.g. "§ 04 — WHO IT'S FOR". */
  label: string;
  title: string;
  description?: string;
  /** `compact` keeps the vertical footprint small (horizontal/pinned bands). */
  size?: 'default' | 'compact';
  className?: string;
}

/**
 * Shared section header: a hairline that draws itself, the mono eyebrow, a
 * masked line-reveal title and an optional right-hand description.
 */
export function SectionHeading({
  label,
  title,
  description,
  size = 'default',
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(size === 'compact' ? 'mb-8' : 'mb-14', className)}>
      <motion.div
        aria-hidden
        className="mb-5 h-px origin-left bg-hairline"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: DESIGN_EASE_ARRAY }}
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText">
            <span aria-hidden className="h-px w-8 bg-accentRed" />
            {label}
          </p>
          <h2
            className={cn(
              'font-heading font-light text-primaryText',
              size === 'compact'
                ? 'text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2]'
                : 'text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.15]'
            )}
          >
            <SplitText text={title} splitType="lines" delay={90} duration={0.9} />
          </h2>
        </div>

        {description ? (
          <motion.p
            className="font-sans text-secondaryText lg:col-span-5 lg:border-l lg:border-hairline lg:pl-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: DESIGN_EASE_ARRAY }}
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </header>
  );
}
