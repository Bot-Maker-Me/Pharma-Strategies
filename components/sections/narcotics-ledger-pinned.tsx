'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Receive',
    description: 'Log incoming controlled substances with dual signatures.',
  },
  {
    title: 'Count',
    description: 'Track inventory in real time with automatic discrepancy alerts.',
  },
  {
    title: 'Sign',
    description: 'Complete transactions with verified electronic signatures.',
  },
];

const rows = [
  { date: '07 Oct', drug: 'Oxycodone 5mg', inQty: '50', outQty: '32', bal: '18' },
  { date: '07 Oct', drug: 'Fentanyl 25µg', inQty: '100', outQty: '85', bal: '15' },
  { date: '06 Oct', drug: 'Morphine 10mg', inQty: '75', outQty: '60', bal: '15' },
  { date: '06 Oct', drug: 'Hydromorphone 2mg', inQty: '40', outQty: '38', bal: '2' },
];

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
    <section ref={containerRef} className="py-24 bg-raisedDark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-10">
          § 05 — NARCOTICS LEDGER
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Captions */}
          <div className="relative">
            <ol className="space-y-10">
              {steps.map((step, index) => {
                const isActive = index === active;
                return (
                  <li
                    key={step.title}
                    className={cn(
                      'border-l-2 pl-6 transition-all duration-500',
                      isActive ? 'border-accentRed opacity-100' : 'border-hairline opacity-40'
                    )}
                  >
                    <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-2">
                      Step {index + 1}
                    </p>
                    <h3 className="font-heading text-3xl text-primaryText mb-2">{step.title}</h3>
                    <p className="font-sans text-secondaryText max-w-md">{step.description}</p>
                  </li>
                );
              })}
            </ol>

            {/* Scroll progress */}
            <div className="mt-10 h-px w-full overflow-hidden bg-hairline">
              <motion.div
                className="h-full origin-left bg-accentRed"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>

          {/* Right: UI mock (sticky) */}
          <div className="lg:sticky lg:top-24">
            <div className="border border-hairline bg-midnight p-4">
              <div className="bg-midnight border border-hairline p-4">
                <div className="flex gap-4 mb-4">
                  <div className="w-48 space-y-1">
                    <div className="font-mono text-xs uppercase tracking-widest text-primaryText mb-3">
                      Navigation
                    </div>
                    <div className="h-8 bg-hairline/30 rounded-button flex items-center px-3">
                      <span className="font-mono text-xs text-primaryText">Register</span>
                    </div>
                    {['Deliveries', 'Discrepancies', 'Audit log', 'Staff'].map((item) => (
                      <div key={item} className="h-6 bg-hairline/10 rounded-button flex items-center px-3">
                        <span className="font-mono text-xs text-secondaryText">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="h-10 bg-hairline/20 rounded-button flex items-center px-4">
                      <span className="font-heading text-sm text-primaryText">Narcotics Register</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 bg-hairline/10 p-2 rounded-button">
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

                    <div className="space-y-1">
                      {rows.map((row) => (
                        <div key={row.drug} className="grid grid-cols-5 gap-2 bg-hairline/5 p-2 rounded-button">
                          <div className="font-mono text-xs text-primaryText tabular-nums">{row.date}</div>
                          <div className="font-sans text-xs text-primaryText">{row.drug}</div>
                          <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.inQty}</div>
                          <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.outQty}</div>
                          <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.bal}</div>
                        </div>
                      ))}

                      <div className="grid grid-cols-5 gap-2 bg-accentRed/10 p-2 rounded-button border-l-2 border-l-accentRed">
                        <div className="font-mono text-xs text-primaryText tabular-nums">05 Oct</div>
                        <div className="font-sans text-xs text-primaryText">Oxycodone 5mg</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">50</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">45</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">5</div>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-5">
                          <span className="font-mono text-xs text-accentRed uppercase tracking-widest">
                            Discrepancy
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-hairline/10 border border-hairline rounded-button relative">
                      <div className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-3">
                        Dual Signatures
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {['JD', 'SM'].map((initials) => (
                          <div
                            key={initials}
                            className="h-16 bg-hairline/20 rounded-button flex items-center justify-center"
                          >
                            <span className="font-mono text-sm text-primaryText">{initials}</span>
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-2 right-2 w-16 h-16 rounded-full border-4 border-accentRed flex items-center justify-center bg-accentRed/10">
                        <span className="font-mono text-[10px] font-bold text-accentRed uppercase tracking-widest">
                          Verified
                        </span>
                      </div>
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
