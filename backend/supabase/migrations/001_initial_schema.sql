-- ====================================================================
-- Google+ Redesign — Initial Schema Migration
-- Migration: 001_initial_schema.sql
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    cover_url TEXT,
    bio TEXT,
    headline TEXT,
    location TEXT,
    interests TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    website_url TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Follows Graph
CREATE TABLE IF NOT EXISTS public.follows (
    follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id),
    CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

-- 3. Circles (Iconic Google+ Feature)
CREATE TABLE IF NOT EXISTS public.circles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#ea4335',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Circle Members
CREATE TABLE IF NOT EXISTS public.circle_members (
    circle_id UUID NOT NULL REFERENCES public.circles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (circle_id, user_id)
);

-- 5. Communities
CREATE TABLE IF NOT EXISTS public.communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    avatar_url TEXT,
    banner_url TEXT,
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'restricted', 'private')),
    rules TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Community Members
CREATE TABLE IF NOT EXISTS public.community_members (
    community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'moderator', 'member')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'banned')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (community_id, user_id)
);

-- 7. Community Join Requests (For private/restricted communities)
CREATE TABLE IF NOT EXISTS public.community_join_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    message TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (community_id, user_id)
);

-- 8. Posts
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL DEFAULT 'text' CHECK (type IN ('text', 'link', 'image', 'question', 'project_showcase', 'event_announcement')),
    body TEXT NOT NULL,
    link_url TEXT,
    link_preview JSONB,
    audience_type TEXT NOT NULL DEFAULT 'public' CHECK (audience_type IN ('public', 'circles', 'community', 'private')),
    circle_id UUID REFERENCES public.circles(id) ON DELETE SET NULL,
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Post Media
CREATE TABLE IF NOT EXISTS public.post_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    media_url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Post Reactions (+1 / Likes / Celebrate)
CREATE TABLE IF NOT EXISTS public.post_reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reaction_type TEXT NOT NULL DEFAULT 'plus_one' CHECK (reaction_type IN ('plus_one', 'heart', 'rocket', 'brain', 'celebrate')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (post_id, user_id, reaction_type)
);

-- 11. Comments
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Collections / Bookmarks
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
    color TEXT DEFAULT '#4285f4',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Collection Items
CREATE TABLE IF NOT EXISTS public.collection_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    external_url TEXT,
    title TEXT,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Developer Profiles (Verified external coding links)
CREATE TABLE IF NOT EXISTS public.developer_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    github_url TEXT,
    leetcode_url TEXT,
    codeforces_url TEXT,
    hackerrank_url TEXT,
    portfolio_url TEXT,
    linkedin_url TEXT,
    primary_skills TEXT[] DEFAULT '{}',
    learning_goals TEXT[] DEFAULT '{}',
    availability TEXT DEFAULT 'open_to_collab' CHECK (availability IN ('open_to_collab', 'mentoring', 'seeking_mentor', 'busy')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Projects Board
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    roles_needed TEXT[] DEFAULT '{}',
    commitment TEXT DEFAULT 'part_time' CHECK (commitment IN ('hackathon', 'part_time', 'full_time', 'casual')),
    status TEXT DEFAULT 'recruiting' CHECK (status IN ('recruiting', 'in_progress', 'completed', 'archived')),
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
    repo_url TEXT,
    demo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Project Members
CREATE TABLE IF NOT EXISTS public.project_members (
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'contributor' CHECK (role IN ('owner', 'lead', 'contributor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (project_id, user_id)
);

-- 17. Project Applications
CREATE TABLE IF NOT EXISTS public.project_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_applied TEXT NOT NULL,
    message TEXT NOT NULL,
    portfolio_note TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (project_id, applicant_id)
);

-- 18. Project Tasks (Milestones)
CREATE TABLE IF NOT EXISTS public.project_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Events
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'hackathon',
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    timezone TEXT DEFAULT 'UTC',
    location TEXT,
    online_url TEXT,
    banner_url TEXT,
    capacity INT,
    visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'ended', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. Event Registrations (CRITICAL: Networking Opt-in is FALSE by default)
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
    -- Opt-in Instant Connect Guardrail
    networking_opt_in BOOLEAN NOT NULL DEFAULT false,
    networking_goal TEXT CHECK (networking_goal IN ('teammate', 'mentor', 'study_partner', 'speaker_organizer', 'general_networking')),
    intro TEXT,
    visible_fields JSONB DEFAULT '{"skills": true, "interests": true, "github": true, "bio": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (event_id, user_id)
);

-- 21. Connection Requests (Instant Connect Intros)
CREATE TABLE IF NOT EXISTS public.connection_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT no_self_request CHECK (sender_id != receiver_id),
    UNIQUE (sender_id, receiver_id, event_id)
);

-- 22. Accepted Connections
CREATE TABLE IF NOT EXISTS public.connections (
    user_a_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user_b_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_a_id, user_b_id),
    CONSTRAINT normalized_pair CHECK (user_a_id < user_b_id)
);

-- 23. Conversations & Messages
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversation_participants (
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('reply', 'reaction', 'mention', 'follow', 'project_application', 'instant_connect_request', 'instant_connect_accepted', 'event_reminder', 'moderation')),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. Reports & Moderation
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('user', 'post', 'comment', 'community', 'project', 'event', 'instant_connect')),
    target_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'actioned', 'dismissed')),
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.moderation_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    moderator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    report_id UUID REFERENCES public.reports(id) ON DELETE SET NULL,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('warning', 'remove_content', 'ban_user', 'dismiss')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. Blocks & Mutes
CREATE TABLE IF NOT EXISTS public.blocks (
    blocker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (blocker_id, blocked_id),
    CONSTRAINT no_self_block CHECK (blocker_id != blocked_id)
);

CREATE TABLE IF NOT EXISTS public.mutes (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('user', 'community')),
    target_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, target_type, target_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_community ON public.posts(community_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_event_reg_event ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_reg_optin ON public.event_registrations(event_id, networking_opt_in) WHERE networking_opt_in = true;
