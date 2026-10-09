import Link from 'next/link';
import { SectionLabel } from '@/components/shared/section-label';
import { ArrowRight } from 'lucide-react';

const apps = [
  {
    index: '02',
    name: 'Nursing Home',
    description: 'Medication administration records and care plan documentation.',
    slug: 'nursing-home',
  },
  {
    index: '03',
    name: 'Pharma Portal',
    description: 'Supplier ordering and invoice management for pharmacies.',
    slug: 'pharma-portal',
  },
];

export function AppsTable() {
  return (
    <section className="bg-bone py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel label="§ 02 — OTHER TOOLS" />

        <div className="border border-brass">
          {apps.map((app, index) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="block py-6 px-6 border-t border-brass first:border-t-0 hover:bg-secondarySurface transition-colors group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-1 font-mono text-xs uppercase tracking-widest text-text/60">
                  {app.index}
                </div>
                <div className="md:col-span-3 font-heading text-xl text-text">
                  {app.name}
                </div>
                <div className="md:col-span-6 font-sans text-sm text-text/80">
                  {app.description}
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <span className="font-mono text-xs uppercase tracking-widest text-oxblood flex items-center group-hover:translate-x-1 transition-transform">
                    View app <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
