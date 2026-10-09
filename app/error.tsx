'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="font-heading text-2xl font-bold text-navy-900">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-navy-600">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button
        className="mt-6 bg-teal-500 text-white hover:bg-teal-600"
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  );
}
