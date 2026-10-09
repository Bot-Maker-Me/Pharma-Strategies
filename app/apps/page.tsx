import { AppsGrid } from '@/components/sections/apps-grid';
import { apps as fallbackApps } from '@/config/apps';
import { supabaseServer } from '@/lib/supabase';

export const metadata = { title: 'Apps' };

export default async function AppsPage() {
  const { data } = await supabaseServer.from('apps').select('slug, name, tagline, description, features, category, is_active').eq('is_active', true).order('created_at');
  const apps = data?.length ? data.map((app) => ({ slug: app.slug, name: app.name, tagline: app.tagline, description: app.description, features: app.features, category: app.category, isActive: app.is_active, icon: fallbackApps.find((fallback) => fallback.slug === app.slug)?.icon ?? 'LayoutDashboard', popular: app.slug === 'narcotics-ledger' })) : fallbackApps;
  return <main><div className="mx-auto max-w-7xl px-4 pb-4 pt-16 text-center sm:px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Pharma Strategies marketplace</p><h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">Compliance tools for regulated teams</h1></div><AppsGrid apps={apps} /></main>;
}
