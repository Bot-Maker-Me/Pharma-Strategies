'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface MagnetProps {
  children: ReactNode;
  /** Activation distance in px around the element's edge. */
  padding?: number;
  /** How far the element is pulled toward the cursor (0–1). */
  magnetStrength?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * React Bits — Magnet.
 * Pulls its content toward the cursor when the pointer is nearby. Uses
 * Framer Motion springs, runs on a passive window listener (no per-move
 * React state), and disables itself on touch devices and under reduced motion.
 */
export function Magnet({
  children,
  padding = 80,
  magnetStrength = 0.35,
  disabled = false,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (disabled || reduced || typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const radius = Math.max(rect.width, rect.height) / 2 + padding;
      const distance = Math.hypot(dx, dy);

      if (distance < radius) {
        x.set(dx * magnetStrength);
        y.set(dy * magnetStrength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', reset);
    };
  }, [disabled, reduced, padding, magnetStrength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn('inline-block will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}

export default Magnet;
