'use client';

import {
  BarChart3,
  Boxes,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AppHeader } from '@/components/layout/app-header';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingState } from '@/components/shared/loading-state';
import { ErrorState } from '@/components/shared/error-state';
import { BentoGrid, BentoGridItem } from '@/components/magicui/bento-grid';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { Marquee } from '@/components/magicui/marquee';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Spotlight } from '@/components/aceternity/spotlight';
import { SpotlightCard } from '@/components/aceternity/spotlight-card';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Apps', href: '/apps', icon: Boxes },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Compliance', href: '/dashboard/compliance', icon: ShieldCheck },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const metrics: { label: string; value: number; decimals: number; suffix: string }[] = [
  { label: 'Audit events logged', value: 12480, decimals: 0, suffix: '' },
  { label: 'Open discrepancies', value: 3, decimals: 0, suffix: '' },
  { label: 'Compliance score', value: 98.4, decimals: 1, suffix: '%' },
];

const partners = [
  'Retail pharmacies',
  'Nursing homes',
  'Care facilities',
  'Hospital dispensaries',
  'Compounding pharmacies',
];

export default function DashboardPage() {
  return (
    <DashboardLayout items={navItems}>
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-panel border border-hairline bg-raisedDark/30">
          <Spotlight className="-top-40 left-0 md:-top-24 md:left-1/4" />
          <div className="relative z-10 p-8">
            <AppHeader
              title="Overview"
              description="Compliance posture across your pharmacy network."
              actions={<ShimmerButton>New audit report</ShimmerButton>}
              className="border-0 pb-0"
            />
          </div>
        </div>

        <BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <SpotlightCard key={metric.label}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                  {metric.label}
                </p>
                <p className="mt-3 font-heading text-4xl text-primaryText">
                  <NumberTicker value={metric.value} decimalPlaces={metric.decimals} />
                  {metric.suffix}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </BlurFade>

        <BentoGrid>
          <BentoGridItem
            className="md:col-span-2"
            title="Ledger activity"
            description="Every controlled-substance movement, signed and timestamped."
            icon={<FileText className="h-4 w-4 text-accentRed" aria-hidden />}
          />
          <BentoGridItem
            title="Batch integrity"
            description="Cold-chain and lot tracking in a single view."
            icon={<Boxes className="h-4 w-4 text-accentRed" aria-hidden />}
          />
          <BentoGridItem
            title="Discrepancies"
            description="Real-time mismatch alerts with dual-signature reconciliation."
            icon={<ShieldCheck className="h-4 w-4 text-accentRed" aria-hidden />}
          />
          <BentoGridItem
            title="Report export"
            description="Generate compliance-ready audit reports in one click."
            icon={<BarChart3 className="h-4 w-4 text-accentRed" aria-hidden />}
          />
        </BentoGrid>

        <div className="rounded-panel border border-hairline bg-midnight py-4">
          <Marquee pauseOnHover>
            {partners.map((partner) => (
              <span
                key={partner}
                className="font-mono text-xs uppercase tracking-widest text-secondaryText"
              >
                {partner}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-secondaryText">
            Product states
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <EmptyState
              title="No discrepancies"
              description="Everything reconciles. New alerts will appear here."
            />
            <LoadingState label="Syncing ledger" />
            <ErrorState />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
