'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    title: 'Receive',
    description: 'Log incoming controlled substances with dual signatures',
  },
  {
    title: 'Count',
    description: 'Track inventory in real-time with automatic discrepancy alerts',
  },
  {
    title: 'Sign',
    description: 'Complete transactions with verified electronic signatures',
  },
];

export function NarcoticsLedgerPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progress = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 3]);

  return (
    <section ref={containerRef} className="py-24 bg-raisedDark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 06 — NARCOTICS LEDGER
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Captions */}
          <div className="relative h-[300px]">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="absolute top-0 left-0 w-full"
              >
                <h3 className="font-heading text-3xl text-primaryText mb-2">{step.title}</h3>
                <p className="font-sans text-secondaryText">{step.description}</p>
              </motion.div>
            ))}

            {/* Progress line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-hairline">
              <motion.div
                className="h-full bg-accentRed"
                style={{ scaleX: progress }}
              />
            </div>
          </div>

          {/* Right: UI mock */}
          <div className="border border-hairline bg-midnight p-4">
            <div className="bg-midnight border border-hairline p-4">
              {/* Sidebar */}
              <div className="flex gap-4 mb-4">
                <div className="w-48 space-y-1">
                  <div className="font-mono text-xs uppercase tracking-widest text-primaryText mb-3">Navigation</div>
                  <div className="h-8 bg-hairline/30 rounded-button flex items-center px-3">
                    <span className="font-mono text-xs text-primaryText">Register</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-button flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Deliveries</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-button flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Discrepancies</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-button flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Audit log</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-button flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Staff</span>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 space-y-2">
                  {/* Header */}
                  <div className="h-10 bg-hairline/20 rounded-button flex items-center px-4">
                    <span className="font-heading text-sm text-primaryText">Narcotics Register</span>
                  </div>

                  {/* Table header */}
                  <div className="grid grid-cols-5 gap-2 bg-hairline/10 p-2 rounded-button">
                    <div className="font-mono text-xs uppercase tracking-widest text-secondaryText">Date</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-secondaryText">Drug</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-secondaryText text-right">In</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-secondaryText text-right">Out</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-secondaryText text-right">Bal</div>
                  </div>

                  {/* Table rows */}
                  <div className="space-y-1">
                    {[
                      { date: '07 Oct', drug: 'Oxycodone 5mg', in: '50', out: '32', bal: '18' },
                      { date: '07 Oct', drug: 'Fentanyl 25µg', in: '100', out: '85', bal: '15' },
                      { date: '06 Oct', drug: 'Morphine 10mg', in: '75', out: '60', bal: '15' },
                      { date: '06 Oct', drug: 'Hydromorphone 2mg', in: '40', out: '38', bal: '2' },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-5 gap-2 bg-hairline/5 p-2 rounded-button">
                        <div className="font-mono text-xs text-primaryText tabular-nums">{row.date}</div>
                        <div className="font-sans text-xs text-primaryText">{row.drug}</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.in}</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.out}</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.bal}</div>
                      </div>
                    ))}

                    {/* Discrepancy row */}
                    <div className="grid grid-cols-5 gap-2 bg-accentRed/10 p-2 rounded-button border-l-2 border-l-accentRed">
                      <div className="font-mono text-xs text-primaryText tabular-nums">05 Oct</div>
                      <div className="font-sans text-xs text-primaryText">Oxycodone 5mg</div>
                      <div className="font-mono text-xs text-primaryText text-right tabular-nums">50</div>
                      <div className="font-mono text-xs text-primaryText text-right tabular-nums">45</div>
                      <div className="font-mono text-xs text-primaryText text-right tabular-nums">5</div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-5">
                        <span className="font-mono text-xs text-accentRed uppercase tracking-widest">Discrepancy</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual signature panel */}
                  <div className="mt-4 p-4 bg-hairline/10 border border-hairline rounded-button relative">
                    <div className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-3">Dual Signatures</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-hairline/20 rounded-button flex items-center justify-center">
                        <span className="font-mono text-sm text-primaryText">JD</span>
                      </div>
                      <div className="h-16 bg-hairline/20 rounded-button flex items-center justify-center">
                        <span className="font-mono text-sm text-primaryText">SM</span>
                      </div>
                    </div>
                    {/* VERIFIED stamp */}
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
    </section>
  );
}
