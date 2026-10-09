'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ledgerRows = [
  { date: '07 Oct 26', drug: 'Oxycodone 5mg', qtyIn: '50', qtyOut: '32', balance: '18', initials: 'JD / SM' },
  { date: '07 Oct 26', drug: 'Fentanyl 25µg', qtyIn: '100', qtyOut: '85', balance: '15', initials: 'JD / SM' },
  { date: '06 Oct 26', drug: 'Morphine 10mg', qtyIn: '75', qtyOut: '60', balance: '15', initials: 'AR / SM' },
  { date: '06 Oct 26', drug: 'Hydromorphone 2mg', qtyIn: '40', qtyOut: '38', balance: '2', initials: 'AR / SM' },
  { date: '05 Oct 26', drug: 'Oxycodone 5mg', qtyIn: '50', qtyOut: '45', balance: '5', initials: 'JD / AR' },
];

export function HeroSectionNew() {
  const [visibleRows, setVisibleRows] = useState(0);
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleRows((prev) => {
        if (prev < ledgerRows.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visibleRows === ledgerRows.length) {
      const timeout = setTimeout(() => setShowStamp(true), 200);
      return () => clearTimeout(timeout);
    }
  }, [visibleRows]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <section className="relative bg-midnight py-24 overflow-hidden">
      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Text content */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-primaryText mb-6"
            >
              Every controlled substance, <span className="italic text-accentRed">counted</span> and signed.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="font-sans text-lg text-secondaryText mb-8 max-w-xl"
            >
              Built with audit trails and electronic signatures for pharmaceutical and care operations teams.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-accentRed text-midnight px-6 py-3 rounded-[2px] font-mono text-xs uppercase tracking-widest transition-colors hover:bg-accentRed/90 active:translate-y-1"
              >
                Book a demo
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-accentRed transition-colors hover:text-primaryText group"
              >
                View all apps
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Ledger mockup */}
          <motion.div
            className="lg:col-span-5 lg:pt-8"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Second sheet behind */}
              <div className="absolute top-2 left-2 right-0 bottom-0 bg-creamSheet/80 transform rotate-1" />

              {/* Main ledger sheet */}
              <div className="bg-creamSheet border border-hairline p-6 shadow-sm relative z-10">
                {/* Ledger header */}
                <div className="grid grid-cols-6 gap-2 pb-3 border-b border-hairline mb-4">
                  <div className="font-mono text-xs uppercase tracking-widest text-midnight/60">Date</div>
                  <div className="col-span-2 font-mono text-xs uppercase tracking-widest text-midnight/60">Drug</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-midnight/60 text-right">In</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-midnight/60 text-right">Out</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-midnight/60 text-right">Bal</div>
                </div>

                {/* Ledger rows */}
                <div className="space-y-2">
                  {ledgerRows.slice(0, visibleRows).map((row, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-6 gap-2 py-2"
                    >
                      <div className="font-mono text-xs text-midnight tabular-nums">{row.date}</div>
                      <div className="col-span-2 font-sans text-sm text-midnight">{row.drug}</div>
                      <div className="font-mono text-xs text-midnight text-right tabular-nums">{row.qtyIn}</div>
                      <div className="font-mono text-xs text-midnight text-right tabular-nums">{row.qtyOut}</div>
                      <div className="font-mono text-xs text-midnight text-right tabular-nums">{row.balance}</div>
                    </motion.div>
                  ))}
                </div>

                {/* VERIFIED stamp in red */}
                {showStamp && (
                  <motion.div
                    initial={{ scale: 1.15, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: -12 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 right-0 w-24 h-24 rounded-full border-4 border-accentRed flex items-center justify-center bg-accentRed/10"
                  >
                    <span className="font-mono text-xs font-bold text-accentRed uppercase tracking-widest">
                      Verified
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
