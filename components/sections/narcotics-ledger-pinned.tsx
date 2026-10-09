'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { SectionHeading } from '@/components/shared/section-heading';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Receive',
    description: 'Log incoming controlled substances with dual signatures.',
    nav: 'Deliveries',
    details: [
      'Delivery checked against the invoice',
      'Both signatures captured at the counter',
      'Balance moves in the same row',
    ],
  },
  {
    title: 'Count',
    description: 'Track inventory in real time with automatic discrepancy alerts.',
    nav: 'Discrepancies',
    details: [
      'Cycle counts run on your schedule',
      'Variance flagged the moment it appears',
      'Oxycodone 5mg · off by 2',
    ],
  },
  {
    title: 'Sign',
    description: 'Complete transactions with verified electronic signatures.',
    nav: 'Audit log',
    details: [
      'One signer receives, one confirms',
      'Signed entries lock in place',
      'Audit export reads the same record',
    ],
  },
];

const rows = [
  { date: '07 Oct', drug: 'Oxycodone 5mg', inQty: '50', outQty: '32', bal: '18' },
  { date: '07 Oct', drug: 'Fentanyl 25µg', inQty: '100', outQty: '85', bal: '15' },
  { date: '06 Oct', drug: 'Morphine 10mg', inQty: '75', outQty: '60', bal: '15' },
  { date: '06 Oct', drug: 'Hydromorphone 2mg', inQty: '40', outQty: '38', bal: '2' },
];

const navItems = ['Register', 'Deliveries', 'Discrepancies', 'Audit log', 'Staff'];

/** Date and the three numeric columns stay fixed; the drug name takes the rest. */
const ROW_GRID = 'grid grid-cols-[3rem_minmax(0,1fr)_2.75rem_2.75rem_2.75rem] gap-2';

export function NarcoticsLedgerPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 70%'],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section ref={containerRef} className="bg-raisedDark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="§ 05 — NARCOTICS LEDGER"
          title="Receive, count, sign"
          description="Three steps, in the order you already work them. The register follows along."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: the three steps */}
          <div className="relative">
            <ol className="space-y-10">
              {steps.map((step, index) => {
                const isActive = index === active;
                return (
                  <li
                    key={step.title}
                    className={cn(
                      'border-l-2 pl-6 transition-all duration-500',
                      isActive ? 'border-accentRed' : 'border-hairline'
                    )}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full transition-colors duration-500',
                          isActive ? 'bg-accentRed' : 'bg-hairline'
                        )}
                      />
                      <p className="font-mono text-xs uppercase tracking-widest text-secondaryText">
                        Step {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>

                    <h3
                      className={cn(
                        'mb-2 font-heading text-3xl transition-colors duration-500',
                        isActive ? 'text-primaryText' : 'text-primaryText/50'
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        'max-w-md font-sans transition-colors duration-500',
                        isActive ? 'text-secondaryText' : 'text-secondaryText/50'
                      )}
                    >
                      {step.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detail}
                          className={cn(
                            'flex items-baseline gap-3 font-mono text-xs transition-all duration-500',
                            isActive
                              ? 'translate-x-0 text-secondaryText opacity-100'
                              : '-translate-x-1 text-secondaryText opacity-40'
                          )}
                          style={{ transitionDelay: isActive ? `${detailIndex * 60}ms` : '0ms' }}
                        >
                          <span className="text-accentRed">—</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>

            {/* Scroll progress + step counter */}
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px flex-1 overflow-hidden bg-hairline">
                <motion.div
                  className="h-full origin-left bg-accentRed"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText tabular-nums">
                {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: register mock, sticky while the steps advance */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-panel border border-hairline bg-midnight p-4">
              <div className="rounded-panel border border-hairline bg-midnight p-4">
                <div className="flex gap-4">
                  {/* Nav */}
                  <nav className="w-40 flex-none space-y-1 sm:w-48">
                    <div className="mb-3 font-mono text-xs uppercase tracking-widest text-primaryText">
                      Navigation
                    </div>
                    {navItems.map((item) => {
                      const isCurrent = item === 'Register';
                      const isTarget = item === steps[active].nav;
                      return (
                        <div
                          key={item}
                          className={cn(
                            'flex h-8 items-center rounded-button px-3 font-mono text-xs transition-colors duration-500',
                            isCurrent
                              ? 'bg-hairline/30 text-primaryText'
                              : isTarget
                                ? 'bg-accentRed/10 text-accentRed'
                                : 'bg-hairline/10 text-secondaryText'
                          )}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </nav>

                  {/* Register */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex h-10 items-center justify-between rounded-button bg-hairline/20 px-4">
                      <span className="font-heading text-sm text-primaryText">Narcotics Register</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                        {steps[active].title}
                      </span>
                    </div>

                    <div
                      className={cn(
                        ROW_GRID,
                        'rounded-button bg-hairline/10 p-2 transition-all duration-500',
                        active === 1 && 'ring-1 ring-inset ring-accentRed/40'
                      )}
                    >
                      {['Date', 'Drug', 'In', 'Out', 'Bal'].map((heading, i) => (
                        <div
                          key={heading}
                          className={cn(
                            'font-mono text-xs uppercase tracking-widest text-secondaryText',
                            i > 1 && 'text-right'
                          )}
                        >
                          {heading}
                        </div>
                      ))}
                    </div>

                    <div
                      className={cn(
                        'space-y-1 rounded-button transition-all duration-500',
                        active === 0 && 'ring-1 ring-inset ring-accentRed/40'
                      )}
                    >
                      {rows.map((row, rowIndex) => (
                        <div
                          key={row.drug}
                          className={cn(
                            ROW_GRID,
                            'rounded-button p-2 transition-colors duration-500',
                            active === 0 && rowIndex === 0 ? 'bg-accentRed/10' : 'bg-hairline/5'
                          )}
                        >
                          <div className="font-mono text-xs tabular-nums text-primaryText">
                            {row.date}
                          </div>
                          <div className="truncate font-sans text-xs text-primaryText">{row.drug}</div>
                          <div className="text-right font-mono text-xs tabular-nums text-primaryText">
                            {row.inQty}
                          </div>
                          <div className="text-right font-mono text-xs tabular-nums text-primaryText">
                            {row.outQty}
                          </div>
                          <div
                            className={cn(
                              'rounded text-right font-mono text-xs tabular-nums text-primaryText transition-colors duration-500',
                              active === 1 && 'text-accentRed'
                            )}
                          >
                            {row.bal}
                          </div>
                        </div>
                      ))}

                      <div
                        className={cn(
                          ROW_GRID,
                          'rounded-button border-l-2 border-l-accentRed p-2 transition-colors duration-500',
                          active === 1 ? 'bg-accentRed/20' : 'bg-accentRed/10'
                        )}
                      >
                        <div className="font-mono text-xs tabular-nums text-primaryText">05 Oct</div>
                        <div className="truncate font-sans text-xs text-primaryText">Oxycodone 5mg</div>
                        <div className="text-right font-mono text-xs tabular-nums text-primaryText">
                          50
                        </div>
                        <div className="text-right font-mono text-xs tabular-nums text-primaryText">
                          45
                        </div>
                        <div className="text-right font-mono text-xs tabular-nums text-primaryText">5</div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 px-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-accentRed">
                          Discrepancy
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                          Count off by 2
                        </span>
                      </div>
                    </div>

                    {/* Duplicated signatures */}
                    <div
                      className={cn(
                        'relative mt-4 rounded-button border border-hairline bg-hairline/10 p-4 transition-all duration-500',
                        active === 2 && 'ring-1 ring-inset ring-accentRed/40'
                      )}
                    >
                      <div className="mb-3 font-mono text-xs uppercase tracking-widest text-secondaryText">
                        Dual Signatures
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {['JD', 'SM'].map((initials) => (
                          <div
                            key={initials}
                            className="flex h-16 items-center justify-center rounded-button bg-hairline/20"
                          >
                            <span className="font-mono text-sm text-primaryText">{initials}</span>
                          </div>
                        ))}
                      </div>
                      <motion.div
                        aria-hidden
                        initial={false}
                        animate={
                          active === 2
                            ? { scale: 1, opacity: 0.9, rotate: -12 }
                            : { scale: 1.25, opacity: 0, rotate: -12 }
                        }
                        transition={{ duration: 0.35, ease: DESIGN_EASE_ARRAY }}
                        className="absolute bottom-2 right-2 flex h-16 w-16 items-center justify-center rounded-full border-4 border-accentRed bg-accentRed/10"
                      >
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accentRed">
                          Verified
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
