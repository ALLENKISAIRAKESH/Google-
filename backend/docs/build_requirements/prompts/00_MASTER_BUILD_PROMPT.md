# Master prompt for Google Antigravity

You are the lead product engineer building the **Google+ Redesign** hackathon MVP. Read all files in this package before making changes, especially the PRD, implementation plan, data model, routes/components and acceptance criteria.

Build the independent Google+ reimagining described in the PRD. Do not call it PeopleUp, do not claim official Google endorsement, and do not change the locked scope. The defining differentiator is developer communities + project collaboration + event-based opt-in Instant Connect.

Stack is locked: React + TypeScript + Vite + Tailwind CSS + Supabase. Use modular components, strict TypeScript, React Router, typed Supabase access, migrations, and RLS.

First:
1. Inspect the repository and list existing files.
2. Summarize the product architecture and implementation phases.
3. Identify missing environment variables and setup steps.
4. Do not overwrite existing work without explaining why.

Then implement Phase 0 foundation. Create or update project files, routes, shared responsive layout, design tokens, Supabase client setup, `.env.example`, README, loading/empty/error states and reusable UI primitives. Keep the interface polished, accessible and mobile responsive. Use sample content only if it is visibly demo content.

After the foundation, proceed phase by phase only after validating each phase. Use SQL migrations for the schema. Enable RLS on all relevant tables and write policies that correctly enforce visibility, membership, ownership and roles. Never put the service-role key in frontend code.

Required Instant Connect behavior:
- off by default;
- user explicitly opts in per event;
- user chooses networking goal and visible fields;
- only opted-in attendees are discoverable;
- opt-out immediately removes them from results;
- requests require recipient action;
- blocking/reporting and rate limits;
- never reveal private contact details;
- organizers cannot silently opt users in.

Do not scrape coding sites. Use explicit user-entered profile URLs and authorized APIs only. Do not ship fake functionality or claim untested integrations work.

At each phase, report:
- files created/changed;
- requirements completed;
- commands actually run and their results;
- remaining gaps;
- next phase.
Use `requirements/ACCEPTANCE_CRITERIA.md` as the release checklist. Build a functional MVP, not a static mockup, and prioritize the rubric: product insight, originality, technical depth, working demo, impact/feasibility and time-boxed execution.
