import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  className?: string;
  children: ReactNode;
}

export function PageContainer({ className, children }: PageContainerProps) {
  return <div className={cn('ed-container', className)}>{children}</div>;
}
