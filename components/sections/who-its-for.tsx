'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  {
    id: 'pharmacist',
    name: 'Pharmacist',
    benefits: [
      'Track all controlled substances in one place',
      'Comply with DEA regulations effortlessly',
      'Reduce paperwork and save hours daily',
    ],
    ui: (
      <div className="w-full space-y-2">
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">Register</div>
          <div className="grid grid-cols-4 gap-1 text-[10px] font-mono">
            <div className="text-secondaryText">Drug</div>
            <div className="text-secondaryText text-right">In</div>
            <div className="text-secondaryText text-right">Out</div>
            <div className="text-secondaryText text-right">Bal</div>
            <div className="text-primaryText">Oxy 5mg</div>
            <div className="text-primaryText text-right">50</div>
            <div className="text-primaryText text-right">32</div>
            <div className="text-primaryText text-right">18</div>
          </div>
        </div>
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">Reconcile</div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accentRed/20 rounded flex items-center justify-center">
              <span className="text-[8px] font-mono text-accentRed">!</span>
            </div>
            <span className="text-[10px] font-mono text-primaryText">Discrepancy detected</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'nurse',
    name: 'Nurse',
    benefits: [
      'Quick bedside verification with mobile',
      'Medication administration records built-in',
      'Alerts for discrepancies and missing doses',
    ],
    ui: (
      <div className="w-full">
        <div className="bg-hairline/10 p-4 rounded-button border-2 border-hairline/30 max-w-[200px] mx-auto">
          <div className="text-[10px] font-mono text-secondaryText mb-2">Mobile Check</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-hairline/20 rounded flex items-center justify-center">
                <span className="text-[10px] font-mono text-primaryText">✓</span>
              </div>
              <span className="text-[10px] font-mono text-primaryText">Bed 12: Oxycodone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-hairline/20 rounded flex items-center justify-center">
                <span className="text-[10px] font-mono text-primaryText">✓</span>
              </div>
              <span className="text-[10px] font-mono text-primaryText">Bed 14: Fentanyl</span>
            </div>
            <div className="h-px bg-hairline/30 my-2"></div>
            <div className="text-[10px] font-mono text-secondaryText">Administered: 2/4</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'administrator',
    name: 'Administrator',
    benefits: [
      'Role-based access for your entire team',
      'Export audit reports for compliance',
      'Real-time visibility into all operations',
    ],
    ui: (
      <div className="w-full space-y-2">
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">User Roles</div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-primaryText">JD · Pharmacist</span>
              <span className="text-[10px] font-mono text-secondaryText">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-primaryText">SM · Nurse</span>
              <span className="text-[10px] font-mono text-secondaryText">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-primaryText">AR · Admin</span>
              <span className="text-[10px] font-mono text-secondaryText">Active</span>
            </div>
          </div>
        </div>
        <div className="bg-hairline/10 p-2 rounded-button flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-hairline/20 rounded flex items-center justify-center">
              <span className="text-[8px] font-mono text-secondaryText">PDF</span>
            </div>
            <span className="text-[10px] font-mono text-primaryText">Audit Report</span>
          </div>
          <span className="text-[10px] font-mono text-accentRed">Export</span>
        </div>
      </div>
    ),
  },
];

export function WhoItsFor() {
  const [activeTab, setActiveTab] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    if (!autoAdvance) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % roles.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoAdvance]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setAutoAdvance(false);
  };

  return (
    <section className="py-24 bg-raisedDark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 04 — WHO IT'S FOR
        </p>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-hairline pb-4">
          {roles.map((role, index) => (
            <button
              key={role.id}
              onClick={() => handleTabClick(index)}
              className="font-mono text-xs uppercase tracking-widest text-secondaryText relative pb-2 transition-colors hover:text-primaryText"
            >
              {role.name}
              {activeTab === index && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-accentRed"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* UI Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-panel p-6 h-64 flex items-center justify-center"
            >
              {roles[activeTab].ui}
            </motion.div>
          </AnimatePresence>

          {/* Benefits */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {roles[activeTab].benefits.map((benefit, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="font-sans text-lg text-primaryText"
                >
                  {benefit}
                </motion.p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
