import { SectionLabel } from '@/components/shared/section-label';

export function WhyUs() {
  const points = [
    { number: '01', text: 'Audit trails built into every transaction' },
    { number: '02', text: 'Electronic signatures with timestamps' },
    { number: '03', text: 'Role-based access for staff and administrators' },
    { number: '04', text: 'Automated discrepancy alerts and reconciliation' },
  ];

  return (
    <section className="bg-midnight py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel label="§ 03 — WHY US" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Large statement */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight text-primaryText">
              Compliance is not optional. Documentation should not be a burden.
            </h2>
          </div>

          {/* Right: List of points with giant numerals */}
          <div className="space-y-0">
            {points.map((point, index) => (
              <div
                key={index}
                className="py-6 border-t border-hairline last:border-b relative"
              >
                <div className="font-heading text-6xl md:text-7xl font-light text-accentRed/10 absolute -top-4 left-0">
                  {point.number}
                </div>
                <p className="font-sans text-lg text-primaryText relative z-10 pl-20">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
