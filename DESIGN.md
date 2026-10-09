# DESIGN.md — Pharma Strategies (this overrides any generic SaaS defaults)

## Brand
Serious, premium, confident pharmaceutical compliance. Deep navy site with warm cream and one restrained red accent. It should feel like a precise ledger: signed, stamped, auditable. Never playful, never generic. The bar is a hospital compliance officer trusting it on first sight.

## Colour tokens (Tailwind tokens, use only these)
- `midnight` #0B1220 — page base
- `raisedDark` #111827 — raised bands and card base
- `hairline` #24314B — 1px rules and borders on dark
- `primaryText` #F5F0E8 — cream off-white
- `secondaryText` #9AA7BD — muted navy-grey copy
- `accentRed` #C23B3B, `accentRedBright` #E04A4A — emphasis, CTAs, hover state
- `creamSheet` #F5F0E8 — cream cards, ledger paper, stamps
- `supportingBlue` #1D3557 — ambient light and glows only

Red stays under about 5 percent of any screen: primary buttons, the VERIFIED stamp, one headline word, alerts, link hover.
No zinc or slate greys, no purple, no bright gradients, no pure white or pure black.

## Typography
- Display: **Playfair Display** 400–700 (`--font-display`). Every large headline. High-contrast editorial serif, tight tracking (-0.015em), line-height 1.05–1.15.
- Body + UI: **Manrope** 300–700 (`--font-body`). Clean geometric sans, 15–18px, `text-secondaryText` for supporting copy.
- Mono: **IBM Plex Mono** (`--font-mono`). Only small uppercase labels (10–11px, tracking-widest) and ledger/table data.
- Fluid sizes with `clamp()`. No readable text under 14px; labels may sit at 10px uppercase.

## Layout
- `.ed-container` — max-width 1360px, gutters `clamp(20px, 5vw, 80px)`. Every band uses it so the left edge never drifts.
- Section padding `py-28 lg:py-36` (112 / 144px). Spacing follows the 4px scale; group in 8px steps.
- Asymmetric editorial layouts. Alternate navy and cream bands. Every section carries a real product visual.
- Headlines and cards align to the container edge; nothing floats by accident.

## Surface + depth
- `.glass-panel` — 1px inner highlight, very light navy inner glow, soft far shadow, subtle blur. Never a flat fill.
- `.panel-lift` — deeper version for product screenshots and app mocks.
- `.paper-sheet` — cream paper for the ledger sheet and stamps.
- `.paper-grain` — 2% soft-light film grain over the page.
- Hairline rules (`border-hairline`) and mono eyebrows separate blocks; accent rule `h-px w-8 bg-accentRed` precedes every section label.

## Motion
Lenis for smooth scroll. GSAP ScrollTrigger for pinned, scrubbed and word-reveal text. React Bits for text effects, Magic UI for marquees and tickers, Framer Motion for UI springs.
Easing cubic-bezier(0.22, 1, 0.36, 1), 0.6–0.9s, nothing bouncy. Animate transform and opacity only.
Heavy WebGL only in the hero, with a static fallback on mobile, low-power devices and reduced motion. Respect `prefers-reduced-motion` everywhere.

## Product mocks (must look production-ready)
Every mock is a real application window: chrome bar with dots and a mono title, a toolbar, aligned data rows on an explicit grid template (`grid-cols-[3rem_minmax(0,1fr)_2.75rem_2.75rem_2.75rem]`), tabular numerals, and a signature or status line. Drug names never collide with numbers — truncate inside a `minmax(0,1fr)` column.

## Copy rules
Plain and specific, like a pharmacist talking. No buzzwords.
No unverifiable claims: no SOC 2, no uptime percentages, no GxP or 21 CFR Part 11 claims, no fake customers, logos or statistics.

## Forbidden
Three identical feature cards, gradient text, icon-in-gradient-square tiles, numbered circles, "Most Popular" pills, centered stacked heroes, fake logo marquees, fake metrics.
