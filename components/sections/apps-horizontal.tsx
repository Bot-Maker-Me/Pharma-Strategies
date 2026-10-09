'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';

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
          {['12:00', '18:00'].map((time) => (
            <div key={time} className="flex justify-between items-center bg-hairline/10 p-2 rounded">
              <span className="text-[10px] font-mono text-primaryText">{time} - Oxycodone 5mg</span>
              <span className="text-[10px] font-mono text-secondaryText">—</span>
            </div>
          ))}
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
          {[
            ['ORD-2847', 'McKesson', 'Pending', 'text-secondaryText'],
            ['ORD-2846', 'Cardinal', 'Shipped', 'text-primaryText'],
            ['INV-1842', 'Amerisource', 'Paid', 'text-primaryText'],
          ].map(([id, supplier, status, statusClass]) => (
            <div key={id} className="flex justify-between items-center bg-hairline/10 p-2 rounded">
              <div>
                <div className="text-[10px] font-mono text-primaryText">{id}</div>
                <div className="text-[10px] font-mono text-secondaryText">{supplier}</div>
              </div>
              <span className={`text-[10px] font-mono ${statusClass}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function AppsHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[280vh] bg-midnight">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="§ 06 — APPS"
            title="Apps that share one register"
            description="Each app reads and writes the same ledger, so the counts never diverge."
            size="compact"
          />
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-8 pl-4 pr-4 will-change-transform sm:pl-6 lg:pl-8"
        >
          {apps.map((app) => (
            <div
              key={app.slug}
              className="w-[80vw] max-w-[620px] flex-shrink-0 md:w-[46vw]"
            >
              <Link href={`/apps/${app.slug}`} className="block group">
                <div className="relative aspect-video bg-raisedDark mb-6 overflow-hidden rounded-panel border border-hairline">
                  <div className="absolute inset-0 bg-midnight/40 mix-blend-multiply" />
                  <div className="absolute inset-4 bg-hairline/10 border border-hairline/30 p-4 transition-transform duration-700 group-hover:scale-[1.04]">
                    {app.ui}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-2">
                    {app.index}
                  </p>
                  <h3
                    className={`font-heading text-primaryText mb-2 ${
                      app.featured ? 'text-4xl' : 'text-2xl'
                    }`}
                  >
                    {app.name}
                  </h3>
                  <p className="font-sans text-secondaryText mb-4">{app.description}</p>
                </div>

                <div className="flex items-center text-accentRed">
                  <span className="font-mono text-xs uppercase tracking-widest transition-transform group-hover:translate-x-1">
                    View app
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-1 overflow-hidden rounded-full bg-hairline">
            <motion.div className="h-full origin-left bg-accentRed" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}
