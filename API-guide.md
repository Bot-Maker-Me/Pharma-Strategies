# API Guide
- Consistent response shape
- Explicit auth errors
- Validate body / query / params
- Paginate lists
- Never expose stack traces to clients
- Idempotent writes where practical
- Route handlers live under `app/api/` (e.g. `app/api/leads/route.ts`)
