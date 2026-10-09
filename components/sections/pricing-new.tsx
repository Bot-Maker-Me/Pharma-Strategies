'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/section-heading';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    blurb: 'One site finding its feet.',
    monthly: 49,
    yearly: 44,
    recommended: false,
    features: ['1 facility', '50 staff users', '1 app included', 'Basic reporting', 'Email support', '—', '—'],
  },
  {
    name: 'Professional',
    blurb: 'Multiple sites, full team.',
    monthly: 149,
    yearly: 134,
    recommended: true,
    features: ['5 facilities', 'Unlimited staff', 'All apps included', 'Advanced analytics', 'Priority support', 'Standard integrations', '—'],
  },
  {
    name: 'Enterprise',
    blurb: 'Groups and health systems.',
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
    <section className="bg-midnight py-28 lg:py-36">
      <div className="ed-container">
        <SectionHeading
          label="§ 08 — PRICING"
          title="Priced per facility"
          description="Same register on every plan. What changes is how many facilities and staff it covers."
        />

        {/* Billing period */}
        <div className="mb-14 inline-flex rounded-button border border-hairline p-1">
          {[
            { label: 'Monthly', value: true },
            { label: 'Yearly', value: false },
          ].map((option) => {
            const active = isMonthly === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => setIsMonthly(option.value)}
                aria-pressed={active}
                className={cn(
                  'rounded-[2px] px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors',
                  active ? 'bg-raisedDark text-primaryText' : 'text-secondaryText hover:text-primaryText'
                )}
              >
                {option.label}
              </button>
            );
          })}
          <span className="px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-secondaryText/70">
            Save 10%
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, planIndex) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: planIndex * 0.1, ease: DESIGN_EASE_ARRAY }}
              className={cn(
                'glass-panel flex flex-col rounded-panel p-8',
                plan.recommended && 'panel-lift border-accentRed/40'
              )}
            >
              {plan.recommended ? (
                <span aria-hidden className="mb-6 block h-px w-full bg-accentRed" />
              ) : (
                <span aria-hidden className="mb-6 block h-px w-full bg-hairline" />
              )}

              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-heading text-2xl text-primaryText">{plan.name}</h3>
                {plan.recommended ? (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accentRed">
                    Recommended
                  </span>
                ) : null}
              </div>

              <p className="mb-6 font-sans text-sm text-secondaryText">{plan.blurb}</p>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="font-heading text-5xl leading-none text-primaryText tabular-nums">
                  ${isMonthly ? plan.monthly : plan.yearly}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                  / facility / mo
                </span>
              </div>

              <dl className="mb-8 flex-1">
                {featureLabels.map((label, index) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline/60 py-3 last:border-b-0"
                  >
                    <dt className="font-sans text-sm text-secondaryText">{label}</dt>
                    <dd
                      className={cn(
                        'text-right font-mono text-xs',
                        plan.features[index] === '—'
                          ? 'text-secondaryText/40'
                          : 'text-primaryText'
                      )}
                    >
                      {plan.features[index]}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/contact"
                className={cn(
                  'block rounded-button px-5 py-3.5 text-center font-mono text-[11px] uppercase tracking-widest transition-colors',
                  plan.recommended
                    ? 'bg-accentRed text-midnight shadow-[0_24px_60px_-28px_rgba(194,59,59,0.85)] hover:bg-accentRedBright'
                    : 'border border-hairline text-secondaryText hover:border-accentRed hover:text-accentRed'
                )}
              >
                {plan.name === 'Enterprise' ? 'Talk to us' : 'Start here'}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-secondaryText/70">
          Prices in USD per facility · billed monthly or yearly · taxes excluded
        </p>
      </div>
    </section>
  );
}
