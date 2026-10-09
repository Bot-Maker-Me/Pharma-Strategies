'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    numeral: 'I',
    title: 'Create your account',
    description: 'Set up your facility and add staff with appropriate access levels.',
    ui: (
      <div className="space-y-2">
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">Facility Name</div>
          <div className="h-6 bg-hairline/20 rounded-button"></div>
        </div>
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">Staff Access</div>
          <div className="space-y-1">
            <div className="h-5 bg-hairline/20 rounded-button flex items-center px-2">
              <span className="text-[10px] font-mono text-primaryText">Pharmacist</span>
            </div>
            <div className="h-5 bg-hairline/20 rounded-button flex items-center px-2">
              <span className="text-[10px] font-mono text-primaryText">Nurse</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    numeral: 'II',
    title: 'Configure your register',
    description: 'Add your controlled substances and set reorder thresholds.',
    ui: (
      <div className="space-y-2">
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">Controlled Substances</div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-primaryText">Oxycodone 5mg</span>
              <span className="text-[10px] font-mono text-secondaryText">Min: 10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-primaryText">Fentanyl 25µg</span>
              <span className="text-[10px] font-mono text-secondaryText">Min: 20</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    numeral: 'III',
    title: 'Start tracking',
    description: 'Log every transaction with dual signatures and automatic audits.',
    ui: (
      <div className="space-y-2">
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">Transaction</div>
          <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
            <div className="text-secondaryText">Drug</div>
            <div className="text-secondaryText text-right">In</div>
            <div className="text-secondaryText text-right">Out</div>
            <div className="text-primaryText">Oxy 5mg</div>
            <div className="text-primaryText text-right">50</div>
            <div className="text-primaryText text-right">0</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-hairline/10 p-2 rounded-button text-center">
            <div className="text-[10px] font-mono text-secondaryText">Signature 1</div>
            <div className="text-xs font-mono text-primaryText mt-1">JD</div>
          </div>
          <div className="flex-1 bg-hairline/10 p-2 rounded-button text-center">
            <div className="text-[10px] font-mono text-secondaryText">Signature 2</div>
            <div className="text-xs font-mono text-primaryText mt-1">SM</div>
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorksNew() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 bg-raisedDark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 07 — HOW IT WORKS
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <svg className="absolute left-4 top-0 bottom-0 w-px h-full" style={{ overflow: 'visible' }}>
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="#26344D"
                strokeWidth="1"
                strokeDasharray="1 1000"
                initial={{ strokeDashoffset: 1000 }}
                style={{ strokeDashoffset: useTransform(pathLength, (v) => 1000 - v * 1000) }}
              />
            </svg>

            {/* Steps */}
            <div className="space-y-16 pl-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Roman numeral background */}
                  <div className="absolute -right-4 top-0 font-heading text-[12vw] font-light text-primaryText/8 leading-none -z-10 text-right w-full">
                    {step.numeral}
                  </div>

                  {/* Dot on the line */}
                  <div className="absolute -left-[15px] top-1 w-2 h-2 rounded-full bg-hairline" />

                  {/* Step content */}
                  <div className="relative z-10">
                    <h3 className="font-heading text-2xl text-primaryText mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-secondaryText max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: UI previews */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="glass-panel rounded-panel p-4">
                {step.ui}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
