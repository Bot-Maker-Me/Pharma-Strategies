'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    number: '01',
    title: 'Audit Log',
    description: 'Complete transaction history with timestamps',
    size: 'large',
    ui: (
      <div className="space-y-1 mt-4">
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-secondaryText">09:42</span>
          <span className="text-primaryText">JD received Oxycodone 5mg</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-secondaryText">09:44</span>
          <span className="text-primaryText">SM signed transaction</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-secondaryText">09:45</span>
          <span className="text-primaryText">Verified completed</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-secondaryText">10:12</span>
          <span className="text-primaryText">AR administered dose</span>
        </div>
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
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-hairline/30 rounded"></div>
          <span className="text-[10px] font-mono text-primaryText">Pharmacist</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-hairline/30 rounded"></div>
          <span className="text-[10px] font-mono text-primaryText">Nurse</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-hairline/30 rounded"></div>
          <span className="text-[10px] font-mono text-primaryText">Admin</span>
        </div>
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
        <div className="bg-hairline/10 p-2 rounded-button border-2 border-hairline/30">
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

export function FeatureBentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return '';
    }
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="py-24 bg-midnight"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 03 — FEATURES
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-panel rounded-panel p-6 relative overflow-hidden ${getSizeClass(feature.size)}`}
              style={{
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 200) / 100}deg) rotateY(${-(mousePosition.x - 400) / 100}deg)`,
              }}
            >
              {/* Light sheen following cursor */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 150px)`,
                }}
              />

              <div className="relative z-10">
                <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-2">
                  {feature.number}
                </p>
                <h3 className="font-heading text-xl text-primaryText mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-secondaryText">
                  {feature.description}
                </p>
                {feature.ui}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
