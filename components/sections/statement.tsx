'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollWords } from '@/components/shared/scroll-words';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';

const principles = [
  {
    index: '01',
    title: 'Two signatures per entry',
    body: 'Who received it and who confirmed it, recorded against the same row.',
  },
  {
    index: '02',
    title: 'One balance per substance',
    body: 'Deliveries, doses and returns all move the same number in the same register.',
  },
  {
    index: '03',
    title: 'Corrections leave a trace',
    body: 'Fixes are added as new entries, so the original record stays visible.',
  },
];

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const ruleScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-raisedDark py-28 lg:py-36">
      {/* Texture: ledger rules + a cool glow, both purely decorative */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-background opacity-30" />
      <motion.div
        aria-hidden
        style={{ y: drift }}
        className="glow-blue pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-midnight/60"
      />

      <div className="ed-container relative">
        <div className="mb-10 flex items-center gap-4">
          <span aria-hidden className="h-px w-8 bg-accentRed" />
          <p className="font-mono text-[11px] uppercase tracking-widest text-secondaryText">
            § 02 — STATEMENT
          </p>
          <div className="h-px flex-1 bg-hairline" />
          <p className="hidden font-mono text-[11px] uppercase tracking-widest text-accentRed sm:block">
            Signed, not summarised
          </p>
        </div>

        <h2 className="max-w-5xl font-heading text-[clamp(2rem,6vw,4.75rem)] font-light leading-[1.06] text-primaryText">
          <ScrollWords
            text="Compliance is not optional. Documentation should not be a burden."
            accent={['optional', 'burden']}
          />
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: DESIGN_EASE_ARRAY }}
              className="font-sans text-lg text-secondaryText"
            >
              The register answers the only question that matters later: what happened to every
              controlled substance, and who signed for it. Everything else is an export.
            </motion.p>

            <motion.div
              aria-hidden
              style={{ scaleX: ruleScale }}
              className="mt-10 h-px w-full origin-left bg-accentRed"
            />

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {['Audit log', 'Dual signatures', 'Discrepancy alerts'].map((item) => (
                <span
                  key={item}
                  className="font-mono text-[10px] uppercase tracking-widest text-secondaryText"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <StaggerReveal className="grid gap-6 sm:grid-cols-3 lg:col-span-7" stagger={0.1} y={24}>
            {principles.map((principle) => (
              <div
                key={principle.index}
                className="border-t border-hairline pt-5 transition-colors duration-500 hover:border-accentRed/60"
              >
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                  {principle.index}
                </p>
                <h3 className="mb-2 font-heading text-lg text-primaryText">{principle.title}</h3>
                <p className="font-sans text-sm text-secondaryText">{principle.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
