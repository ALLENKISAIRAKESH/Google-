# Acceptance criteria and manual test checklist

## Foundation
- [ ] `npm install` and `npm run dev` work from a clean checkout.
- [ ] `npm run build` succeeds with TypeScript checks.
- [ ] Every primary route has a real page or intentional placeholder with clear status.
- [ ] Responsive layout works at mobile, tablet and desktop sizes.
- [ ] No secrets in source control; `.env.example` documents required variables.

## Authentication and profile
- [ ] Sign-up/sign-in/sign-out/reset flows work against configured Supabase.
- [ ] Protected pages redirect unauthenticated users appropriately.
- [ ] Profile changes persist and survive reload.
- [ ] User A cannot edit User B's profile.

## Feed and privacy
- [ ] Creating/editing/deleting own posts works.
- [ ] Reactions and comments persist.
- [ ] Audience selection is visible in the composer and post display.
- [ ] User B cannot query a private post intended for User A/Circle A.
- [ ] Media follows parent post permissions.
- [ ] Feed has loading, empty, error and pagination states.

## Communities
- [ ] Public join/leave works; private membership requests require review.
- [ ] Member-only content is not exposed to non-members.
- [ ] Only owners/moderators can access moderation actions.
- [ ] Reports are private to the reporter and authorized reviewers.

## Collections
- [ ] Create/edit/delete collection; add/remove item.
- [ ] Private collections are inaccessible to other users.
- [ ] Public collection sharing respects post visibility.

## Developer Hub and projects
- [ ] External coding links are validated and open safely.
- [ ] No scraping or unapproved integrations.
- [ ] Project owner can review applications.
- [ ] Unauthorized users cannot view private applications or project details.
- [ ] Accepted members can access permitted workspace details.

## Events and Instant Connect
- [ ] Event create/edit/cancel and RSVP work.
- [ ] Duplicate RSVP is prevented.
- [ ] Networking opt-in defaults OFF.
- [ ] Only attendees who explicitly opt in appear in Instant Connect.
- [ ] Opt-out immediately removes attendee from discovery.
- [ ] Users can choose goals and visible fields.
- [ ] Intro request can be accepted, declined or ignored.
- [ ] Private contact details are never exposed.
- [ ] Block/report/rate limiting is applied to connection requests.

## Safety and quality
- [ ] Blocked users cannot contact or discover each other in intended flows.
- [ ] Report workflow has status and reviewer controls.
- [ ] All forms validate inputs and show useful errors.
- [ ] Keyboard focus and labels are present on major controls.
- [ ] No dead buttons, misleading “connected” claims or fake data persistence.
- [ ] Demo seed content is labeled and does not masquerade as live usage.
