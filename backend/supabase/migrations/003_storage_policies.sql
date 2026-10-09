-- ====================================================================
-- Google+ Redesign — Storage Buckets and Policies
-- Migration: 003_storage_policies.sql
-- ====================================================================

-- 1. Insert Buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('avatars', 'avatars', true),
    ('post-media', 'post-media', true),
    ('project-assets', 'project-assets', true),
    ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Policies for Avatars
CREATE POLICY "Public avatar viewing"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users upload avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users update/delete own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 3. Storage Policies for Post Media
CREATE POLICY "Public post media viewing"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'post-media');

CREATE POLICY "Authenticated users upload post media"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'post-media'
        AND auth.role() = 'authenticated'
    );

-- 4. Storage Policies for Project & Event Assets
CREATE POLICY "Public project assets viewing"
    ON storage.objects FOR SELECT
    USING (bucket_id IN ('project-assets', 'event-banners'));

CREATE POLICY "Authenticated users upload project/event assets"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id IN ('project-assets', 'event-banners')
        AND auth.role() = 'authenticated'
    );
