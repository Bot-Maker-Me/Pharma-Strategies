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
- React Bits: copy-paste distribution (no npm package). Added at `components/react-bits/` — `SplitText`, `ShinyText`, `StarBorder`, `Squares`, `Magnet`, `Silk`; barrel export in `components/react-bits/index.ts` (`Silk` is deliberately excluded so its OGL/WebGL bundle stays lazy).
- `SplitText` (lines mode) uses the now-free GSAP `SplitText` plugin (`type: 'lines'`, `mask: 'lines'`, `autoSplit`). Its rendered tree is intentionally independent of `prefers-reduced-motion` and all animated state lives in `split-lines*` CSS classes toggled by GSAP — this stops React re-renders from clobbering the DOM that SplitText restructures.
- `lib/gsap.ts` also registers `SplitText` + `CustomEase` and exposes `DESIGN_EASE` (id `design` = cubic-bezier(0.22, 1, 0.36, 1)) and `DESIGN_EASE_ARRAY` for Framer Motion.
- Dependencies: `lenis`, `gsap`, `@gsap/react`, `framer-motion` were already in package.json. Added `ogl` (v1) for the React Bits `Silk` WebGL background.

## Session log
- 2026-10-09: Setup complete — governance files created, shadcn registries (Magic UI + Aceternity) configured, reusable Magic UI / Aceternity-style components and base shells added, app hoisted to the repo root.
- 2026-10-09: Motion stack added — refactored the Lenis provider (dropped redundant `scrollerProxy`, added reactive reduced-motion handling and anchor offset), added `lib/gsap.ts`, three GSAP motion helpers, four React Bits components, and demos on the home page and `/dashboard`.
- 2026-10-09: Layout + performance pass — fixed the stacked/overlapping captions in `narcotics-ledger-pinned`, rebuilt `apps-horizontal` as a measured sticky horizontal scroller, removed per-`mousemove` React state from the hero and bento grid (now rAF/CSS-variable driven), corrected section numbering (§05–§09), and added global cursor effects (`CursorGlow`, `ClickSpark`).
- 2026-10-09: Hero motion pass (DESIGN.md) — installed `ogl` and added React Bits `Silk` (lazy, in-view, tinted midnight/blue/faint-red with a static gradient fallback for reduced motion / <768px / no WebGL) and `Magnet`; upgraded `SplitText` for masked line reveals + a `highlight` outline→fill-red wipe. Rebuilt the hero: SplitText H1, magnetised buttons, spring-tilted ledger with a cursor sheen, per-row write-in + VERIFIED stamp press, drifting chips with pointer depth, and a GSAP ScrollTrigger scrub (headline scale/opacity, ledger -80px). Everything respects reduced motion and animates transform/opacity only. Not verified visually — no shell/visual access here.

## Motion caveats
- Smooth scroll fully disables itself when `prefers-reduced-motion: reduce` is set.
- Scrollable overlays (modals/drawers) should opt out of Lenis with `data-lenis-prevent`; use `useLenis()` to `stop()`/`start()` if needed.
- `Squares` canvas renders a single static frame under reduced motion.
- The hero `Silk` background only mounts when the section is in view AND width ≥ 768px AND WebGL is available AND motion is allowed; otherwise it falls back to a static radial gradient (`radial-gradient` on `#0B1220`).
- `SplitText` in `lines` mode renders its final state (no split, accent already filled red) under reduced motion.
