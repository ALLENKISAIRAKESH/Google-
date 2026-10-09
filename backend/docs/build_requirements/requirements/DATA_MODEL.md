# Proposed Supabase data model

Use UUID primary keys, `created_at`/`updated_at` timestamps, foreign keys, indexes and appropriate unique constraints. Adjust only when the schema remains aligned with the PRD. Write migrations; do not rely on manual dashboard-only schema changes.

## Core tables
- `profiles`: `id` references `auth.users`, `username` unique, `display_name`, `avatar_url`, `cover_url`, `bio`, `interests` (or normalized table), `skills`, optional profile fields, visibility settings.
- `follows`: `follower_id`, `following_id`, unique pair, prevent self-follow.
- `circles`: `id`, `owner_id`, `name`.
- `circle_members`: `circle_id`, `user_id`, unique pair.
- `posts`: `id`, `author_id`, `type`, `body`, `link_url`, `audience_type`, optional `community_id`, `circle_id`, status and timestamps.
- `post_media`: `id`, `post_id`, storage path, alt text, metadata.
- `post_reactions`: `post_id`, `user_id`, reaction, unique per user/post/reaction policy.
- `comments`: `id`, `post_id`, `author_id`, `parent_id`, `body`, status.
- `communities`: `id`, `owner_id`, `slug` unique, `name`, `description`, `category`, `visibility`, `rules`, status.
- `community_members`: `community_id`, `user_id`, `role`, `membership_status`, unique pair.
- `community_join_requests`: `community_id`, `user_id`, status, reviewed_by, reviewed_at.
- `collections`: `id`, `owner_id`, `title`, `description`, `visibility`.
- `collection_items`: `collection_id`, optional `post_id`, optional URL/title/note, position.
- `developer_profiles`: `user_id` unique, skills, goals, availability, external links, privacy choices.
- `projects`: `id`, `owner_id`, `title`, `description`, `stack`, `status`, `visibility`, repo/demo URLs, roles_needed, commitment.
- `project_applications`: `id`, `project_id`, `applicant_id`, message, skills, status, reviewed_at; unique application policy.
- `project_members`: `project_id`, `user_id`, role, status, unique pair.
- `project_tasks`: `id`, `project_id`, title, description, assignee_id, status, position.
- `events`: `id`, `organizer_id`, title, description, start_at, end_at, timezone, location/online_url, visibility, registration_deadline, status.
- `event_registrations`: `event_id`, `user_id`, status, networking_opt_in, networking_goal, optional intro, visible_fields; unique event/user.
- `connection_requests`: `id`, `event_id` nullable, `sender_id`, `receiver_id`, message, status; prevent self-request and duplicate pending requests.
- `connections`: `user_a_id`, `user_b_id`, accepted_at, normalized pair and uniqueness.
- `conversations`, `conversation_members`, `messages` if messaging is enabled.
- `notifications`: `recipient_id`, actor_id, type, entity_type, entity_id, read_at.
- `reports`: `reporter_id`, target_type, target_id, reason, details, status.
- `moderation_actions`: `moderator_id`, target_type, target_id, action, reason, created_at.
- `blocks`: `blocker_id`, `blocked_id`, unique pair.
- `mutes`: `user_id`, target_type, target_id.
- `audit_events`: minimal security/moderation audit fields; never store secrets.

## Security notes
- Enable RLS on all tables containing user/community/project/event data.
- `profiles`: public fields only via appropriate policies/view; private fields only owner/authorized audience.
- Posts: policies must evaluate audience, Circle membership, community membership and block relationships.
- Comments/reactions/media inherit parent post visibility.
- Private collection items inherit collection visibility.
- Private project details/applications only visible to permitted members/owners and the applicant as appropriate.
- Event networking directory returns only opted-in registrants and only allowed fields.
- Only event organizer/authorized roles can edit event settings; they cannot silently opt users into networking.
- Only community moderators can execute moderation actions for their community.
- Users may insert their own report; only authorized moderators can review it.
- Never ship Supabase service-role keys to the browser.
- Use signed URLs/private buckets where media is not public.
- Test RLS with at least two users and anonymous access.
