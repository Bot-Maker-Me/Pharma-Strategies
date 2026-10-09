'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    monthly: 49,
    yearly: 44,
    recommended: false,
    features: ['1 facility', '50 staff users', '1 app included', 'Basic reporting', 'Email support', '—', '—'],
  },
  {
    name: 'Professional',
    monthly: 149,
    yearly: 134,
    recommended: true,
    features: ['5 facilities', 'Unlimited staff', 'All apps included', 'Advanced analytics', 'Priority support', 'Standard integrations', '—'],
  },
  {
    name: 'Enterprise',
    monthly: 349,
    yearly: 314,
    recommended: false,
    features: ['Unlimited', 'Unlimited', 'All apps included', 'Custom analytics', 'Dedicated support', 'Custom integrations', 'Account manager'],
  },
];

const featureLabels = ['Facilities', 'Staff users', 'Apps included', 'Reporting level', 'Support level', 'Integrations', 'Account manager'];

export function PricingNew() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className="py-24 bg-midnight">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 06 — PRICING
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => setIsMonthly(true)}
            className={`font-mono text-xs uppercase tracking-widest transition-colors ${
              isMonthly ? 'text-accentRed underline underline-offset-4' : 'text-secondaryText hover:text-primaryText'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`font-mono text-xs uppercase tracking-widest transition-colors ${
              !isMonthly ? 'text-accentRed underline underline-offset-4' : 'text-secondaryText hover:text-primaryText'
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Pricing columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, planIndex) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: planIndex * 0.1 }}
              className={`glass-panel rounded-panel p-6 relative ${
                plan.recommended ? 'bg-raisedDark border-t-2 border-t-accentRed' : ''
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-accentRed bg-midnight px-3 py-1">
                  Recommended
                </span>
              )}
              <h3 className="font-heading text-2xl text-primaryText mb-2">{plan.name}</h3>
              <div className="font-heading text-4xl text-primaryText mb-6">
                ${isMonthly ? plan.monthly : plan.yearly}
                <span className="text-sm text-secondaryText">/mo</span>
              </div>

              <div className="space-y-3 mb-8">
                {featureLabels.map((label, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="font-sans text-sm text-primaryText">{label}</span>
                    <span className={`font-mono text-sm ${plan.recommended ? 'text-primaryText' : 'text-secondaryText'}`}>
                      {plan.features[i]}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className={`block text-center font-mono text-xs uppercase tracking-widest px-4 py-3 rounded-button transition-colors ${
                  plan.recommended
                    ? 'bg-accentRed text-midnight hover:bg-accentRed/90'
                    : 'border-2 border-hairline text-secondaryText hover:border-accentRed hover:text-accentRed'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
