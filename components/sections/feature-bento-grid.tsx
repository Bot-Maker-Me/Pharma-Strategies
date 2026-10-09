'use client';

import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/shared/section-heading';
import { cn } from '@/lib/utils';

interface Feature {
  number: string;
  title: string;
  description: string;
  size: 'large' | 'medium' | 'small';
  ui: ReactNode;
}

const features: Feature[] = [
  {
    number: '01',
    title: 'Audit Log',
    description: 'Complete transaction history with timestamps',
    size: 'large',
    ui: (
      <div className="space-y-1 mt-4">
        {[
          ['09:42', 'JD received Oxycodone 5mg'],
          ['09:44', 'SM signed transaction'],
          ['09:45', 'Verified completed'],
          ['10:12', 'AR administered dose'],
        ].map(([time, event]) => (
          <div key={time} className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-secondaryText">{time}</span>
            <span className="text-primaryText">{event}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '02',
    title: 'Dual Signatures',
    description: 'Required approvals for every controlled substance',
    size: 'medium',
    ui: (
      <div className="flex gap-2 mt-4">
        <div className="flex-1 bg-hairline/10 p-2 rounded-button text-center">
          <div className="text-[10px] font-mono text-secondaryText">Signature 1</div>
          <div className="text-xs font-mono text-primaryText mt-1">JD</div>
          <div className="text-[10px] font-mono text-secondaryText">09:42</div>
        </div>
        <div className="flex-1 bg-hairline/10 p-2 rounded-button text-center">
          <div className="text-[10px] font-mono text-secondaryText">Signature 2</div>
          <div className="text-xs font-mono text-primaryText mt-1">SM</div>
          <div className="text-[10px] font-mono text-secondaryText">09:44</div>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Discrepancy Alerts',
    description: 'Real-time notifications for count mismatches',
    size: 'medium',
    ui: (
      <div className="space-y-1 mt-4">
        <div className="bg-hairline/10 p-2 rounded-button border-l-2 border-l-accentRed">
          <div className="text-[10px] font-mono text-accentRed">Oxycodone 5mg: count off by 2</div>
        </div>
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-primaryText">Fentanyl 25µg: reconciled</div>
        </div>
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-primaryText">Morphine 10mg: on track</div>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Role-Based Access',
    description: 'Granular permissions for staff and administrators',
    size: 'small',
    ui: (
      <div className="space-y-1 mt-4">
        {['Pharmacist', 'Nurse', 'Admin'].map((role) => (
          <div key={role} className="flex items-center gap-2">
            <div className="w-3 h-3 bg-hairline/30 rounded" />
            <span className="text-[10px] font-mono text-primaryText">{role}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '05',
    title: 'Report Export',
    description: 'Generate compliance-ready audit reports',
    size: 'small',
    ui: (
      <div className="mt-4 bg-hairline/10 p-2 rounded-button flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-8 bg-hairline/20 rounded flex items-center justify-center">
            <span className="text-[10px] font-mono text-secondaryText">PDF</span>
          </div>
          <span className="text-[10px] font-mono text-primaryText">Audit report.pdf</span>
        </div>
        <div className="text-[10px] font-mono text-accentRed">Export</div>
      </div>
    ),
  },
  {
    number: '06',
    title: 'Mobile Check',
    description: 'Bedside verification with QR code scanning',
    size: 'small',
    ui: (
      <div className="mt-4">
        <div className="bg-hairline/10 p-2 rounded-button border border-hairline/30">
          <div className="text-[10px] font-mono text-secondaryText mb-1">Mobile Check</div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-hairline/20 rounded flex items-center justify-center">
              <span className="text-[10px] font-mono text-primaryText">✓</span>
            </div>
            <span className="text-[10px] font-mono text-primaryText">Scanned: Bed 12</span>
          </div>
        </div>
      </div>
    ),
  },
];

const sizeClass: Record<Feature['size'], string> = {
  large: 'md:col-span-2 md:row-span-2',
  medium: 'md:col-span-1 md:row-span-1',
  small: 'md:col-span-1 md:row-span-1',
};

function BentoCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={(event) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        el.style.setProperty('--my', `${event.clientY - rect.top}px`);
      }}
      className={cn(
        'group glass-panel relative overflow-hidden rounded-panel p-6 transition-[transform,border-color] duration-500 will-change-transform hover:-translate-y-1 hover:border-accentRed/30',
        sizeClass[feature.size]
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(237,230,218,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-2">
          {feature.number}
        </p>
        <h3 className="font-heading text-xl text-primaryText mb-2">{feature.title}</h3>
        <p className="font-sans text-sm text-secondaryText">{feature.description}</p>
        {feature.ui}
      </div>
    </motion.div>
  );
}

export function FeatureBentoGrid() {
  return (
    <section className="bg-midnight py-28 lg:py-36">
      <div className="ed-container">
        <SectionHeading
          label="§ 03 — FEATURES"
          title="The register, in six parts"
          description="Each part exists because a count had to be proven later: who touched it, when, and with whose signature."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <BentoCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
