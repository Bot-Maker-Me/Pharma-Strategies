'use client';

import {
  ShieldCheck,
  FileSearch,
  Server,
  Lock,
} from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';

const features = [
  {
    icon: ShieldCheck,
    title: 'GxP-Ready',
    description:
      'Every app is built to GxP standards with validated workflows, electronic signatures, and 21 CFR Part 11 compliance.',
  },
  {
    icon: FileSearch,
    title: 'Audit Trails',
    description:
      'Immutable, time-stamped audit logs on every action. Export-ready for FDA, EMA, and internal QA reviews.',
  },
  {
    icon: Server,
    title: '99.99% Uptime',
    description:
      'Enterprise-grade infrastructure with multi-region redundancy, automated failover, and a 99.99% SLA.',
  },
  {
    icon: Lock,
    title: 'SOC 2 Type II',
    description:
      'Independently audited and certified. Data encrypted at rest and in transit, with granular access controls.',
  },
];

export function WhyPharmaSuite() {
  return (
    <section className="bg-navy-50/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Why Pharma Strategies
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Built from the ground up for regulated industries. Every layer is
            designed with compliance, security, and reliability in mind.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                  <feature.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
