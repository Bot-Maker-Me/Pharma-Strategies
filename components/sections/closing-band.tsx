'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SplitText } from '@/components/react-bits';

export function ClosingBand() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const inputClass =
    'w-full bg-transparent border-b border-hairline py-3 font-sans text-primaryText placeholder-secondaryText/40 focus:outline-none focus:border-accentRed transition-colors';

  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full glow-blue opacity-20" />
        <div className="w-96 h-96 rounded-full glow-red opacity-10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Statement and CTA */}
          <div>
            <h2 className="font-heading text-[clamp(2rem,6vw,5rem)] font-light leading-tight text-primaryText mb-8">
              <SplitText text="Make every count count." delay={32} />
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-accentRed text-midnight px-6 py-3 rounded-button font-mono text-xs uppercase tracking-widest transition-colors hover:bg-accentRed/90 active:translate-y-1"
            >
              Book a demo
            </Link>
          </div>

          {/* Right: Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="text"
              placeholder="Company name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={inputClass}
              required
            />
            <textarea
              placeholder="Tell us about your needs"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className={`${inputClass} resize-none`}
              required
            />
            <button
              type="submit"
              className="bg-accentRed text-midnight px-6 py-3 rounded-button font-mono text-xs uppercase tracking-widest transition-colors hover:bg-accentRed/90 active:translate-y-1"
            >
              Send request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
