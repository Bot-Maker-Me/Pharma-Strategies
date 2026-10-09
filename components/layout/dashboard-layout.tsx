import { type ReactNode } from 'react';
import { Sidebar, type SidebarItem } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  items: SidebarItem[];
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ items, children, className }: DashboardLayoutProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row lg:px-8',
        className
      )}
    >
      <Sidebar items={items} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
