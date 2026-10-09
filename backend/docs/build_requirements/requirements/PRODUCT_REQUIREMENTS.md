# Product Requirements Document (PRD)

## 1. Product definition
**Working name:** Google+ Redesign  
**Purpose:** Reimagine Google+ as a meaningful social platform combining user-controlled social sharing, interest-based communities, developer collaboration, events and trust/privacy controls.  
**Differentiator:** Developer communities, coding profile links, project collaboration, and event-based opt-in Instant Connect.  
**Target:** A functional hackathon MVP with a clean architecture that can grow beyond the demo.

This is an independent concept, not an official Google product.

## 2. Product principles
1. People control their audience and recommendations.
2. Communities should lead to useful conversations, learning and collaboration.
3. Privacy and safety are product features, not settings added at the end.
4. Recommendations should be explainable and adjustable.
5. Integrations must be authorized and honest.
6. Accessible, responsive UX is required.
7. Avoid engagement manipulation, fake activity, and unnecessary feature bloat.

## 3. Primary personas
- Student/learner who wants relevant communities, resources and events.
- Developer who wants to showcase projects, find teammates and share coding links.
- Community organizer/moderator who manages members, events and safety.
- General user who wants meaningful sharing with explicit audience controls.

## 4. Information architecture
Primary navigation:
- Home
- Communities
- Explore
- Developer Hub
- Projects
- Events
- Collections
- Notifications
- Messages (may be a simplified MVP)
- Profile and Settings

Global UI: search, create post, create event/project, notification indicator, profile menu, responsive mobile navigation.

## 5. Authentication and onboarding
- Sign up, sign in, sign out, password reset, session persistence.
- Optional OAuth providers only if configured in Supabase.
- Create a profile with unique username, display name, avatar, bio and interests.
- Explain privacy/audience choices during onboarding.
- Ask for interests and suggest relevant communities, but allow skipping.
- Never require users to publish personal information.

## 6. Profile
- Display name, unique username, avatar, cover/banner, bio.
- Optional interests, skills, education/professional description and location.
- Project showcase and external links: GitHub, LeetCode, Codeforces, HackerRank, portfolio, LinkedIn.
- Visibility controls for optional fields.
- Follow/connect actions and report/block controls.
- Badges must be transparent and based on explicit, verifiable criteria; do not invent credentials.

## 7. Home feed and posts
Supported MVP post types:
- Text
- Link
- Image (through Supabase Storage)
- Question/discussion
- Poll if time permits
- Project showcase
- Event announcement
- Learning or milestone update

Interactions:
- Create, edit and delete own posts.
- React/unreact, comment/reply, mention where feasible, bookmark, share/repost if permissions allow.
- Follow/unfollow users.
- Hide post, mute user/community, report content.
- Filters: Following, Communities, Latest, Projects.
- Audience selector: Public, followers/connections, selected Circles, community, private.
- Show why a recommendation appears when recommended content is included.
- Pagination or incremental loading; empty, loading and error states.

## 8. Circles and audience controls
- Users can create and rename Circles and add/remove members.
- A post can target Public, followers/connections, selected Circles or private audience.
- Community-only content uses community membership rules.
- Privacy must be enforced in database policies and every query, not only hidden in the UI.
- Prevent unauthorized users from retrieving private post rows, comments, media URLs or notifications.

## 9. Communities
- Create, edit and archive a community.
- Public, private or restricted membership modes.
- Join/leave; request to join for private/restricted groups.
- Community profile: name, slug, description, category, rules, avatar/banner, owner and moderators.
- Posts/discussions, pinned announcements, resources and events.
- Roles: owner, moderator, member.
- Moderation basics: remove content from community, approve/deny join request, report queue, mute/ban when implemented, audit trail for moderation decisions.
- Community categories can include AI/ML, web development, DSA, open source, cybersecurity, careers, campus, education, design and entrepreneurship.

## 10. Explore and search
- Search public people, communities, public posts, projects, events and collections.
- Filters and clear no-results states.
- Explore interests, trending discussions, projects, communities and upcoming events.
- Recommendations must respect audience visibility and blocks/mutes.
- Avoid scraping external websites or exposing private data in search results.

## 11. Collections and bookmarks
- Bookmark a post.
- Create a collection with title, description and visibility.
- Add/remove/reorder saved posts or links.
- Public collections may be shared; private collections are owner-only.
- Collections may contain roadmaps, learning resources, event resources, research and project inspiration.

## 12. Developer Hub and project collaboration
- Developer profile with explicit skills, goals, interests, availability and external coding links.
- Links to GitHub, LeetCode, Codeforces, HackerRank and portfolio. User-submitted links work without API integrations.
- Do not scrape or impersonate those services.
- Project board: title, goal, description, tech stack, project stage, team roles needed, repo/demo links, visibility and application status.
- Create project, browse/search projects, express interest/apply, accept/reject applicants, list team members, close applications.
- Collaboration request includes skills wanted, commitment/time expectations and project context.
- Project workspace MVP: overview, links, members, task checklist/milestones, resource links and discussion/comments.
- Do not build a native coding judge for MVP.

## 13. Events
- Create, edit, cancel and discover events: hackathons, workshops, contests, webinars, study groups, demos and campus/community meetups.
- Fields: title, description, start/end time with timezone, location or online link, organizer, capacity if supported, visibility, registration deadline and resources.
- RSVP/register/cancel, attendee list visibility controls, reminders/notifications, event resources and post-event feedback.
- Prevent duplicate registrations and reject invalid time ranges.
- External meeting URLs are supported; native video calls are not required for MVP.

## 14. Opt-in Event Instant Connect — REQUIRED
This is a key differentiator and must be in the MVP.
- Event attendee must explicitly enable “Open to connect” for that event.
- Default is OFF; event attendance must not automatically expose someone to networking.
- When enabled, show only the minimum chosen public networking fields (display name, avatar, selected interests/skills, optional intro).
- Let users choose connection goals: teammate, mentor, study partner, speaker/organizer, general networking.
- Quick introduction/connection request with a short message; receiver can accept, ignore or decline.
- Only accepted requests create a connection or unlock direct messaging, depending on the implemented messaging model.
- Provide disable/leave-networking control, block and report actions.
- Do not reveal private email, phone, exact location, private profile fields or hidden attendee status.
- Explain who can see the user before activation.
- Rate-limit requests and protect against spam.
- Event organizers cannot silently opt attendees in.

## 15. Messaging and notifications
MVP messaging may be simplified, but should support safe contact after acceptance if time permits:
- Message requests or accepted-connection conversations.
- Text and links, timestamps, read/unread status.
- Block/report/mute.
- Never expose private messages in admin views by default.
Notifications:
- Replies, mentions, reactions, follows/connections, project applications, event registrations and moderation updates.
- Read/unread and category preferences.
- Avoid fake engagement or excessive notifications.

## 16. Safety, moderation and privacy
- Report user/post/comment/community/project/event/connection request.
- Block and mute.
- Moderation queue for authorized moderators/admins.
- Clear states: submitted, under review, actioned, dismissed; appeal may be Phase 2.
- Admin actions are role-protected and logged.
- Rate-limit high-risk actions.
- Use safe rendering and validation; avoid XSS and unsafe URL handling.
- Use RLS for row-level access and private storage policies.
- Provide account settings, profile visibility, notification preferences, connected-account controls, logout and account deletion/export pathway where feasible.
- Do not promise end-to-end encryption unless actually implemented and reviewed.

## 17. AI features — optional, not a blocker
Potential future capabilities: summarize a public community thread, summarize permitted project documentation, explain a code snippet, draft a community announcement.
- Must be clearly labeled as AI-assisted.
- Do not send private content to an AI provider without informed consent.
- AI cannot silently make permanent bans or claim perfect truth detection.
- If no secure API configuration exists, omit the feature rather than ship a fake assistant.

## 18. UX and accessibility
- Responsive mobile/tablet/desktop layouts.
- Keyboard navigation and visible focus.
- Semantic controls and accessible labels.
- Alt text for meaningful images; captions when video is supported.
- Adequate contrast and readable type.
- Loading, empty, success and error states.
- Clear privacy indicators on posts and events.
- No fake links/buttons or dead-end screens.

## 19. Design direction
- Familiar, clean, content-first interface inspired by Google+ era's clarity, but original enough not to imply an official Google product.
- Modern cards, spacious layout, readable typography, restrained red accent with neutral surfaces.
- Responsive left navigation on desktop and bottom/mobile drawer navigation.
- Consistent spacing, typography, color tokens, button states, badges, dialogs and form validation.
- Do not copy Google+ logos or official branding assets unless authorized; use a neutral text wordmark “Google+ Redesign” for the concept.

## 20. Non-functional requirements
- TypeScript strictness; modular components and typed data.
- Use environment variables for Supabase URL/key.
- Never put service-role key in frontend.
- RLS enabled on all user data tables.
- Validate on client and server/database.
- Prevent duplicate joins/RSVPs/applications using constraints.
- Use pagination for feeds and search.
- Provide useful logs without leaking secrets or private content.
- Basic unit/integration tests for critical privacy and interaction flows.
- Document setup, environment configuration, migrations, demo accounts and deployment.
