'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'The request could not be completed. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center rounded-panel border border-accentRed/40 bg-accentRed/5 px-6 py-14 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accentRed/40 bg-midnight">
        <AlertTriangle className="h-5 w-5 text-accentRed" aria-hidden />
      </div>
      <h3 className="font-heading text-xl text-primaryText">{title}</h3>
      <p className="mt-2 max-w-sm font-sans text-sm text-secondaryText">{description}</p>
      {onRetry ? (
        <Button onClick={onRetry} className="mt-6">
          Try again
        </Button>
      ) : null}
    </div>
  );
}
