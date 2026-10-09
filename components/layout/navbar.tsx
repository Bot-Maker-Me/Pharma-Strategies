'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ctaClass =
    'rounded-button bg-accentRed px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-midnight transition-colors hover:bg-accentRedBright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentRed';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-hairline bg-midnight/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="ed-container flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="font-heading text-[1.4rem] font-normal leading-none tracking-[-0.01em] text-primaryText"
        >
          Pharma Strategies
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:text-primaryText"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={ctaClass}>
            Book a demo
          </Link>
        </div>

        <button
          className="p-2 text-primaryText md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: DESIGN_EASE_ARRAY }}
            className="overflow-hidden border-t border-hairline bg-midnight/95 backdrop-blur-xl md:hidden"
          >
            <div className="ed-container flex flex-col gap-5 py-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:text-primaryText"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={cn(ctaClass, 'self-start')}
              >
                Book a demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
