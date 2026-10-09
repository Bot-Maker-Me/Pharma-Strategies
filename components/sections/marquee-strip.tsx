'use client';

import { motion } from 'framer-motion';

export function MarqueeStrip() {
  return (
    <section className="py-6 border-y border-hairline bg-midnight overflow-hidden">
      <div className="whitespace-nowrap">
        <motion.div
          className="inline-block font-mono text-xs uppercase tracking-widest text-secondaryText"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          RETAIL PHARMACIES · NURSING HOMES · CARE FACILITIES · HOSPITAL DISPENSARIES · COMPOUNDING PHARMACIES · RETAIL PHARMACIES · NURSING HOMES · CARE FACILITIES · HOSPITAL DISPENSARIES · COMPOUNDING PHARMACIES · RETAIL PHARMACIES · NURSING HOMES · CARE FACILITIES · HOSPITAL DISPENSARIES · COMPOUNDING PHARMACIES
        </motion.div>
      </div>
    </section>
  );
}
