# Google+ Redesign — Backend Services & Database Migrations

This folder contains the complete database migrations, Row Level Security (RLS) policies, storage rules, and backend API services for the Google+ Redesign project.

## Directory Structure
- `supabase/migrations/`:
  - `001_initial_schema.sql`: Full PostgreSQL schema for profiles, follows, circles, posts, communities, collections, developer profiles, projects, events, networking, notifications, reports, and blocks.
  - `002_rls_policies.sql`: Complete Row Level Security policies enforcing private circles, audience filtering, and the mandatory **opt-in Instant Connect** privacy guardrail.
  - `003_storage_policies.sql`: Storage bucket setups and access policies for avatars, post media, project assets, and event banners.
  - `004_seed_data.sql`: Realistic seed data for communities, hackathons, and developer projects.
- `src/`: Express + TypeScript microservice providing:
  - Safe external profile URL validation (GitHub, LeetCode, Codeforces, HackerRank) without scraping.
  - Instant Connect rate-limiting and attendee sanitization.
  - Moderation queue management.
- `docs/build_requirements/`: Preserved hackathon PRD, data model specs, and acceptance criteria.

## Running the Backend Service
```bash
npm install
npm run dev
# Server will start on http://localhost:4000
```

## Applying Migrations to Supabase
You can apply the SQL migrations via the Supabase CLI:
```bash
supabase db push
# or copy the contents of supabase/migrations/ into your Supabase SQL Editor in numerical order.
```
