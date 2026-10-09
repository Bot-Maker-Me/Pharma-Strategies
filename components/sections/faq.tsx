'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Who owns our data?',
    answer: 'You own all your data. We act as a processor and never claim ownership of your information.',
  },
  {
    question: 'Can we export audit logs?',
    answer: 'Yes, you can export all audit logs in standard formats for your records.',
  },
  {
    question: 'How do user roles work?',
    answer: 'You can assign different access levels to staff members like Pharmacists, Nurses, and Administrators.',
  },
  {
    question: 'Does it work on mobile?',
    answer: 'Yes, the applications work on tablets and mobile devices with responsive layouts.',
  },
  {
    question: 'How long does onboarding take?',
    answer: 'Most facilities complete setup within 1-2 business days.',
  },
  {
    question: 'What support do you offer?',
    answer: 'We provide email support for all plans with faster response times for higher tiers.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-midnight py-28 lg:py-36">
      <div className="ed-container">
        <SectionHeading
          label="§ 09 — FAQ"
          title="Questions we get asked"
          description="Anything not covered here, ask us in the demo."
        />

        <StaggerReveal className="max-w-3xl" stagger={0.07}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-t border-hairline last:border-b">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-6 py-6 text-left"
                  >
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-widest transition-colors',
                        isOpen ? 'text-accentRed' : 'text-secondaryText/70'
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'flex-1 font-sans text-lg transition-colors',
                        isOpen ? 'text-primaryText' : 'text-primaryText/80 group-hover:text-primaryText'
                      )}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: DESIGN_EASE_ARRAY }}
                      className={cn(
                        'flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-colors',
                        isOpen ? 'border-accentRed/50 text-accentRed' : 'border-hairline text-secondaryText'
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: DESIGN_EASE_ARRAY }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-10 font-sans text-secondaryText">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
