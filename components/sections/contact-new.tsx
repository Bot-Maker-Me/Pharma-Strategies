'use client';

import { useState } from 'react';

export function ContactNew() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="bg-raisedDark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Text */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight text-primaryText mb-6">
              Book a demo
            </h2>
            <p className="font-sans text-lg text-secondaryText mb-8">
              Tell us about your facility and we'll show you how our tools can help.
            </p>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-hairline py-3 font-sans text-primaryText placeholder-secondaryText/40 focus:outline-none focus:border-accentRed transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-hairline py-3 font-sans text-primaryText placeholder-secondaryText/40 focus:outline-none focus:border-accentRed transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-transparent border-b border-hairline py-3 font-sans text-primaryText placeholder-secondaryText/40 focus:outline-none focus:border-accentRed transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about your needs"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-hairline py-3 font-sans text-primaryText placeholder-secondaryText/40 focus:outline-none focus:border-accentRed transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-accentRed text-midnight px-6 py-3 rounded-[2px] font-mono text-xs uppercase tracking-widest transition-colors hover:bg-accentRed/90 active:translate-y-1"
            >
              Send request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
