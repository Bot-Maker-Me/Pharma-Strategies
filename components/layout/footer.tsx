import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-midnight py-16 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="font-heading text-2xl font-light tracking-tight text-primaryText !font-family var(--font-fraunces), serif">
              Pharma Strategies
            </Link>
            <p className="mt-4 max-w-sm font-sans text-sm text-secondaryText">
              A focused compliance marketplace for pharmaceutical and care operations teams.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apps" className="font-sans text-sm text-secondaryText transition-colors hover:text-accentRed">
                  Apps
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="font-sans text-sm text-secondaryText transition-colors hover:text-accentRed">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="font-sans text-sm text-secondaryText transition-colors hover:text-accentRed">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-sm text-secondaryText transition-colors hover:text-accentRed">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-secondaryText mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal" className="font-sans text-sm text-secondaryText transition-colors hover:text-accentRed">
                  Legal &amp; privacy
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="font-sans text-sm text-secondaryText transition-colors hover:text-accentRed">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-secondaryText/60">
            &copy; 2026 {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
