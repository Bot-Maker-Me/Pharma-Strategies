# AI_RULES.md

Project guidance for AI assistants working in this codebase. Keep changes consistent with the conventions below.

## Tech Stack

- **React 18** with function components and hooks — no class components.
- **TypeScript** in strict mode — type everything, avoid `any`.
- **Vite** as the build tool and dev server.
- **React Router** for all routing; routes live in `src/App.tsx`.
- **Tailwind CSS** for all styling — no separate CSS files or CSS-in-JS.
- **shadcn/ui** (Radix UI primitives) for ready-made accessible components.
- **lucide-react** for icons.
- **Recharts** for charts and data visualization.
- **Native Web APIs / fetch** for data and persistence — no ORM or state library unless explicitly requested.

## Project Structure

- All source code lives in `src/`.
- Pages go in `src/pages/`; components go in `src/components/`.
- The default page is `src/pages/Index.tsx`.
- Update the main page (`Index.tsx`) so new components are actually visible.
- Prefer small, focused files and components over large ones.

## Library Usage Rules

- **Styling:** Use **Tailwind CSS** utility classes for all layout, spacing, color, and typography. Do not add plain `.css` files, styled-components, or Emotion.
- **UI components:** Use **shadcn/ui** first. These components are already installed — import them, don't add them again. Never edit the files in `src/components/ui/`; if you need different behavior, build a new component that wraps or composes them.
- **Radix UI:** Already installed. Use it only via shadcn/ui wrappers or when you need a primitive shadcn doesn't wrap.
- **Icons:** Use **lucide-react** only. Do not add other icon packs.
- **Routing:** Use **React Router**; keep all `<Route>` definitions in `src/App.tsx`. Do not add a second router.
- **Charts:** Use **Recharts**. Do not add Chart.js, D3, or other charting libraries.
- **Forms & validation:** Use **react-hook-form** with **zod** for schema validation when forms are non-trivial; use plain controlled inputs for simple cases.
- **Client state:** Prefer React's built-in `useState`/`useReducer`/Context. Only add a state library (e.g. Zustand) if the user explicitly asks.
- **Server data:** Use **@tanstack/react-query** for async data fetching/caching when needed; otherwise use `fetch` inside `useEffect`.
- **Dates & utilities:** Use **date-fns** for dates. Use **clsx**/**tailwind-merge** (via the `cn` helper) for conditional class names.
- **Toasts & dialogs:** Use shadcn/ui's `sonner`/`toast` and `dialog`/`alert-dialog` rather than custom implementations.
- **Persistence:** Use `localStorage`/`sessionStorage` or the provided database integration. Do not introduce a database client without the user choosing a provider.

## Code Conventions

- Never leave placeholder, partial, or TODO code — every shipped feature must be fully functional.
- Prefer editing related files only; leave unrelated files untouched.
- Validate only at system boundaries (user input, external APIs).
- Keep solutions simple — avoid over-engineering, premature abstractions, and unnecessary dependencies.
