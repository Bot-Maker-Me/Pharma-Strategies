'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

/**
 * React Bits — Click Spark.
 * A full-screen, pointer-events-none canvas that bursts a small star of lines
 * on click. The rAF loop only runs while sparks are alive, so it costs nothing
 * at rest. Disabled under reduced motion.
 */
export function ClickSpark({
  sparkColor = '#EDE6DA',
  sparkSize = 11,
  sparkRadius = 22,
  sparkCount = 8,
  duration = 420,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const frameRef = useRef(0);
  const runningRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const easeOut = (t: number) => t * (2 - t);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const alive: Spark[] = [];
      for (const spark of sparksRef.current) {
        const elapsed = now - spark.startTime;
        if (elapsed >= duration) continue;

        const progress = elapsed / duration;
        const eased = easeOut(progress);
        const distance = eased * sparkRadius;
        const length = sparkSize * (1 - progress);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + length) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + length) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1 - progress;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        alive.push(spark);
      }

      ctx.globalAlpha = 1;
      sparksRef.current = alive;

      if (alive.length > 0) {
        frameRef.current = requestAnimationFrame(draw);
      } else {
        runningRef.current = false;
      }
    };

    const onClick = (event: MouseEvent) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: event.clientX,
          y: event.clientY,
          angle: (Math.PI * 2 * i) / sparkCount,
          startTime: now,
        });
      }
      if (!runningRef.current) {
        runningRef.current = true;
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(frameRef.current);
      sparksRef.current = [];
      runningRef.current = false;
    };
  }, [reduced, sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  if (reduced) return null;

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9998]" />;
}
