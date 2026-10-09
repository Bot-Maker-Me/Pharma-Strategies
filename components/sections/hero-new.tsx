'use client';

import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { gsap, ScrollTrigger, DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { Magnet, SplitText } from '@/components/react-bits';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

// Silk is WebGL (OGL) — keep it out of the main bundle and only mount it when
// it can actually render (see capability detection below).
const Silk = lazy(() => import('@/components/react-bits/silk'));

const ledgerRows = [
  { date: '07 Oct 26', drug: 'Oxycodone 5mg', qtyIn: '50', qtyOut: '32', balance: '18' },
  { date: '07 Oct 26', drug: 'Fentanyl 25µg', qtyIn: '100', qtyOut: '85', balance: '15' },
  { date: '06 Oct 26', drug: 'Morphine 10mg', qtyIn: '75', qtyOut: '60', balance: '15' },
  { date: '06 Oct 26', drug: 'Hydromorphone 2mg', qtyIn: '40', qtyOut: '38', balance: '2' },
  { date: '05 Oct 26', drug: 'Oxycodone 5mg', qtyIn: '50', qtyOut: '45', balance: '5' },
];

interface DriftingChipProps {
  children: ReactNode;
  className?: string;
  /** How strongly this chip reacts to the pointer (depth). */
  depth?: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduced: boolean;
}

/** A floating hero chip: gentle 6px drift plus a pointer parallax by depth. */
function DriftingChip({ children, className, depth = 1, mouseX, mouseY, reduced }: DriftingChipProps) {
  const x = useTransform(mouseX, (value) => value * depth);
  const y = useTransform(mouseY, (value) => value * depth);

  return (
    <motion.div className={className} style={{ x, y }}>
      <motion.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();

  const [visibleRows, setVisibleRows] = useState(0);
  const [showStamp, setShowStamp] = useState(false);
  const [inView, setInView] = useState(false);
  const [wide, setWide] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [hasWebgl, setHasWebgl] = useState(false);

  // Pointer-driven motion values (chips parallax, ledger tilt, sheet sheen).
  const pointerX = useSpring(0, { stiffness: 90, damping: 18 });
  const pointerY = useSpring(0, { stiffness: 90, damping: 18 });
  const tiltX = useSpring(0, { stiffness: 120, damping: 16, mass: 0.4 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 16, mass: 0.4 });
  const sheenX = useSpring(-300, { stiffness: 220, damping: 28 });
  const sheenY = useSpring(-300, { stiffness: 220, damping: 28 });
  const sheenOpacity = useSpring(0, { stiffness: 160, damping: 24 });

  // Only render the Silk background while the hero is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Capability detection: viewport width, pointer type and WebGL availability.
  useEffect(() => {
    const detect = () => {
      let webgl = false;
      try {
        const canvas = document.createElement('canvas');
        webgl = Boolean(
          window.WebGLRenderingContext &&
            (canvas.getContext('webgl2') || canvas.getContext('webgl'))
        );
      } catch {
        webgl = false;
      }
      setHasWebgl(webgl);
      setWide(window.innerWidth >= 768);
      setFinePointer(!window.matchMedia('(pointer: coarse)').matches);
    };
    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);

  // Chips parallax with the pointer.
  useEffect(() => {
    if (reduced || !wide || !finePointer) return;
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 40);
      pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 40);
    };
    const reset = () => {
      pointerX.set(0);
      pointerY.set(0);
    };
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', reset);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', reset);
    };
  }, [reduced, wide, finePointer, pointerX, pointerY]);

  // Ledger tilt + sheen follow the cursor (desktop only, max 8deg).
  useEffect(() => {
    if (reduced || !wide || !finePointer) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    const MAX = 8;
    const SHEEN = 220;
    const onMove = (event: MouseEvent) => {
      const rect = sheet.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      tiltY.set(nx * MAX * 2);
      tiltX.set(-ny * MAX * 2);
      sheenX.set(event.clientX - rect.left - SHEEN);
      sheenY.set(event.clientY - rect.top - SHEEN);
      sheenOpacity.set(1);
    };
    const reset = () => {
      tiltX.set(0);
      tiltY.set(0);
      sheenOpacity.set(0);
    };
    sheet.addEventListener('mousemove', onMove);
    sheet.addEventListener('mouseleave', reset);
    return () => {
      sheet.removeEventListener('mousemove', onMove);
      sheet.removeEventListener('mouseleave', reset);
    };
  }, [reduced, wide, finePointer, tiltX, tiltY, sheenX, sheenY, sheenOpacity]);

  // Write the ledger rows in one by one, then press the stamp.
  useEffect(() => {
    if (reduced) {
      setVisibleRows(ledgerRows.length);
      setShowStamp(true);
      return;
    }
    let count = 0;
    let stampTimer: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      count += 1;
      setVisibleRows(count);
      if (count >= ledgerRows.length) {
        clearInterval(interval);
        stampTimer = setTimeout(() => setShowStamp(true), 150);
      }
    }, 150);
    return () => {
      clearInterval(interval);
      if (stampTimer) clearTimeout(stampTimer);
    };
  }, [reduced]);

  // Scroll out: scrub the headline down and lift the ledger.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
      if (headlineRef.current) {
        timeline.to(headlineRef.current, { scale: 0.94, opacity: 0.3, ease: 'none' }, 0);
      }
      if (ledgerRef.current) {
        timeline.to(ledgerRef.current, { y: -80, ease: 'none' }, 0);
      }
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    if (document.fonts) document.fonts.ready.then(refresh);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [reduced]);

  const showSilk = inView && wide && hasWebgl && !reduced;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-midnight pt-16"
    >
      {/* Background: Silk (lazy) over a static midnight→blue glow, faded into --bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 68% 36%, rgba(29,53,87,0.85) 0%, rgba(11,18,32,1) 72%)',
          }}
        />
        {showSilk && (
          <Suspense fallback={null}>
            <Silk
              className="absolute inset-0 h-full w-full opacity-70"
              speed={4}
              scale={1.1}
              color="#0B1220"
              flowColor="#1D3557"
              accentColor="#B8323C"
            />
          </Suspense>
        )}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B1220] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-[#0B1220]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: text */}
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-secondaryText">
              § 01 — THE REGISTER
            </p>
            <h1
              ref={headlineRef}
              className="mb-6 font-heading text-[clamp(3rem,6.5vw,7rem)] font-light leading-[1.1] text-primaryText"
              style={{ willChange: 'transform, opacity' }}
            >
              <SplitText
                text="Every controlled substance, COUNTED and signed."
                splitType="lines"
                delay={100}
                duration={0.9}
                highlight="COUNTED"
              />
            </h1>
            <p className="mb-8 max-w-xl font-sans text-lg text-secondaryText">
              Built with audit trails and electronic signatures for pharmaceutical and care
              operations teams.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Magnet padding={80} magnetStrength={0.3}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-button bg-accentRed px-6 py-3 font-mono text-xs uppercase tracking-widest text-midnight transition-colors hover:bg-accentRed/90 active:translate-y-1"
                >
                  Book a demo
                </Link>
              </Magnet>
              <Magnet padding={80} magnetStrength={0.3}>
                <Link
                  href="/apps"
                  className="group inline-flex items-center font-mono text-xs uppercase tracking-widest text-accentRed transition-colors hover:text-primaryText"
                >
                  View all apps
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnet>
            </div>
          </div>

          {/* Right: floating ledger composition */}
          <div className="relative lg:col-span-5">
            <div ref={ledgerRef} className="relative h-[520px]" style={{ willChange: 'transform' }}>
              <motion.div
                className="absolute inset-0"
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 1000,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Counted-today tile */}
                <DriftingChip
                  className="absolute -top-4 right-0 z-30 w-32"
                  depth={0.8}
                  mouseX={pointerX}
                  mouseY={pointerY}
                  reduced={reduced}
                >
                  <div className="glass-panel rounded-panel p-3 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                      Counted today
                    </p>
                    <p className="font-heading text-2xl text-primaryText">128</p>
                  </div>
                </DriftingChip>

                {/* Ledger sheet */}
                <div
                  ref={sheetRef}
                  className="absolute right-0 top-12 w-[560px] border border-hairline bg-creamSheet p-6 shadow-lg"
                >
                  <div
                    className="absolute bottom-0 left-2 right-0 top-2 border border-hairline bg-creamSheet/80"
                    style={{ transform: 'rotate(2deg)' }}
                  />

                  {/* Sheen that follows the cursor (transform + opacity only) */}
                  <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
                    <motion.div
                      aria-hidden
                      className="ledger-sheen absolute left-0 top-0 h-[440px] w-[440px] rounded-full mix-blend-soft-light"
                      style={{ x: sheenX, y: sheenY, opacity: sheenOpacity }}
                    />
                  </div>

                  {/* Header */}
                  <div className="relative z-10 mb-4 w-full border-b border-hairline pb-3">
                    <div className="flex font-mono text-[10px] uppercase tracking-widest text-midnight/60">
                      <div className="w-[100px] whitespace-nowrap">Date</div>
                      <div className="flex-1 pr-4">Drug</div>
                      <div className="w-12 text-right">In</div>
                      <div className="w-12 text-right">Out</div>
                      <div className="w-12 text-right">Bal</div>
                    </div>
                  </div>

                  {/* Rows */}
                  <div className="relative z-10 space-y-2">
                    {ledgerRows.slice(0, visibleRows).map((row, index) => (
                      <motion.div
                        key={index}
                        initial={reduced ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, ease: DESIGN_EASE_ARRAY }}
                        className="flex font-mono text-xs tabular-nums text-midnight"
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
                      initial={reduced ? false : { scale: 1.15, opacity: 0, rotate: -12 }}
                      animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
                      transition={{ duration: 0.25, ease: DESIGN_EASE_ARRAY }}
                      className="absolute bottom-4 right-4 z-20 flex h-20 w-20 items-center justify-center rounded-full border-4 border-accentRed bg-accentRed/10"
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accentRed">
                        Verified
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Signature chip */}
                <DriftingChip
                  className="absolute bottom-0 left-0 z-30 w-48"
                  depth={1.4}
                  mouseX={pointerX}
                  mouseY={pointerY}
                  reduced={reduced}
                >
                  <div className="glass-panel rounded-panel p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight/30">
                        <span className="font-mono text-xs text-primaryText">JD</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-[10px] text-secondaryText">JD · 09:42</p>
                        <p className="font-mono text-[10px] text-secondaryText">SM · 09:44</p>
                      </div>
                    </div>
                  </div>
                </DriftingChip>

                {/* Alert card */}
                <DriftingChip
                  className="absolute -bottom-16 left-0 z-30 w-64"
                  depth={1.8}
                  mouseX={pointerX}
                  mouseY={pointerY}
                  reduced={reduced}
                >
                  <div className="glass-panel rounded-panel border-l-4 border-l-accentRed p-4">
                    <p className="font-mono text-xs text-primaryText">
                      Discrepancy detected: Oxycodone 5mg, count off by 2
                    </p>
                  </div>
                </DriftingChip>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">Scroll</p>
        <motion.div
          className="h-8 w-px bg-hairline"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={reduced ? undefined : { duration: 1.5, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
