# Supabase setup

1. Create a Supabase project.
2. Copy the Project URL and publishable/anon key into local `.env.local` using the variable names expected by the app.
3. Apply SQL migrations in order using Supabase CLI or the SQL editor as documented by the implementation.
4. Enable RLS for all tables and test policies with multiple accounts.
5. Configure allowed redirect URLs for local and deployed auth callbacks.
6. Configure Storage buckets and policies before enabling image uploads.
7. Never expose `service_role` keys in browser code or commit them.
8. Keep migrations in the repository and review SQL before applying to production.

The starter requirements intentionally do not embed real Supabase credentials. Antigravity should generate and document the exact migrations as it implements each phase.
