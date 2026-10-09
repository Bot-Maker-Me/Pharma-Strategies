'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ShimmerButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-button border border-hairline bg-raisedDark px-6 py-3 font-mono text-xs uppercase tracking-widest text-primaryText transition-colors duration-300 hover:border-accentRed/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentRed focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(237,230,218,0.28),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[350%]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
);
ShimmerButton.displayName = 'ShimmerButton';
