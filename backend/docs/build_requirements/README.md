# Google+ Redesign — Antigravity Build Requirements

This package is the implementation brief for building an independent, modern reimagining of Google+ in **Google Antigravity**. It is not an official Google product or an announced relaunch.

## How to use this package
1. Extract the ZIP into a clean project folder.
2. Open that folder in Antigravity.
3. Start with `prompts/00_MASTER_BUILD_PROMPT.md`.
4. Ask Antigravity to inspect all files before changing code.
5. Implement in phases; run the acceptance checks in `requirements/ACCEPTANCE_CRITERIA.md` after each phase.
6. Keep scope aligned with `requirements/PRODUCT_REQUIREMENTS.md`. Do not silently remove requirements or replace the product with a different concept.

## Locked technology stack
- React + TypeScript + Vite
- Tailwind CSS
- Supabase: Auth, PostgreSQL, Storage, Realtime only where needed
- React Router
- Lucide icons (or an existing consistent icon library)
- Deployable frontend; secrets supplied through environment variables
- Use Supabase Row Level Security (RLS) for all user-owned/private data

## MVP priority
Build a genuinely functional, responsive MVP with:
- Auth and profiles
- Feed and posts
- Audience controls / Circles
- Communities and moderation basics
- Collections/bookmarks
- Developer profiles, external coding links and project collaboration board
- Events and **opt-in Instant Connect**
- Notifications and report/block/mute flows
- Search, accessible responsive layout, settings and privacy controls

## Critical product guardrails
- Do not call the product “PeopleUp.” It is a Google+ redesign/reimagining.
- Do not claim official Google affiliation or use Google branding in a way that implies endorsement.
- Do not scrape LeetCode, Codeforces, HackerRank or GitHub. Use user-entered links or official APIs/OAuth only when authorized and configured.
- Do not expose every event attendee to Instant Connect by default. Instant Connect is opt-in, revocable, and privacy-controlled.
- Do not use frontend-only checks as security. Enforce access with Supabase RLS and server-side checks.
- Never commit `.env` secrets.
- No fake buttons or fake integrations. If a feature is not implemented, label it honestly.
- Keep demo/sample content clearly distinguishable from real user data.
