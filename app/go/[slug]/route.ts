import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const { data } = await supabaseServer
    .from('apps')
    .select('external_signup_url, is_active')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .maybeSingle();

  if (!data?.external_signup_url) {
    return NextResponse.redirect(new URL('/apps', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }

  try {
    const destination = new URL(data.external_signup_url);
    if (!['http:', 'https:'].includes(destination.protocol)) throw new Error('Unsupported destination');
    return NextResponse.redirect(destination);
  } catch {
    return NextResponse.redirect(new URL('/apps', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }
}
