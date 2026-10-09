'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/shared/section-label';

export function PricingTable() {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      name: 'Starter',
      monthly: 49,
      yearly: 44,
      recommended: false,
    },
    {
      name: 'Professional',
      monthly: 149,
      yearly: 134,
      recommended: true,
    },
    {
      name: 'Enterprise',
      monthly: 349,
      yearly: 314,
      recommended: false,
    },
  ];

  const features = [
    { name: 'Facilities', starter: '1', pro: '5', enterprise: 'Unlimited' },
    { name: 'Staff users', starter: '50', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Apps included', starter: '1', pro: 'All', enterprise: 'All' },
    { name: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
    { name: 'Support', starter: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
    { name: 'Integrations', starter: '—', pro: 'Standard', enterprise: 'Custom' },
    { name: 'SSO', starter: '—', pro: '—', enterprise: 'Yes' },
  ];

  return (
    <section className="bg-midnight py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel label="§ 05 — PRICING" />

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

        {/* Pricing table */}
        <div className="border border-hairline overflow-hidden bg-midnight">
          {/* Header row */}
          <div className="grid grid-cols-4 border-b border-hairline">
            <div className="p-4 font-mono text-xs uppercase tracking-widest text-primaryText">
              Feature
            </div>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-4 text-center relative ${plan.recommended ? 'bg-raisedDark border-t-2 border-accentRed' : ''}`}
              >
                {plan.recommended && (
                  <span className="absolute top-2 right-2 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                    Recommended
                  </span>
                )}
                <div className={`font-heading text-xl mb-1 ${plan.recommended ? 'text-primaryText' : 'text-primaryText'}`}>
                  {plan.name}
                </div>
                <div className={`font-mono text-2xl ${plan.recommended ? 'text-primaryText' : 'text-primaryText'}`}>
                  ${isMonthly ? plan.monthly : plan.yearly}
                  <span className="text-sm text-secondaryText">/mo</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-4 border-b border-hairline last:border-b-0"
            >
              <div className="p-4 font-sans text-sm text-primaryText">
                {feature.name}
              </div>
              <div className="p-4 text-center font-mono text-sm text-secondaryText">
                {feature.starter}
              </div>
              <div className={`p-4 text-center font-mono text-sm ${plans[1].recommended ? 'bg-raisedDark text-primaryText' : 'text-secondaryText'}`}>
                {feature.pro}
              </div>
              <div className="p-4 text-center font-mono text-sm text-secondaryText">
                {feature.enterprise}
              </div>
            </div>
          ))}

          {/* Button row */}
          <div className="grid grid-cols-4">
            <div className="p-4" />
            <div className="p-4 text-center">
              <button className="font-mono text-xs uppercase tracking-widest border-2 border-hairline text-secondaryText px-4 py-2 rounded-[2px] hover:border-accentRed hover:text-accentRed transition-colors">
                Get started
              </button>
            </div>
            <div className="p-4 text-center bg-raisedDark">
              <button className="font-mono text-xs uppercase tracking-widest bg-accentRed text-midnight px-4 py-2 rounded-[2px] hover:bg-accentRed/90 transition-colors">
                Get started
              </button>
            </div>
            <div className="p-4 text-center">
              <button className="font-mono text-xs uppercase tracking-widest border-2 border-hairline text-secondaryText px-4 py-2 rounded-[2px] hover:border-accentRed hover:text-accentRed transition-colors">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
