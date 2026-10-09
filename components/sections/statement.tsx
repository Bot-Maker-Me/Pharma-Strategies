'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const words = ['Compliance', 'is', 'not', 'optional.', 'Documentation', 'should', 'not', 'be', 'a', 'burden.'];

  return (
    <section ref={ref} className="py-24 bg-raisedDark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 02 — STATEMENT
        </p>
        <motion.h2
          className="font-heading text-[clamp(2rem,6vw,5rem)] font-light leading-tight text-primaryText"
        >
          {words.map((word, i) => {
            const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
            return (
              <motion.span
                key={i}
                style={{ opacity }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h2>
      </div>
    </section>
  );
}
