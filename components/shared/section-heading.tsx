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
  /** `compact` keeps the vertical footprint small (pinned / horizontal bands). */
  size?: 'default' | 'compact';
  className?: string;
}

/**
 * Shared section header: red tick + mono eyebrow, a masked line-reveal title
 * (1.1s, staggered line by line) and an optional right-hand description.
 */
export function SectionHeading({
  label,
  title,
  description,
  size = 'default',
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn(size === 'compact' ? 'mb-10' : 'mb-16', className)}>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
            transition={{ duration: 0.8, ease: DESIGN_EASE_ARRAY }}
            className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText"
          >
            <span aria-hidden className="h-px w-8 bg-accentRed" />
            {label}
          </motion.p>

          <h2
            className={cn(
              'font-heading font-normal text-primaryText',
              size === 'compact'
                ? 'text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2]'
                : 'text-[clamp(1.85rem,4.2vw,3.4rem)] leading-[1.12]'
            )}
          >
            <SplitText
              text={title}
              splitType="lines"
              delay={110}
              duration={1.1}
              blurChars={size === 'default'}
            />
          </h2>
        </div>

        {description ? (
          <motion.p
            className="font-sans text-secondaryText lg:col-span-5 lg:border-l lg:border-hairline lg:pl-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
            transition={{ duration: 0.95, delay: 0.3, ease: DESIGN_EASE_ARRAY }}
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </header>
  );
}
