'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn('grid w-full auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-3', className)}>
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}

export function BentoGridItem({ className, title, description, header, icon }: BentoGridItemProps) {
  return (
    <div
      className={cn(
        'group relative row-span-1 flex flex-col justify-between gap-4 overflow-hidden rounded-panel border border-hairline bg-raisedDark/40 p-6 transition-colors duration-300 hover:border-accentRed/40',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_50%_0%,rgba(184,50,60,0.14),transparent_70%)]"
      />
      <div className="relative z-10">
        {header}
        <div className="mt-3 flex items-center gap-2">
          {icon}
          <h3 className="font-heading text-lg text-primaryText">{title}</h3>
        </div>
        <p className="mt-2 font-sans text-sm leading-relaxed text-secondaryText">{description}</p>
      </div>
    </div>
  );
}
