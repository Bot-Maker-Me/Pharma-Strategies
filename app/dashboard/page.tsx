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
import { Marquee } from '@/components/magicui/marquee';
import { BlurFade } from '@/components/magicui/blur-fade';
import { SpotlightCard } from '@/components/aceternity/spotlight-card';
import { Button } from '@/components/ui/button';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { ParallaxSection } from '@/components/motion/parallax-section';
import { SplitText, ShinyText, StarBorder, Squares } from '@/components/react-bits';

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
          <ParallaxSection
            distance={40}
            className="pointer-events-none absolute inset-x-0 -bottom-16 -top-16 opacity-50"
          >
            <Squares direction="diagonal" speed={0.5} squareSize={44} borderColor="#1b2a44" />
          </ParallaxSection>
          <div className="relative z-10 p-8">
            <AppHeader
              title={<SplitText text="Overview" splitType="chars" />}
              description="Compliance posture across your pharmacy network."
              actions={<StarBorder>New audit report</StarBorder>}
              className="border-0 pb-0"
            />
          </div>
        </div>

        <StaggerReveal className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        </StaggerReveal>

        <FadeInOnScroll>
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
        </FadeInOnScroll>

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

        <BlurFade className="space-y-4">
          <ShinyText
            text="Product states"
            speed={6}
            className="font-mono text-xs uppercase tracking-widest"
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <EmptyState
              title="No discrepancies"
              description="Everything reconciles. New alerts will appear here."
            />
            <LoadingState label="Syncing ledger" />
            <ErrorState />
          </div>
        </BlurFade>

        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
