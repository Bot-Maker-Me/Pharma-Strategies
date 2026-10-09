# Feature Catalog

Reusable pieces available in this app. **Check here before building anything new.**
Reuse first — only add a component when nothing below fits.

## Layout
- `DashboardLayout` — components/layout/dashboard-layout.tsx
- `Sidebar` — components/layout/sidebar.tsx
- `AppHeader` — components/layout/app-header.tsx
- `PageContainer` — components/shared/page-container.tsx
- `Navbar` — components/layout/navbar.tsx (marketing chrome)
- `Footer` — components/layout/footer.tsx (marketing chrome)
- `BrandMark` — components/layout/brand-mark.tsx

## Core app
- `SearchBar` — (planned; compose from components/ui/input.tsx)
- `DataTable` — build on components/ui/table.tsx
- `AuthForm` — build on react-hook-form + zod
- `SettingsForm` — build on react-hook-form + zod
- `PolicyPage` — pattern in app/legal/page.tsx
- `EmptyState` — components/shared/empty-state.tsx
- `LoadingState` — components/shared/loading-state.tsx
- `ErrorState` — components/shared/error-state.tsx

## Marketing / polish
- `HeroSection` (Aceternity-style) — components/aceternity/hero-highlight.tsx
- `Spotlight` (Aceternity-style) — components/aceternity/spotlight.tsx
- `SpotlightCard` — components/aceternity/spotlight-card.tsx
- `BentoGrid` / `BentoGridItem` (Magic UI) — components/magicui/bento-grid.tsx
- `Marquee` (Magic UI) — components/magicui/marquee.tsx
- `NumberTicker` (Magic UI) — components/magicui/number-ticker.tsx
- `ShimmerButton` (Magic UI) — components/magicui/shimmer-button.tsx
- `BlurFade` (Magic UI) — components/magicui/blur-fade.tsx
- `Reveal` — components/shared/reveal.tsx
- `SectionLabel` — components/shared/section-label.tsx

## shadcn/ui primitives (do NOT hand-edit)
components/ui/* — button, card, dialog, sheet, table, tabs, form, input, select, badge,
dropdown-menu, tooltip, sonner/toast, and more.

## Demos / references
- app/dashboard/page.tsx — shows DashboardLayout + states + Magic UI + Aceternity pieces in use.

Update this file whenever a reusable component is added.
