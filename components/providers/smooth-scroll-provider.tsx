'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { LenisContext } from '@/hooks/use-lenis';

/**
 * Lenis smooth scrolling, wired to the GSAP ticker so scrolling and
 * ScrollTrigger animations share a single animation clock.
 *
 * - Initialises on the client only and destroys cleanly on unmount.
 * - Fully disables itself when `prefers-reduced-motion: reduce` is set
 *   (and re-evaluates if the user changes the preference).
 * - Hash/anchor links keep working (`anchors` option).
 * - Scrollable overlays can opt out with the `data-lenis-prevent` attribute.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let tickerFn: ((time: number) => void) | null = null;

    const start = () => {
      if (lenisRef.current) return;

      const instance = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        autoRaf: false,
        anchors: { offset: -80 },
      });

      // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
      instance.on('scroll', ScrollTrigger.update);

      // Drive Lenis from the GSAP ticker (single rAF loop).
      tickerFn = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      lenisRef.current = instance;
      setLenis(instance);
      ScrollTrigger.refresh();
    };

    const stop = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      const instance = lenisRef.current;
      if (instance) {
        instance.off('scroll', ScrollTrigger.update);
        instance.destroy();
      }
      lenisRef.current = null;
      setLenis(null);
    };

    const sync = () => {
      if (motionQuery.matches) {
        stop();
        document.documentElement.style.scrollBehavior = 'auto';
      } else {
        document.documentElement.style.scrollBehavior = '';
        start();
      }
    };

    sync();
    motionQuery.addEventListener('change', sync);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      motionQuery.removeEventListener('change', sync);
      window.removeEventListener('load', refresh);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
