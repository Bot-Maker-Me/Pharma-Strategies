'use client';

import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { gsap, ScrollTrigger, DESIGN_EASE, DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { Magnet, SplitText } from '@/components/react-bits';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

// Silk is WebGL (OGL) — keep it out of the main bundle and only mount it when
// it can actually render (see capability detection below).
const Silk = lazy(() => import('@/components/react-bits/silk'));

/** Recent movements, shown in the hero masthead — the same register, live. */
const latestEntries = [
  '07 Oct · Oxycodone 5mg · 50 in',
  '07 Oct · Fentanyl 25µg · 85 out',
  '06 Oct · Morphine 10mg · 60 out',
];

/** Register readouts — product state, not marketing numbers. */
const readouts = [
  { label: 'Entries today', value: 128 },
  { label: 'Substances on file', value: 24 },
  { label: 'Signature pairs', value: 48 },
];

const ledgerRows = [
  { date: '07 Oct 26', drug: 'Oxycodone 5mg', qtyIn: '50', qtyOut: '32', balance: '18' },
  { date: '07 Oct 26', drug: 'Fentanyl 25µg', qtyIn: '100', qtyOut: '85', balance: '15' },
  { date: '06 Oct 26', drug: 'Morphine 10mg', qtyIn: '75', qtyOut: '60', balance: '15' },
  { date: '06 Oct 26', drug: 'Hydromorphone 2mg', qtyIn: '40', qtyOut: '38', balance: '2' },
  { date: '05 Oct 26', drug: 'Oxycodone 5mg', qtyIn: '50', qtyOut: '45', balance: '5' },
];

/** Date and the three numeric columns are fixed; the drug name takes the rest. */
const SHEET_GRID = 'grid grid-cols-[5.5rem_minmax(0,1fr)_2.5rem_2.5rem_2.5rem] gap-2';

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
        {/* Plain wrapper for the GSAP intro so it never fights Framer's transform. */}
        <div data-hero-chip>{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function HeroNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
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

  // Intro: eyebrow → copy → CTAs → the register frame opening → the chips.
  // Runs as a layout effect (before paint) so nothing flashes at full opacity.
  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      const timeline = gsap.timeline({ defaults: { ease: DESIGN_EASE, duration: 1.05 } });
      timeline
        .from('[data-hero-masthead]', { opacity: 0, y: -18, duration: 0.9 }, 0)
        .from('[data-hero-label]', { opacity: 0, x: -22, duration: 0.85 }, 0.15)
        .from('[data-hero-para]', { opacity: 0, y: 28 }, 0.7)
        .from('[data-hero-cta]', { opacity: 0, y: 28, duration: 0.9, stagger: 0.12 }, 0.85)
        .from(
          '[data-hero-stage]',
          {
            opacity: 0,
            y: 70,
            scale: 0.94,
            clipPath: 'inset(16% 10% 16% 10% round 14px)',
            duration: 1.4,
          },
          0.45
        )
        .from('[data-hero-chip]', { opacity: 0, y: 32, duration: 0.9, stagger: 0.15 }, 1.3)
        .from('[data-hero-rail]', { opacity: 0, y: 26, duration: 0.9 }, 1.4);
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

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

  // Scroll out: scrub the headline down and lift the register.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
      if (headlineRef.current) {
        timeline.to(headlineRef.current, { scale: 0.92, opacity: 0.18, ease: 'none' }, 0);
      }
      if (stageRef.current) {
        timeline.to(stageRef.current, { y: -120, ease: 'none' }, 0);
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
      className="relative min-h-screen overflow-hidden bg-midnight pt-[72px]"
    >
      {/* Background: Silk (lazy) over static ambient light, faded into --bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(52% 52% at 70% 34%, rgba(29,53,87,0.8) 0%, rgba(11,18,32,0.5) 55%, rgba(11,18,32,1) 78%), radial-gradient(38% 38% at 14% 16%, rgba(194,59,59,0.09) 0%, rgba(11,18,32,0) 70%)',
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
              accentColor="#C23B3B"
            />
          </Suspense>
        )}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B1220] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-[#0B1220]" />
      </div>

      <div className="ed-container relative z-10 flex min-h-[calc(100vh-72px)] flex-col justify-between gap-8 py-8">
        {/* Masthead: what this is, and that the register is live */}
        <div data-hero-masthead className="flex items-center gap-6 border-b border-hairline pb-5">
          <span className="flex flex-none items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-primaryText">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accentRed" />
            Live register
          </span>

          <div className="hidden min-w-0 flex-1 items-center gap-8 md:flex [mask-image:linear-gradient(to_right,black_72%,transparent)]">
            {latestEntries.map((entry) => (
              <span
                key={entry}
                className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-secondaryText"
              >
                {entry}
              </span>
            ))}
          </div>

          <span className="ml-auto flex flex-none items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-secondaryText">
            Scroll
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { y: [0, 4, 0] }}
              transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </span>
        </div>

        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <p
              data-hero-label
              className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText"
            >
              <span aria-hidden className="h-px w-8 bg-accentRed" />
              § 01 — THE REGISTER
            </p>

            <h1
              ref={headlineRef}
              className="mb-7 font-heading text-[clamp(2.5rem,4.6vw,4.5rem)] font-normal leading-[1.06] text-primaryText"
              style={{ willChange: 'transform, opacity' }}
            >
              <SplitText
                text="Every controlled substance, COUNTED and signed."
                splitType="lines"
                delay={110}
                duration={1.1}
                highlight="COUNTED"
                blurChars
              />
            </h1>

            <p data-hero-para className="mb-9 max-w-xl font-sans text-lg text-secondaryText">
              Built with audit trails and electronic signatures for pharmaceutical and care
              operations teams.
            </p>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div data-hero-cta>
                <Magnet padding={80} magnetStrength={0.3}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-button bg-accentRed px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-midnight shadow-[0_24px_60px_-28px_rgba(194,59,59,0.85)] transition-colors hover:bg-accentRedBright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentRed"
                  >
                    Book a demo
                  </Link>
                </Magnet>
              </div>
              <div data-hero-cta>
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
          </div>

          {/* Right: the register, inside a frame that opens on load */}
          <div className="lg:col-span-6">
            <div
              ref={stageRef}
              data-hero-stage
              className="relative h-[460px] w-full"
              style={{ clipPath: 'inset(0% 0% 0% 0% round 14px)', willChange: 'transform' }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 1200,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Counted-today tile */}
                <DriftingChip
                  className="absolute right-0 top-0 z-30 w-36"
                  depth={0.8}
                  mouseX={pointerX}
                  mouseY={pointerY}
                  reduced={reduced}
                >
                  <div className="glass-panel rounded-panel p-3 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                      Counted today
                    </p>
                    <p className="font-heading text-2xl text-primaryText">
                      <NumberTicker value={128} duration={1400} />
                    </p>
                  </div>
                </DriftingChip>

                {/* Ledger sheet */}
                <div
                  ref={sheetRef}
                  className="paper-sheet absolute right-0 top-12 w-full max-w-[540px] rounded-[10px] p-6 pb-24"
                >
                  <div
                    aria-hidden
                    className="absolute -bottom-3 left-3 right-3 top-3 rotate-[1.2deg] rounded-[10px] border border-midnight/10 bg-creamSheet/60"
                  />

                  {/* Sheen that follows the cursor (transform + opacity only) */}
                  <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[10px]">
                    <motion.div
                      aria-hidden
                      className="ledger-sheen absolute left-0 top-0 h-[440px] w-[440px] rounded-full"
                      style={{ x: sheenX, y: sheenY, opacity: sheenOpacity }}
                    />
                  </div>

                  {/* Header */}
                  <div className={`relative z-10 ${SHEET_GRID} border-b border-midnight/15 pb-3`}>
                    {['Date', 'Drug', 'In', 'Out', 'Bal'].map((heading, index) => (
                      <div
                        key={heading}
                        className={`font-mono text-[10px] uppercase tracking-widest text-midnight/60 ${
                          index > 1 ? 'text-right' : ''
                        }`}
                      >
                        {heading}
                      </div>
                    ))}
                  </div>

                  {/* Rows */}
                  <div className="relative z-10 divide-y divide-midnight/[0.07]">
                    {ledgerRows.slice(0, visibleRows).map((row, index) => (
                      <motion.div
                        key={index}
                        initial={reduced ? false : { opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, ease: DESIGN_EASE_ARRAY }}
                        className={`${SHEET_GRID} py-1.5 font-mono text-xs tabular-nums text-midnight`}
                      >
                        <div className="whitespace-nowrap">{row.date}</div>
                        <div className="truncate font-sans">{row.drug}</div>
                        <div className="text-right">{row.qtyIn}</div>
                        <div className="text-right">{row.qtyOut}</div>
                        <div className="text-right">{row.balance}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* VERIFIED stamp */}
                  {showStamp && (
                    <motion.div
                      initial={reduced ? false : { scale: 1.4, opacity: 0, rotate: -12 }}
                      animate={{ scale: 1, opacity: 0.92, rotate: -12 }}
                      transition={{ duration: 0.55, ease: DESIGN_EASE_ARRAY }}
                      className="absolute bottom-5 right-5 z-20 flex h-20 w-20 items-center justify-center rounded-full border-4 border-accentRed bg-accentRed/10"
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accentRed">
                        Verified
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Signatures */}
                <DriftingChip
                  className="absolute left-0 top-[352px] z-30 w-48"
                  depth={1.4}
                  mouseX={pointerX}
                  mouseY={pointerY}
                  reduced={reduced}
                >
                  <div className="glass-panel rounded-panel p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight/40">
                        <span className="font-mono text-xs text-primaryText">JD</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-[10px] text-secondaryText">JD · 09:42</p>
                        <p className="font-mono text-[10px] text-secondaryText">SM · 09:44</p>
                      </div>
                    </div>
                  </div>
                </DriftingChip>

                {/* Discrepancy alert */}
                <DriftingChip
                  className="absolute bottom-0 right-0 z-30 w-72"
                  depth={1.8}
                  mouseX={pointerX}
                  mouseY={pointerY}
                  reduced={reduced}
                >
                  <div className="glass-panel rounded-panel border-l-4 border-l-accentRed p-4">
                    <p className="font-mono text-xs leading-relaxed text-primaryText">
                      Discrepancy detected: Oxycodone 5mg, count off by 2
                    </p>
                  </div>
                </DriftingChip>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Register readouts — the numbers below are the register's own state */}
        <div
          data-hero-rail
          className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-hairline pt-7 sm:grid-cols-3"
        >
          {readouts.map((readout) => (
            <div key={readout.label}>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                {readout.label}
              </p>
              <p className="font-heading text-3xl tabular-nums text-primaryText">
                <NumberTicker value={readout.value} duration={1600} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
