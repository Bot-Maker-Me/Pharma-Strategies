export type AppCategory = 'Compliance' | 'Care Operations' | 'Operations';

export interface ComplianceApp {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  icon: string;
  features: string[];
  priceMonthly: number;
  priceYearly: number;
  externalSignupUrl?: string;
  isActive: boolean;
  popular?: boolean;
}

export const apps: ComplianceApp[] = [
  {
    slug: 'narcotics-ledger',
    name: 'Narcotics Ledger',
    tagline: 'Immutable controlled-substance tracking',
    description: 'Maintain a tamper-proof, audit-ready ledger for all controlled substances.',
    category: 'Compliance',
    icon: 'BookLock',
    features: ['Immutable audit trail', 'DEA Form 222 generation', 'Dual-signature workflows'],
    priceMonthly: 99,
    priceYearly: 990,
    isActive: true,
    popular: true,
  },
  {
    slug: 'nursing-home',
    name: 'Nursing Home',
    tagline: 'Medication compliance for care teams',
    description: 'Coordinate medication records, administration checks, and resident safety workflows.',
    category: 'Care Operations',
    icon: 'HeartPulse',
    features: ['Medication administration records', 'Resident safety checks', 'Care-team workflows'],
    priceMonthly: 149,
    priceYearly: 1490,
    isActive: true,
  },
  {
    slug: 'pharma-portal',
    name: 'Pharma Portal',
    tagline: 'One secure workspace for pharma operations',
    description: 'Bring regulatory documents, team workflows, and operational reporting into one secure portal.',
    category: 'Operations',
    icon: 'LayoutDashboard',
    features: ['Document control', 'Team approvals', 'Operational dashboards'],
    priceMonthly: 199,
    priceYearly: 1990,
    isActive: true,
  },
];

export interface PlatformTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

export const platformPricing: PlatformTier[] = [
  {
    name: 'Starter', monthlyPrice: 199, yearlyPrice: 1990,
    description: 'For small teams getting started with compliance automation.',
    features: ['Up to 3 compliance apps', '5 team members', 'Basic audit trails', 'Email support', 'Standard SLA'],
    ctaLabel: 'Start Free Trial', ctaHref: '/signup',
  },
  {
    name: 'Professional', monthlyPrice: 499, yearlyPrice: 4990,
    description: 'For growing pharma companies that need more power.',
    features: ['Up to 8 compliance apps', '25 team members', 'Advanced audit trails & e-signatures', 'Priority support', '99.9% uptime SLA', 'API access'],
    highlighted: true, ctaLabel: 'Start Free Trial', ctaHref: '/signup',
  },
  {
    name: 'Enterprise', monthlyPrice: 1299, yearlyPrice: 12990,
    description: 'For large-scale operations with custom requirements.',
    features: ['Unlimited compliance apps', 'Unlimited team members', 'Full GxP audit trails', 'Dedicated account manager', '99.99% uptime SLA', 'SSO & SAML'],
    ctaLabel: 'Contact Sales', ctaHref: '/contact',
  },
];

export function getAppBySlug(slug: string): ComplianceApp | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getActiveApps(): ComplianceApp[] {
  return apps.filter((app) => app.isActive);
}
