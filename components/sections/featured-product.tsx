import Link from 'next/link';
import { SectionLabel } from '@/components/shared/section-label';
import { ArrowRight } from 'lucide-react';

export function FeaturedProduct() {
  const features = [
    'Real-time inventory tracking with dual signatures',
    'Automated discrepancy alerts and reconciliation',
    'DEA-compliant audit trails and reporting',
    'Mobile access for bedside verification',
  ];

  return (
    <section className="bg-bone py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel label="§ 01 — THE REGISTER" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text content */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight text-text mb-6">
              Narcotics Ledger
            </h2>
            <p className="font-sans text-lg text-text/80 mb-8">
              Track every controlled substance from delivery to dispensing. Built for nursing homes, pharmacies, and care facilities that need precise, auditable records.
            </p>

            {/* Features as ruled rows */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="py-3 border-t border-brass last:border-b"
                >
                  <p className="font-sans text-sm text-text">{feature}</p>
                </div>
              ))}
            </div>

            <Link
              href="/apps/narcotics-ledger"
              className="inline-flex items-center mt-8 font-mono text-xs uppercase tracking-widest text-oxblood transition-colors hover:text-text group"
            >
              View app
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Product screenshot placeholder */}
          <div className="border border-brass p-4 bg-white">
            <div className="aspect-video bg-secondarySurface/30 flex items-center justify-center">
              <p className="font-mono text-xs uppercase tracking-widest text-text/40">
                App screenshot
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
