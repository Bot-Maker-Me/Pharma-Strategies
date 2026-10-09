import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function AppHeader({ title, description, actions, className }: AppHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div>
        <h1 className="font-heading text-3xl text-primaryText">{title}</h1>
        {description ? (
          <p className="mt-1 font-sans text-sm text-secondaryText">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}
