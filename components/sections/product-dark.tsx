import Link from 'next/link';
import { SectionLabel } from '@/components/shared/section-label';
import { ArrowRight } from 'lucide-react';

export function ProductDark() {
  return (
    <section className="bg-raisedDark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel label="§ 02 — NARCOTICS LEDGER" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text content */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight text-primaryText mb-6">
              Track every controlled substance from delivery to dispensing.
            </h2>
            <p className="font-sans text-lg text-secondaryText mb-8">
              Built for nursing homes, pharmacies, and care facilities that need precise, auditable records.
            </p>

            <Link
              href="/apps/narcotics-ledger"
              className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-accentRed transition-colors hover:text-primaryText group"
            >
              View app
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Real interface mockup */}
          <div className="border border-hairline bg-midnight p-4">
            <div className="bg-midnight border border-hairline p-4">
              {/* Interface */}
              <div className="flex gap-4">
                {/* Sidebar */}
                <div className="w-48 space-y-1">
                  <div className="font-mono text-xs uppercase tracking-widest text-primaryText mb-3">Navigation</div>
                  <div className="h-8 bg-hairline/30 rounded-[2px] flex items-center px-3">
                    <span className="font-mono text-xs text-primaryText">Register</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-[2px] flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Deliveries</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-[2px] flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Discrepancies</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-[2px] flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Audit log</span>
                  </div>
                  <div className="h-6 bg-hairline/10 rounded-[2px] flex items-center px-3">
                    <span className="font-mono text-xs text-secondaryText">Staff</span>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 space-y-2">
                  {/* Header */}
                  <div className="h-10 bg-hairline/20 rounded-[2px] flex items-center px-4">
                    <span className="font-heading text-sm text-primaryText">Narcotics Register</span>
                  </div>

                  {/* Table header */}
                  <div className="grid grid-cols-5 gap-2 bg-hairline/10 p-2 rounded-[2px]">
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
                      <div key={i} className="grid grid-cols-5 gap-2 bg-hairline/5 p-2 rounded-[2px]">
                        <div className="font-mono text-xs text-primaryText tabular-nums">{row.date}</div>
                        <div className="font-sans text-xs text-primaryText">{row.drug}</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.in}</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.out}</div>
                        <div className="font-mono text-xs text-primaryText text-right tabular-nums">{row.bal}</div>
                      </div>
                    ))}

                    {/* Discrepancy row with red left border */}
                    <div className="grid grid-cols-5 gap-2 bg-accentRed/10 p-2 rounded-[2px] border-l-2 border-accentRed">
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
                  <div className="mt-4 p-4 bg-hairline/10 border border-hairline rounded-[2px]">
                    <div className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-3">Dual Signatures</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-hairline/20 rounded-[2px] flex items-center justify-center">
                        <span className="font-mono text-sm text-primaryText">JD</span>
                      </div>
                      <div className="h-16 bg-hairline/20 rounded-[2px] flex items-center justify-center">
                        <span className="font-mono text-sm text-primaryText">SM</span>
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
