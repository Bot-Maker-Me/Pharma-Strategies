import type { Metadata } from 'next';
import { Playfair_Display, Manrope, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { CursorGlow } from '@/components/effects/cursor-glow';
import { ClickSpark } from '@/components/react-bits';
import { siteConfig } from '@/config/site';

// High-contrast editorial serif for every large headline.
const displaySerif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Clean geometric sans for body copy, UI and tables.
const bodySans = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Mono is reserved for small uppercase labels and ledger data.
const ledgerMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Controlled Substance Compliance`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'pharmaceutical compliance',
    'narcotics ledger',
    'controlled substances',
    'narcotics tracking',
    'medication administration records',
    'pharmacovigilance',
    'regulatory compliance',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — Controlled Substance Compliance`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${bodySans.variable} ${ledgerMono.variable}`}
    >
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <CursorGlow />
          <ClickSpark />
          <div className="paper-grain" />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
