# DESIGN.md — Pharma Strategies (this overrides any generic SaaS defaults)

## Brand
Serious, premium, confident pharmaceutical compliance. Dark midnight-blue site with warm cream and one restrained red accent. It should feel like a precise ledger: signed, stamped, auditable. Never playful, never generic.

## Color tokens (CSS variables, use only these)
--bg #0B1220, --surface #131E33, --line #26344D, --text #EDE6DA, --text-2 #A9B6CC, --blue-glow #1D3557, --accent #B8323C.
Cream sections: background #EDE6DA with text #0B1220.
Red stays under about 5 percent of any screen: primary buttons, the VERIFIED stamp, one headline word, alerts, link hover.
No zinc or slate greys, no purple, no bright gradients, no pure white or pure black.

## Typography
Display: Bricolage Grotesque 600-800, letter-spacing -0.03em, line-height 0.95.
Body: Manrope. Mono: IBM Plex Mono only for small uppercase labels and table data.
Fluid sizes with clamp(). No readable text under 14px.

## Layout
Container max-width 1360px, side gutters clamp(20px, 5vw, 80px), section padding clamp(80px, 12vw, 160px).
Asymmetric editorial layouts. Alternate navy and cream bands. Every section has a real visual, never an empty placeholder.

## Motion
Lenis for smooth scroll. GSAP ScrollTrigger for pinned and scrubbed sections. React Bits for text effects and backgrounds, tinted to our palette. Framer Motion for UI springs.
Easing cubic-bezier(0.22, 1, 0.36, 1), 0.6-0.9s, nothing bouncy. Animate transform and opacity only.
Heavy WebGL effects only in the hero, with a static fallback on mobile, low-power devices and reduced-motion. Respect prefers-reduced-motion everywhere.

## Copy rules
Plain and specific, like a pharmacist talking. No buzzwords.
No unverifiable claims: no SOC 2, no uptime percentages, no GxP or 21 CFR Part 11 claims, no fake customers, logos or statistics.

## Forbidden
Three identical feature cards, gradient text, icon-in-gradient-square tiles, numbered circles, "Most Popular" pills, centered stacked heroes, fake logo marquees, fake metrics.
