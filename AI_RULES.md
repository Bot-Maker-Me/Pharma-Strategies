# AI Rules — Production SaaS + OpenDesign Quality

## Core Mission
Build production SaaS UI that looks intentional and expensive — never generic AI slop.

## Tech Stack (mandatory)
- Next.js (App Router) + React 18 + TypeScript
- Tailwind CSS only
- shadcn/ui as base primitives
- Magic UI for polished marketing micro-interactions
- Aceternity UI for high-impact heroes, spotlight, beams, 3D cards
- Framer Motion / motion (GSAP + Lenis already power scroll in this app)
- lucide-react icons
- Prefer Vercel / Linear / Stripe level craft

## OpenDesign Quality Layer
- Follow DESIGN.md as the visual source of truth (tokens, type, spacing, motion, brand voice)
- Treat DESIGN.md like OpenDesign design systems: one system, every screen consistent
- No random aesthetic decisions if DESIGN.md already defines them
- Prefer real product states: loading, empty, error, success, disabled

## Anti-Slop Rules (hard)
FORBIDDEN by default:
- Purple gradient hero with no brand reason
- Three identical feature cards
- Fake metrics / lorem stats
- Inter-only boring typography with no hierarchy
- Generic "Unlock the power of AI" copy
- Decorative junk animations that hurt clarity

REQUIRED:
- Clear hierarchy
- Intentional spacing rhythm
- Strong contrast
- Accessible labels + keyboard paths
- Responsive layout
- Real empty/loading/error states

## Library priority
1. shadcn/ui → app UI (forms, tables, dialogs, nav, sheets)
2. Magic UI → marquees, number tickers, shimmer buttons, bento, subtle motion
3. Aceternity-style → heroes, spotlight, beams, 3D/tilt, cinematic sections
4. OpenDesign craft principles from DESIGN.md for overall taste and consistency

Install via shadcn/registry when possible. Do not reinvent components that registries already provide.

## Plan-First Protocol
Before coding:
1. Read AI_RULES.md + DESIGN.md + FEATURE_CATALOG.md + MEMORY.md
2. Read security.md if touching auth/data/payments
3. Reuse existing components first
4. Write a short plan
5. Implement minimal clean diffs
6. Append outcome to MEMORY.md

## Security defaults
- No secrets in code
- Server-side validation always
- No IDOR
- Authz checks on every sensitive resource
- Safe defaults for cookies/sessions

## Structure
- Routes / pages: `app/` (Next.js App Router). Keep routes valid so the UI stays visible.
- Components: `components/`
- UI primitives: `components/ui/` (shadcn — do NOT hand-edit these files)
- Magic UI: `components/magicui/`
- Aceternity-style: `components/aceternity/`
- Marketing / section blocks: `components/sections/`
- Shared building blocks: `components/shared/`
- Layout chrome: `components/layout/`
- Config + content: `config/`
- Path alias: `@/*` maps to the project root
