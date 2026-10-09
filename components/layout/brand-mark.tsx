'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase';

interface BrandMarkProps {
  dark?: boolean;
}

export function BrandMark({ dark = false }: BrandMarkProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [siteName, setSiteName] = useState('Pharma Strategies');

  useEffect(() => {
    let active = true;
    createSupabaseBrowserClient()
      .from('site_settings')
      .select('site_name, logo_url')
      .eq('id', 'default')
      .maybeSingle()
      .then(({ data }) => {
        if (active && data) {
          setSiteName(data.site_name || 'Pharma Strategies');
          setLogoUrl(data.logo_url || null);
        }
      });
    return () => { active = false; };
  }, []);

  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-navy-800 to-teal-500 shadow-md">
        {logoUrl ? <img src={logoUrl} alt="" className="h-full w-full object-cover" /> : <ShieldCheck className="h-5 w-5 text-white" />}
      </span>
      <span className={`font-heading text-lg font-bold tracking-tight ${dark ? 'text-white' : 'text-navy-800'}`}>{siteName}</span>
    </span>
  );
}
