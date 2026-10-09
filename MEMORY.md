# Project Memory (Retention Log)

## Stack
- Next.js 13 (App Router) + React 18 + TypeScript
- UI: shadcn + Magic UI + Aceternity-style + OpenDesign DESIGN.md
- Style: Tailwind only
- Motion: Framer Motion (GSAP + Lenis already power scroll in this app)
- Data: Supabase client (`lib/supabase.ts`), Prisma schema (`prisma/schema.prisma`), route handlers under `app/api/`
- Quality bar: production SaaS, anti-slop

## Architecture decisions
- 2026-10-09: Hoisted the Next.js app out of the `project/` submodule to the repository root, because the dev server runs from the app root. `project/` is left in place as the original submodule.
- 2026-10-09: Established a governance + design-system layer at the repo root: AI_RULES.md, AGENTS.md, DESIGN.md, FEATURE_CATALOG.md, MEMORY.md, security.md, Code-Style.md, database.md, API-guide.md.

## Lessons learned
- (append)

## Security notes
- Never commit `.env` (ignored). Only `.env.example` is tracked.
- (append)

## Graphify / knowledge graph
- Run Graphify when available to build a persistent codebase graph.
- Prefer graph queries over re-reading the whole repo before large refactors.
- Setup commands:
  ```sh
  uv tool install graphifyy
  graphify install
  graphify .
  ```
- Graphify was NOT executed here (this environment has no shell access). Run the commands above locally, then append the generated graph summary below.

## Motion stack
- Lenis smooth scroll: provider at `components/providers/smooth-scroll-provider.tsx`; instance exposed via `hooks/use-lenis.ts`. Driven by the GSAP ticker (single rAF loop). No `scrollerProxy` needed — Lenis scrolls the native window, so ScrollTrigger's default scroller works.
- GSAP: central registration in `lib/gsap.ts` (ScrollTrigger registered once). Helpers in `components/motion/` — `FadeInOnScroll`, `StaggerReveal`, `ParallaxSection` (all use `useGSAP` for automatic cleanup).
- React Bits: copy-paste distribution (no npm package). Added at `components/react-bits/` — `SplitText`, `ShinyText`, `StarBorder`, `Squares`; barrel export in `components/react-bits/index.ts`.
- Dependencies: `lenis`, `gsap`, `@gsap/react` were already in package.json — no new installs were required.

## Session log
- 2026-10-09: Setup complete — governance files created, shadcn registries (Magic UI + Aceternity) configured, reusable Magic UI / Aceternity-style components and base shells added, app hoisted to the repo root.
- 2026-10-09: Motion stack added — refactored the Lenis provider (dropped redundant `scrollerProxy`, added reactive reduced-motion handling and anchor offset), added `lib/gsap.ts`, three GSAP motion helpers, four React Bits components, and demos on the home page and `/dashboard`.

## Motion caveats
- Smooth scroll fully disables itself when `prefers-reduced-motion: reduce` is set.
- Scrollable overlays (modals/drawers) should opt out of Lenis with `data-lenis-prevent`; use `useLenis()` to `stop()`/`start()` if needed.
- `Squares` canvas renders a single static frame under reduced motion.
