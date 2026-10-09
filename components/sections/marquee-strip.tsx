'use client';

import { Marquee } from '@/components/magicui/marquee';

const facilities = [
  'Retail pharmacies',
  'Nursing homes',
  'Care facilities',
  'Hospital dispensaries',
  'Compounding pharmacies',
];

const capabilities = [
  'Dual signatures',
  'Audit export',
  'Discrepancy alerts',
  'Cycle counts',
  'Role-based access',
  'Bedside checks',
];

function Row({
  items,
  tone,
  reverse,
}: {
  items: string[];
  tone: 'muted' | 'accent';
  reverse?: boolean;
}) {
  return (
    <Marquee
      reverse={reverse}
      pauseOnHover
      repeat={3}
      className="p-0 [--duration:46s] [--gap:2.5rem]"
      aria-hidden
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-[var(--gap)]">
          <span
            className={
              tone === 'accent'
                ? 'font-mono text-xs uppercase tracking-widest text-secondaryText/70'
                : 'font-mono text-xs uppercase tracking-widest text-secondaryText'
            }
          >
            {item}
          </span>
          <span className="text-accentRed">·</span>
        </span>
      ))}
    </Marquee>
  );
}

export function MarqueeStrip() {
  return (
    <section
      className="relative overflow-hidden border-y border-hairline bg-midnight py-5"
      aria-label="Where Pharma Strategies is used, and what it records"
    >
      <Row items={facilities} tone="muted" />
      <div aria-hidden className="mx-auto my-4 h-px w-full max-w-7xl bg-hairline/60" />
      <Row items={capabilities} tone="accent" reverse />
    </section>
  );
}
