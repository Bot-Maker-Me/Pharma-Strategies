'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const apps = [
  {
    index: '01',
    name: 'Narcotics Ledger',
    description: 'Controlled-substance tracking with dual signatures.',
    slug: 'narcotics-ledger',
    featured: true,
    ui: (
      <div className="space-y-2 p-4">
        <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
          <div className="text-secondaryText">Date</div>
          <div className="text-secondaryText">Drug</div>
          <div className="text-secondaryText text-right">In</div>
          <div className="text-secondaryText text-right">Bal</div>
          <div className="text-primaryText">07 Oct</div>
          <div className="text-primaryText">Oxy 5mg</div>
          <div className="text-primaryText text-right">50</div>
          <div className="text-primaryText text-right">18</div>
          <div className="text-primaryText">07 Oct</div>
          <div className="text-primaryText">Fent 25µg</div>
          <div className="text-primaryText text-right">100</div>
          <div className="text-primaryText text-right">15</div>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="flex-1 bg-hairline/20 p-2 rounded text-center">
            <span className="text-[10px] font-mono text-primaryText">JD</span>
          </div>
          <div className="flex-1 bg-hairline/20 p-2 rounded text-center">
            <span className="text-[10px] font-mono text-primaryText">SM</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    index: '02',
    name: 'Nursing Home',
    description: 'Medication administration records and care plans.',
    slug: 'nursing-home',
    featured: false,
    ui: (
      <div className="space-y-2 p-4">
        <div className="text-[10px] font-mono text-secondaryText mb-2">MAR - Bed 12</div>
        <div className="space-y-1">
          <div className="flex justify-between items-center bg-hairline/10 p-2 rounded">
            <span className="text-[10px] font-mono text-primaryText">08:00 - Oxycodone 5mg</span>
            <span className="text-[10px] font-mono text-accentRed">✓</span>
          </div>
          <div className="flex justify-between items-center bg-hairline/10 p-2 rounded">
            <span className="text-[10px] font-mono text-primaryText">12:00 - Oxycodone 5mg</span>
            <span className="text-[10px] font-mono text-secondaryText">—</span>
          </div>
          <div className="flex justify-between items-center bg-hairline/10 p-2 rounded">
            <span className="text-[10px] font-mono text-primaryText">18:00 - Oxycodone 5mg</span>
            <span className="text-[10px] font-mono text-secondaryText">—</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    index: '03',
    name: 'Pharma Portal',
    description: 'Supplier ordering and invoice management for pharmacies.',
    slug: 'pharma-portal',
    featured: false,
    ui: (
      <div className="space-y-2 p-4">
        <div className="text-[10px] font-mono text-secondaryText mb-2">Recent Orders</div>
        <div className="space-y-1">
          <div className="flex justify-between items-center bg-hairline/10 p-2 rounded">
            <div>
              <div className="text-[10px] font-mono text-primaryText">ORD-2847</div>
              <div className="text-[10px] font-mono text-secondaryText">McKesson</div>
            </div>
            <span className="text-[10px] font-mono text-secondaryText">Pending</span>
          </div>
          <div className="flex justify-between items-center bg-hairline/10 p-2 rounded">
            <div>
              <div className="text-[10px] font-mono text-primaryText">ORD-2846</div>
              <div className="text-[10px] font-mono text-secondaryText">Cardinal</div>
            </div>
            <span className="text-[10px] font-mono text-primaryText">Shipped</span>
          </div>
          <div className="flex justify-between items-center bg-hairline/10 p-2 rounded">
            <div>
              <div className="text-[10px] font-mono text-primaryText">INV-1842</div>
              <div className="text-[10px] font-mono text-secondaryText">Amerisource</div>
            </div>
            <span className="text-[10px] font-mono text-primaryText">Paid</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function AppsHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -2000]);

  return (
    <section ref={containerRef} className="py-32 bg-midnight overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 05 — APPS
        </p>

        <motion.div
          style={{ x }}
          className="flex gap-8"
        >
          {apps.map((app, index) => (
            <motion.div
              key={app.slug}
              className={`flex-shrink-0 ${app.featured ? 'w-[70vw]' : 'w-[70vw]'} md:w-[50vw]`}
            >
              <Link href={`/apps/${app.slug}`} className="block group">
                {/* Photo slot with overlay */}
                <div className="relative aspect-video bg-raisedDark mb-6 overflow-hidden rounded-panel border border-hairline">
                  <div className="absolute inset-0 bg-midnight/40 mix-blend-multiply" />
                  {/* UI preview */}
                  <div className="absolute inset-4 bg-hairline/10 border border-hairline/30 p-4 group-hover:scale-105 transition-transform duration-700">
                    {app.ui}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-2">
                    {app.index}
                  </p>
                  <h3 className={`font-heading text-primaryText mb-2 ${app.featured ? 'text-4xl' : 'text-2xl'}`}>
                    {app.name}
                  </h3>
                  <p className="font-sans text-secondaryText mb-4">
                    {app.description}
                  </p>
                </div>

                <div className="flex items-center text-accentRed">
                  <span className="font-mono text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    View app
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="mt-8 h-1 bg-hairline rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accentRed"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}
