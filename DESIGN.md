# DESIGN.md — OpenDesign-style system

## Brand direction
- Premium modern SaaS
- Calm confidence, high clarity, restrained motion
- One accent color family, neutral foundation

## Typography
- Clear display + readable body scale
- Strong hierarchy (page title / section / body / caption)
- Avoid generic default-only typography choices
- This app already ships: Fraunces (display / headings), IBM Plex Sans (body), IBM Plex Mono (code/labels) via `next/font`.

## Color
- Neutral base (zinc / slate style)
- One primary accent
- Semantic colors: success / warning / danger / info
- Excellent contrast in light and dark
- This app's tokens live in `tailwind.config.ts` (midnight, raisedDark, hairline, primaryText, secondaryText, accentRed, creamSheet, supportingBlue).

## Spacing
- Consistent spacing scale
- Generous section padding
- Tight internal component spacing, airy page rhythm

## Components
- Prefer shadcn primitives
- Cards with clear hierarchy, not heavy decoration
- Buttons with obvious primary / secondary / destructive roles

## Motion
- Subtle, purposeful
- Prefer micro-interactions over spectacle
- Respect reduced motion

## Craft checklist before shipping UI
- Hierarchy obvious in 2 seconds
- No generic AI aesthetic
- Loading / empty / error states exist
- Mobile usable
- Brand tokens followed
