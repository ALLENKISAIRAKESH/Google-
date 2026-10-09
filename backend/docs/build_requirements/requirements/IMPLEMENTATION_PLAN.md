# Implementation Plan and Definition of Done

## Phase 0 — Foundation
- React + TypeScript + Vite + Tailwind.
- React Router and shared responsive app shell.
- Design tokens, reusable UI primitives, icons, toast/dialog/form patterns.
- Supabase client and `.env.example`.
- README and route placeholders.
**Done when:** project installs/builds, routes work, responsive shell is usable, no secrets are committed.

## Phase 1 — Supabase and authentication
- SQL migrations, profile table and profile bootstrap trigger/function if appropriate.
- Auth screens and protected routes.
- Session loading and sign-out.
- Profile create/edit and visibility fields.
- RLS and auth tests.
**Done when:** a real user can sign up/sign in, profile is stored, unauthorized profile writes are blocked.

## Phase 2 — Social foundation
- Posts, media metadata, reactions, comments, follows, Circles and audience targeting.
- Feed filters, create/edit/delete, bookmarks.
- RLS and storage policies.
**Done when:** two test users cannot read private posts outside their audience; interactions persist after reload.

## Phase 3 — Communities and collections
- Community creation, join/leave, roles, membership requests, discussions, rules and moderation basics.
- Collections/bookmarks.
- Search community and public content.
**Done when:** membership rules are enforced and moderation actions are role-protected.

## Phase 4 — Developer Hub and Projects
- Developer profile links/skills/goals.
- Project create/edit/search/apply; applicant decisions; members; checklist/milestones and resources.
- No scraping of third-party platforms.
**Done when:** a project owner can review an application and accepted users appear as team members.

## Phase 5 — Events and Instant Connect
- Event creation/edit/cancel, RSVP/registration, attendee visibility controls.
- Explicit opt-in networking, goals, intro requests, accept/decline/ignore, block/report, rate limits.
- Only opt-in users appear in Instant Connect.
**Done when:** an attendee who has not opted in cannot appear in networking results; opt-out immediately removes them from discovery.

## Phase 6 — Notifications, hardening and demo
- Notifications and preferences.
- Report queue, admin/moderator role enforcement, responsive and accessibility review.
- Seed data clearly labeled as demo content.
- Unit/integration/e2e smoke tests and deploy guide.
**Done when:** all critical acceptance criteria pass and no core button is fake.

## Hackathon execution priorities
1. Functional auth/profile.
2. Feed + post + comments/reactions + RLS.
3. Communities + membership.
4. Developer projects + applications.
5. Events + opt-in Instant Connect.
6. Polish, seed demo data and prepare 5-minute pitch.

## Out of scope for initial MVP
- Native audio/video meeting infrastructure.
- Native coding judge.
- Scraping third-party coding sites.
- Complex recommendation ML.
- Blockchain.
- Unreviewed AI moderation that permanently bans users.
- Native mobile apps.
