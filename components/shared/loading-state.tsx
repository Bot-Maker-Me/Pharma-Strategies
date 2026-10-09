import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = 'Loading', className }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-panel border border-hairline bg-raisedDark/30 px-6 py-14',
        className
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-accentRed" aria-hidden />
      <span className="font-mono text-xs uppercase tracking-widest text-secondaryText">{label}</span>
    </div>
  );
}
