'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StaggerReveal } from '@/components/motion/stagger-reveal';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-midnight">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
          § 09 — FAQ
        </p>

        <StaggerReveal className="max-w-3xl space-y-4" stagger={0.08}>
          {faqs.map((faq, index) => (
            <div key={index} className="border border-hairline rounded-panel overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-transparent hover:bg-hairline/10 transition-colors"
              >
                <span className="font-sans text-primaryText">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <ChevronDown className="h-4 w-4 text-secondaryText" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      <p className="font-sans text-secondaryText">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
