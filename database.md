# Database Rules
- Backwards-compatible migrations only
- New columns nullable or defaulted
- Don't drop / rename casually
- Index common filters / joins
- Enforce tenant isolation in every query / policy
- Migrations live in `supabase/migrations/`; schema source is `prisma/schema.prisma`
