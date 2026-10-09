'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/shared/section-label';

const apps = [
  {
    index: '01',
    name: 'Narcotics Ledger',
    description: 'Track every controlled substance with dual signatures.',
    slug: 'narcotics-ledger',
    featured: true,
  },
  {
    index: '02',
    name: 'Nursing Home',
    description: 'Medication administration records and care plans.',
    slug: 'nursing-home',
    featured: false,
  },
  {
    index: '03',
    name: 'Pharma Portal',
    description: 'Supplier ordering and invoice management.',
    slug: 'pharma-portal',
    featured: false,
  },
];

export function AppsCards() {
  return (
    <section className="bg-midnight py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel label="§ 01 — THE REGISTER" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className={`group border border-hairline rounded-[2px] overflow-hidden transition-all ${
                app.featured ? 'md:col-span-1' : ''
              }`}
            >
              {/* Ledger graphic placeholder */}
              <div className="relative aspect-[4/3] bg-raisedDark overflow-hidden">
                <div className="absolute inset-0 bg-midnight/40 mix-blend-multiply" />
                {/* Styled ledger-page graphic */}
                <div className="absolute inset-4 bg-creamSheet/10 border border-hairline/30 p-4 group-hover:scale-105 transition-transform duration-700">
                  <div className="space-y-2">
                    <div className="h-2 bg-primaryText/20 w-3/4" />
                    <div className="h-2 bg-primaryText/20 w-1/2" />
                    <div className="h-2 bg-primaryText/20 w-2/3" />
                    <div className="h-2 bg-primaryText/20 w-1/3" />
                    <div className="h-2 bg-primaryText/20 w-3/4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-raisedDark">
                <div className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-2">
                  {app.index}
                </div>
                <h3 className="font-heading text-2xl text-primaryText mb-2">
                  {app.name}
                </h3>
                <p className="font-sans text-sm text-secondaryText mb-4">
                  {app.description}
                </p>
                <div className="flex items-center text-accentRed">
                  <span className="font-mono text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    View app
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
