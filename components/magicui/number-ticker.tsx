'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  decimalPlaces?: number;
  className?: string;
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  duration = 1200,
  decimalPlaces = 0,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    const from = direction === 'down' ? value : 0;
    const to = direction === 'down' ? 0 : value;

    let frame = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        timeout = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = formatter.format(from + (to - from) * eased);
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          node.textContent = formatter.format(from);
          frame = requestAnimationFrame(tick);
        }, delay * 1000);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [value, direction, delay, duration, decimalPlaces]);

  return <span ref={ref} className={cn('inline-block tabular-nums', className)} />;
}
