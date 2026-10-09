# Google Antigravity workflow notes

## Agent operating rules
1. Read every file in this package before coding.
2. First produce a concise implementation plan and list any conflicts; do not change product scope.
3. Inspect the current repository before creating or overwriting files.
4. Implement in small phases with reviewable diffs.
5. Run install, typecheck, lint and build after meaningful changes. Report actual command output; never claim a test passed without running it.
6. Keep secrets out of logs and source control.
7. Create Supabase migrations and RLS policies in version control.
8. Do not weaken RLS to make the demo work.
9. Use sample data only when labeled; keep a clear demo mode.
10. Do not add dependencies unless they serve a requirement.
11. Do not replace Instant Connect with a generic attendee list.
12. Keep the developer project-collaboration differentiator prominent.

## Suggested implementation order
- Inspect package and repository.
- Foundation, design tokens, routing, responsive shell.
- Supabase setup, migrations, authentication, profile.
- Feed and Circles with RLS tests.
- Communities and Collections.
- Developer Hub and projects.
- Events and opt-in Instant Connect.
- Notifications, moderation, accessibility, demo seed and deployment.

## Secrets
Use `.env.local` for local values and add it to `.gitignore`. Commit only `.env.example` with placeholders. Supabase anon/publishable key is client-facing but still relies on correct RLS. Never use the service-role key in browser code.
