'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { RevealFrame } from '@/components/motion/reveal-frame';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface Role {
  id: string;
  name: string;
  benefits: string[];
  /** One flag per entry in PERMISSIONS, in the same order. */
  allowed: boolean[];
  ui: ReactNode;
}

/** The five actions the register distinguishes between, in checklist order. */
const PERMISSIONS = [
  'Receive deliveries',
  'Run counts',
  'Administer doses',
  'Export audit reports',
  'Manage staff and roles',
];

const roles: Role[] = [
  {
    id: 'pharmacist',
    name: 'Pharmacist',
    benefits: [
      'Track all controlled substances in one place',
      'Comply with DEA regulations effortlessly',
      'Reduce paperwork and save hours daily',
    ],
    allowed: [true, true, true, true, false],
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
    allowed: [false, true, true, false, false],
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
    allowed: [false, false, false, true, true],
    ui: (
      <div className="w-full space-y-2">
        <div className="bg-hairline/10 p-2 rounded-button">
          <div className="text-[10px] font-mono text-secondaryText mb-1">User Roles</div>
          <div className="space-y-1">
            {[
              ['JD · Pharmacist', 'Active'],
              ['SM · Nurse', 'Active'],
              ['AR · Admin', 'Active'],
            ].map(([who, status]) => (
              <div key={who} className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-primaryText">{who}</span>
                <span className="text-[10px] font-mono text-secondaryText">{status}</span>
              </div>
            ))}
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

const sharedFoundation = [
  {
    index: 'Shared',
    title: 'One ledger, three views',
    body: 'The pharmacist, the nurse and the administrator read and write the same register.',
  },
  {
    index: 'Permissions',
    title: 'Access set by role',
    body: 'Administrators decide who can receive, who can count, and who can only read.',
  },
  {
    index: 'Record',
    title: 'A name and a time on every action',
    body: 'Each entry keeps the initials and the timestamp of the person who made it.',
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

  const activeRole = roles[activeTab];

  return (
    <section className="relative overflow-hidden bg-raisedDark py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hairline to-transparent"
      />

      <div className="ed-container relative">
        <SectionHeading
          label="§ 04 — WHO IT'S FOR"
          title="One register, three points of view"
          description="Pharmacists log it, nurses confirm it, administrators audit it. Nobody keeps a second copy."
        />

        {/* Role switcher */}
        <div className="mb-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-hairline">
          {roles.map((role, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleTabClick(index)}
                aria-pressed={isActive}
                className={cn(
                  'relative pb-4 font-mono text-xs uppercase tracking-widest transition-colors',
                  isActive ? 'text-primaryText' : 'text-secondaryText hover:text-primaryText'
                )}
              >
                {role.name}
                {isActive && (
                  <motion.div
                    layoutId="who-its-for-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-accentRed"
                    transition={{ duration: 0.4, ease: DESIGN_EASE_ARRAY }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* UI preview */}
          <RevealFrame className="rounded-panel" delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.55, ease: DESIGN_EASE_ARRAY }}
                className="glass-panel overflow-hidden rounded-panel"
              >
                <div className="flex items-center justify-between border-b border-hairline/60 px-4 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                    {activeRole.name} · view
                  </span>
                  <span aria-hidden className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <span key={dot} className="h-1.5 w-1.5 rounded-full bg-hairline" />
                    ))}
                  </span>
                </div>
                <div className="flex min-h-[16rem] items-center justify-center p-6">
                  {activeRole.ui}
                </div>
              </motion.div>
            </AnimatePresence>
          </RevealFrame>

          {/* Benefits + granted access */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={activeRole.id}>
                <ul className="space-y-6">
                  {activeRole.benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: DESIGN_EASE_ARRAY,
                      }}
                      className="flex items-start gap-4"
                    >
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 + index * 0.08,
                          ease: DESIGN_EASE_ARRAY,
                        }}
                        className="mt-1 flex h-5 w-5 flex-none items-center justify-center border border-accentRed/50 text-accentRed"
                      >
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </motion.span>
                      <span className="font-sans text-lg text-primaryText">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-8 border-t border-hairline pt-6"
                >
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                    Permissions
                  </p>
                  <dl>
                    {PERMISSIONS.map((action, index) => {
                      const granted = activeRole.allowed[index];
                      return (
                        <div
                          key={action}
                          className="flex items-center justify-between gap-4 border-b border-hairline/60 py-2.5 last:border-b-0"
                        >
                          <dt className="font-sans text-sm text-secondaryText">{action}</dt>
                          <dd
                            className={cn(
                              'flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest',
                              granted ? 'text-primaryText' : 'text-secondaryText/40'
                            )}
                          >
                            {granted ? (
                              <>
                                <Check className="h-3 w-3 text-accentRed" strokeWidth={3} />
                                Granted
                              </>
                            ) : (
                              'Not granted'
                            )}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Shared foundation */}
        <StaggerReveal
          className="mt-20 grid gap-px border border-hairline bg-hairline sm:grid-cols-3"
          stagger={0.15}
          y={40}
        >
          {sharedFoundation.map((item) => (
            <div
              key={item.index}
              className="bg-raisedDark p-6 transition-colors duration-500 hover:bg-midnight/40"
            >
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                {item.index}
              </p>
              <h3 className="mb-2 font-heading text-lg text-primaryText">{item.title}</h3>
              <p className="font-sans text-sm text-secondaryText">{item.body}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
