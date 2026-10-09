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

export function HeroNew() {
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
    }, 150);

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
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative bg-midnight min-h-screen overflow-hidden grid-background pt-16">
      {/* Blue glow behind composition */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full glow-blue opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left: Text content */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
              § 01 — THE REGISTER
            </p>
            <motion.h1
              variants={itemVariants}
              className="font-heading text-[clamp(3rem,6.5vw,7rem)] font-light leading-[1.1] text-primaryText mb-6"
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
                className="inline-flex items-center justify-center bg-accentRed text-midnight px-6 py-3 rounded-button font-mono text-xs uppercase tracking-widest transition-colors hover:bg-accentRed/90 active:translate-y-1"
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

          {/* Right: Floating composition */}
          <motion.div
            className="lg:col-span-5 relative h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Count tile - above top-right */}
            <motion.div
              className="absolute -top-4 right-0 w-32 glass-panel rounded-panel p-3 text-center z-20"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <p className="font-mono text-[10px] text-secondaryText uppercase tracking-widest">Counted today</p>
              <p className="font-heading text-2xl text-primaryText">128</p>
            </motion.div>

            {/* Ledger sheet */}
            <motion.div
              className="absolute top-12 right-0 w-[560px] bg-creamSheet border border-hairline p-6 shadow-lg"
              style={{ transform: 'rotate(-1.5deg)' }}
              animate={{
                y: [0, -8, 0],
                rotate: [-1.5, -2, -1.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Second sheet behind */}
              <div
                className="absolute top-2 left-2 right-0 bottom-0 bg-creamSheet/80 border border-hairline"
                style={{ transform: 'rotate(2deg)' }}
              />

              {/* Ledger header */}
              <div className="relative z-10 w-full border-b border-hairline mb-4 pb-3" style={{ tableLayout: 'fixed' }}>
                <div className="flex text-[10px] font-mono uppercase tracking-widest text-midnight/60">
                  <div className="w-[100px] whitespace-nowrap">Date</div>
                  <div className="flex-1 pr-4">Drug</div>
                  <div className="w-12 text-right">In</div>
                  <div className="w-12 text-right">Out</div>
                  <div className="w-12 text-right">Bal</div>
                </div>
              </div>

              {/* Ledger rows */}
              <div className="relative z-10 space-y-2">
                {ledgerRows.slice(0, visibleRows).map((row, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex text-xs font-mono text-midnight tabular-nums"
                    style={{ tableLayout: 'fixed' }}
                  >
                    <div className="w-[100px] whitespace-nowrap">{row.date}</div>
                    <div className="flex-1 pr-4 font-sans">{row.drug}</div>
                    <div className="w-12 text-right">{row.qtyIn}</div>
                    <div className="w-12 text-right">{row.qtyOut}</div>
                    <div className="w-12 text-right">{row.balance}</div>
                  </motion.div>
                ))}
              </div>

              {/* VERIFIED stamp */}
              {showStamp && (
                <motion.div
                  initial={{ scale: 1.15, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-4 right-4 w-20 h-20 rounded-full border-4 border-accentRed flex items-center justify-center bg-accentRed/10 z-10"
                >
                  <span className="font-mono text-[10px] font-bold text-accentRed uppercase tracking-widest">
                    Verified
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Signature chip - bottom-left outside table */}
            <motion.div
              className="absolute bottom-0 left-0 w-48 glass-panel rounded-panel p-3 z-20"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-midnight/30 rounded-full flex items-center justify-center">
                  <span className="font-mono text-xs text-primaryText">JD</span>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] text-secondaryText">JD · 09:42</p>
                  <p className="font-mono text-[10px] text-secondaryText">SM · 09:44</p>
                </div>
              </div>
            </motion.div>

            {/* Alert card - below sheet */}
            <motion.div
              className="absolute bottom-[-80px] left-0 w-64 glass-panel rounded-panel p-4 border-l-4 border-l-accentRed z-20"
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <p className="font-mono text-xs text-primaryText">
                Discrepancy detected: Oxycodone 5mg, count off by 2
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">Scroll</p>
        <motion.div
          className="w-px h-8 bg-hairline"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
