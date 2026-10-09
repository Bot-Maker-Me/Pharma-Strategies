'use client';

import { Reveal } from '@/components/shared/reveal';

const logos = [
  'Pfizer', 'Novartis', 'Roche', 'Merck', 'Bayer', 'Sanofi',
];

export function TrustBar() {
  return (
    <section className="border-y border-navy-100 bg-white/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-medium text-navy-400">
            Trusted by pharmaceutical leaders worldwide
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo, i) => (
            <Reveal key={logo} delay={i * 0.08}>
              <span className="text-xl font-heading font-bold text-navy-300 grayscale transition-all hover:text-navy-500 hover:grayscale-0">
                {logo}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
