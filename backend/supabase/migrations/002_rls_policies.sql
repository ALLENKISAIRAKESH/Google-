-- ====================================================================
-- Google+ Redesign — Row Level Security (RLS) Policies
-- Migration: 002_rls_policies.sql
-- ====================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mutes ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if user is blocked
CREATE OR REPLACE FUNCTION public.is_blocked(user_a UUID, user_b UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.blocks
        WHERE (blocker_id = user_a AND blocked_id = user_b)
           OR (blocker_id = user_b AND blocked_id = user_a)
    );
$$;

-- 2. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (is_public = true AND NOT public.is_blocked(auth.uid(), id));

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 3. Circles Policies (Private to owner)
CREATE POLICY "Users can view own circles"
    ON public.circles FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can manage own circles"
    ON public.circles FOR ALL
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can manage circle members"
    ON public.circle_members FOR ALL
    USING (EXISTS (SELECT 1 FROM public.circles WHERE id = circle_id AND owner_id = auth.uid()));

-- 4. Posts Policies (Audience Filtering)
CREATE POLICY "View posts by audience"
    ON public.posts FOR SELECT
    USING (
        (audience_type = 'public' AND NOT public.is_blocked(auth.uid(), author_id))
        OR (author_id = auth.uid())
        OR (audience_type = 'circles' AND EXISTS (
            SELECT 1 FROM public.circle_members cm
            WHERE cm.circle_id = posts.circle_id AND cm.user_id = auth.uid()
        ))
        OR (audience_type = 'community' AND EXISTS (
            SELECT 1 FROM public.community_members cm
            WHERE cm.community_id = posts.community_id AND cm.user_id = auth.uid() AND cm.status = 'active'
        ))
    );

CREATE POLICY "Users can insert own posts"
    ON public.posts FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts"
    ON public.posts FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
    ON public.posts FOR DELETE
    USING (auth.uid() = author_id);

-- 5. Comments & Reactions
CREATE POLICY "Comments viewable if post is accessible"
    ON public.comments FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.posts p WHERE p.id = comments.post_id));

CREATE POLICY "Users can create comments"
    ON public.comments FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can manage own comments"
    ON public.comments FOR ALL
    USING (auth.uid() = author_id);

CREATE POLICY "Reactions viewable by all"
    ON public.post_reactions FOR SELECT
    USING (true);

CREATE POLICY "Users manage own reactions"
    ON public.post_reactions FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 6. Communities & Members
CREATE POLICY "Communities viewable according to visibility"
    ON public.communities FOR SELECT
    USING (
        visibility IN ('public', 'restricted')
        OR owner_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.community_members WHERE community_id = communities.id AND user_id = auth.uid())
    );

CREATE POLICY "Community members viewable by community members"
    ON public.community_members FOR SELECT
    USING (
        EXISTS (SELECT 1 FROM public.communities c WHERE c.id = community_id AND c.visibility = 'public')
        OR user_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.community_members WHERE community_id = community_members.community_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can join public communities"
    ON public.community_members FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Members or admins can leave or manage"
    ON public.community_members FOR DELETE
    USING (
        user_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.communities c WHERE c.id = community_id AND c.owner_id = auth.uid())
    );

-- 7. Developer Profiles & Projects
CREATE POLICY "Developer profiles are public"
    ON public.developer_profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can manage own developer profile"
    ON public.developer_profiles FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Projects viewable by audience"
    ON public.projects FOR SELECT
    USING (visibility = 'public' OR owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.project_members WHERE project_id = projects.id AND user_id = auth.uid()));

CREATE POLICY "Users can create projects"
    ON public.projects FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Project owners can update projects"
    ON public.projects FOR UPDATE
    USING (auth.uid() = owner_id);

CREATE POLICY "Project applications readable by applicant or project owner"
    ON public.project_applications FOR SELECT
    USING (applicant_id = auth.uid() OR EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.owner_id = auth.uid()));

CREATE POLICY "Users can apply to projects"
    ON public.project_applications FOR INSERT
    WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Project owners can review applications"
    ON public.project_applications FOR UPDATE
    USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.owner_id = auth.uid()));

-- 8. Events & OPT-IN Instant Connect Policies (STRICT GUARDRAIL)
CREATE POLICY "Events viewable by all"
    ON public.events FOR SELECT
    USING (visibility = 'public' OR organizer_id = auth.uid());

CREATE POLICY "Event organizers manage events"
    ON public.events FOR ALL
    USING (organizer_id = auth.uid());

-- CRITICAL: Only opted-in attendees can be discovered by other attendees!
CREATE POLICY "Instant Connect directory only returns explicitly opted-in registrants"
    ON public.event_registrations FOR SELECT
    USING (
        -- User can always see their own registration
        user_id = auth.uid()
        -- Organizer can see attendee list
        OR EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND e.organizer_id = auth.uid())
        -- Other attendees CAN ONLY SEE registrants if networking_opt_in IS TRUE!
        OR (
            networking_opt_in = true
            AND EXISTS (SELECT 1 FROM public.event_registrations er WHERE er.event_id = event_registrations.event_id AND er.user_id = auth.uid())
            AND NOT public.is_blocked(auth.uid(), user_id)
        )
    );

CREATE POLICY "Users can register or update own event registration"
    ON public.event_registrations FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Connection requests (Instant Connect)
CREATE POLICY "Connection requests visible to sender or receiver"
    ON public.connection_requests FOR SELECT
    USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Send connection request"
    ON public.connection_requests FOR INSERT
    WITH CHECK (sender_id = auth.uid() AND NOT public.is_blocked(auth.uid(), receiver_id));

CREATE POLICY "Receiver can accept/decline connection request"
    ON public.connection_requests FOR UPDATE
    USING (receiver_id = auth.uid() OR sender_id = auth.uid());

-- Accepted connections
CREATE POLICY "Connections visible to participants"
    ON public.connections FOR SELECT
    USING (user_a_id = auth.uid() OR user_b_id = auth.uid());

-- 9. Notifications
CREATE POLICY "Users see own notifications"
    ON public.notifications FOR SELECT
    USING (recipient_id = auth.uid());

CREATE POLICY "Users update own notifications"
    ON public.notifications FOR UPDATE
    USING (recipient_id = auth.uid());

-- 10. Reports & Safety
CREATE POLICY "Users can file reports"
    ON public.reports FOR INSERT
    WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Reporters can view their reports"
    ON public.reports FOR SELECT
    USING (reporter_id = auth.uid());

CREATE POLICY "Blocks and Mutes managed by owner"
    ON public.blocks FOR ALL
    USING (blocker_id = auth.uid())
    WITH CHECK (blocker_id = auth.uid());

CREATE POLICY "Mutes managed by owner"
    ON public.mutes FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
