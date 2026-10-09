'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';

/** App-window chrome — used by every mock so they read as the same product. */
function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-hairline bg-midnight/80">
      <div className="flex items-center gap-2 border-b border-hairline bg-raisedDark/70 px-3 py-2">
        <span aria-hidden className="flex gap-1">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="h-1.5 w-1.5 rounded-full bg-hairline" />
          ))}
        </span>
        <span className="ml-1 truncate font-mono text-[10px] uppercase tracking-widest text-secondaryText">
          {title}
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

/**
 * The same balance, rendered identically in all three apps — the visual proof
 * that the views share one register.
 */
function SharedBalance() {
  return (
    <div className="mt-3 flex items-center justify-between border-t border-hairline pt-2">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-secondaryText">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-supportingBlue ring-1 ring-supportingBlue/40" />
        Shared balance
      </span>
      <span className="font-mono text-[10px] tabular-nums tracking-widest text-primaryText">
        Oxycodone 5mg · 18
      </span>
    </div>
  );
}

const LEDGER_GRID = 'grid grid-cols-[2.6rem_minmax(0,1fr)_1.6rem_1.6rem_1.6rem] gap-1.5';

const appCards = [
  {
    index: '01',
    name: 'Narcotics Ledger',
    category: 'Compliance',
    description: 'The controlled-substance register itself: every movement, every signature.',
    window: 'Narcotics Ledger — Register',
    ui: (
      <>
        <div className={`${LEDGER_GRID} border-b border-hairline pb-1.5`}>
          {['Date', 'Drug', 'In', 'Out', 'Bal'].map((heading, i) => (
            <span
              key={heading}
              className={`font-mono text-[10px] uppercase tracking-widest text-secondaryText ${
                i > 1 ? 'text-right' : ''
              }`}
            >
              {heading}
            </span>
          ))}
        </div>
        <div className="mt-1 space-y-1">
          {[
            ['07 Oct', 'Oxycodone 5mg', '50', '32', '18'],
            ['07 Oct', 'Fentanyl 25µg', '100', '85', '15'],
            ['06 Oct', 'Morphine 10mg', '75', '60', '15'],
          ].map(([date, drug, qtyIn, qtyOut, bal]) => (
            <div key={drug} className={`${LEDGER_GRID} rounded-[4px] bg-hairline/10 px-1.5 py-1`}>
              <span className="font-mono text-[10px] tabular-nums text-primaryText">{date}</span>
              <span className="truncate font-sans text-[10px] text-primaryText">{drug}</span>
              <span className="text-right font-mono text-[10px] tabular-nums text-primaryText">{qtyIn}</span>
              <span className="text-right font-mono text-[10px] tabular-nums text-primaryText">{qtyOut}</span>
              <span className="text-right font-mono text-[10px] tabular-nums text-primaryText">{bal}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          {['JD', 'SM'].map((initials) => (
            <span
              key={initials}
              className="flex h-7 flex-1 items-center justify-center rounded-[4px] bg-hairline/20 font-mono text-[10px] text-primaryText"
            >
              {initials}
            </span>
          ))}
          <span className="flex h-7 items-center rounded-[4px] border border-accentRed/50 px-2 font-mono text-[9px] font-semibold uppercase tracking-widest text-accentRed">
            Verified
          </span>
        </div>
      </>
    ),
  },
  {
    index: '02',
    name: 'Nursing Home',
    category: 'Care operations',
    description: 'Medication administration records at the bedside, written back to the same ledger.',
    window: 'Nursing Home — MAR',
    ui: (
      <>
        <div className="flex items-center justify-between border-b border-hairline pb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
            Bed 12 · Room 204
          </span>
          <span className="font-mono text-[10px] tabular-nums text-secondaryText">2 of 4 given</span>
        </div>
        <div className="mt-2 space-y-1">
          {[
            ['08:00', 'Oxycodone 5mg', 'given'],
            ['12:00', 'Oxycodone 5mg', 'due'],
            ['18:00', 'Oxycodone 5mg', 'scheduled'],
          ].map(([time, drug, state]) => (
            <div
              key={time}
              className="flex items-center justify-between rounded-[4px] bg-hairline/10 px-2 py-1.5"
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-[3px] ${
                    state === 'given' ? 'bg-accentRed/25' : 'bg-hairline/40'
                  }`}
                />
                <span className="font-mono text-[10px] tabular-nums text-primaryText">{time}</span>
                <span className="font-sans text-[10px] text-secondaryText">{drug}</span>
              </span>
              <span
                className={`font-mono text-[9px] uppercase tracking-widest ${
                  state === 'given' ? 'text-accentRed' : 'text-secondaryText'
                }`}
              >
                {state}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[4px] bg-hairline/10 px-2 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
            Nurse signature
          </span>
          <span className="font-mono text-[10px] tabular-nums text-primaryText">SM · 08:04</span>
        </div>
      </>
    ),
  },
  {
    index: '03',
    name: 'Pharma Portal',
    category: 'Operations',
    description: 'Supplier orders and invoices, reconciled against the balances they update.',
    window: 'Pharma Portal — Orders',
    ui: (
      <>
        <div className="flex items-center justify-between border-b border-hairline pb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
            Recent orders
          </span>
          <span className="font-mono text-[10px] tabular-nums text-secondaryText">3 open</span>
        </div>
        <div className="mt-2 space-y-1">
          {[
            ['ORD-2847', 'McKesson', 'Pending'],
            ['ORD-2846', 'Cardinal', 'Shipped'],
            ['INV-1842', 'Amerisource', 'Paid'],
          ].map(([id, supplier, status]) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-[4px] bg-hairline/10 px-2 py-1.5"
            >
              <span className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] tabular-nums text-primaryText">{id}</span>
                <span className="font-sans text-[10px] text-secondaryText">{supplier}</span>
              </span>
              <span
                className={`font-mono text-[9px] uppercase tracking-widest ${
                  status === 'Pending' ? 'text-accentRed' : 'text-secondaryText'
                }`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-[4px] border-l-2 border-l-accentRed bg-accentRed/10 px-2 py-1.5">
          <span className="font-mono text-[10px] text-primaryText">
            Oxycodone 5mg below minimum (10)
          </span>
        </div>
      </>
    ),
  },
];

export function AppsShowcase() {
  return (
    <section className="relative bg-midnight py-28 lg:py-36">
      <div className="ed-container">
        <SectionHeading
          label="§ 06 — APPS"
          title="Apps that share one register"
          description="Each view reads and writes the same ledger, so the balance a pharmacist counts is the balance a nurse administers against."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appCards.map((app, index) => (
            <motion.article
              key={app.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: DESIGN_EASE_ARRAY }}
              className="glass-panel group flex flex-col rounded-panel p-6 transition-transform duration-500 will-change-transform hover:-translate-y-1.5"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                  {app.index}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accentRed">
                  {app.category}
                </span>
              </div>

              <h3 className="mb-2 font-heading text-2xl text-primaryText">{app.name}</h3>
              <p className="mb-6 font-sans text-sm text-secondaryText">{app.description}</p>

              <Window title={app.window}>
                {app.ui}
                <SharedBalance />
              </Window>

              <div className="mt-6 flex items-center border-t border-hairline pt-4">
                <Link
                  href="/apps"
                  className="inline-flex items-center font-mono text-[10px] uppercase tracking-widest text-accentRed transition-colors hover:text-primaryText"
                >
                  Open in apps
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
