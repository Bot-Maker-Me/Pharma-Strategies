'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

interface CursorGlowProps {
  size?: number;
  color?: string;
}

/**
 * A soft glow that trails the pointer.
 *
 * Perf notes: no blend mode (a blended full-screen layer forces a composite on
 * every frame) and the rAF loop parks itself once the glow has settled, then
 * wakes on the next pointer move. Skipped on touch devices and reduced motion.
 */
export function CursorGlow({ size = 380, color = 'rgba(194,59,59,0.13)' }: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;
    let running = false;

    const loop = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      el.style.transform = `translate3d(${(currentX - size / 2).toFixed(1)}px, ${(
        currentY -
        size / 2
      ).toFixed(1)}px, 0)`;

      const settled = Math.abs(targetX - currentX) < 0.4 && Math.abs(targetY - currentY) < 0.4;
      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      start();
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
      running = false;
    };
  }, [reduced, size]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9997]"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      }}
    />
  );
}
