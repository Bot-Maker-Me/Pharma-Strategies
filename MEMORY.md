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

## Session log
- 2026-10-09: Setup complete — governance files created, shadcn registries (Magic UI + Aceternity) configured, reusable Magic UI / Aceternity-style components and base shells added, app hoisted to the repo root.
