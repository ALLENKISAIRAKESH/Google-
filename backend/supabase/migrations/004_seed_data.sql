-- ====================================================================
-- Google+ Redesign — Initial Seed Data
-- Migration: 004_seed_data.sql
-- ====================================================================

-- Note: In production Supabase, users are inserted via auth.users first.
-- This file provides idempotent reference seed data and categories.

-- Sample Categories & Communities
INSERT INTO public.communities (id, owner_id, slug, name, description, category, visibility, rules)
VALUES 
    (
        '11111111-1111-1111-1111-111111111101',
        '00000000-0000-0000-0000-000000000001',
        'aiml-researchers',
        'AI & Machine Learning Researchers',
        'Discussions on autonomous agents, LLM architectures, diffusion models, and real-world deployment.',
        'AI/ML',
        'public',
        ARRAY['Be constructive and respectful', 'Cite research papers where possible', 'No spam or unsubstantiated hype']
    ),
    (
        '11111111-1111-1111-1111-111111111102',
        '00000000-0000-0000-0000-000000000001',
        'modern-web-craft',
        'Modern Web Craftsmen',
        'Frontend architecture, React 19, TypeScript design patterns, edge computing, and performant web apps.',
        'Web Development',
        'public',
        ARRAY['Share clean code samples', 'Focus on accessibility and UX', 'Constructive critique only']
    ),
    (
        '11111111-1111-1111-1111-111111111103',
        '00000000-0000-0000-0000-000000000001',
        'open-source-builders',
        'Open Source Builders Guild',
        'Collaborate on open source tools, find maintainers, review PRs, and build developer infrastructure.',
        'Open Source',
        'public',
        ARRAY['Open-source first mindset', 'Proper issue/PR etiquette', 'No closed-source promotional spam']
    ),
    (
        '11111111-1111-1111-1111-111111111104',
        '00000000-0000-0000-0000-000000000001',
        'systems-and-cloud',
        'Distributed Systems & Cloud Infra',
        'Kubernetes, high-concurrency backends, Rust/Go microservices, and database tuning at scale.',
        'Cloud & Systems',
        'public',
        ARRAY['Deep technical discussions', 'Provide performance metrics when available']
    )
ON CONFLICT (slug) DO NOTHING;

-- Sample Flagship Events
INSERT INTO public.events (id, organizer_id, title, description, category, start_at, end_at, timezone, location, online_url, visibility, status)
VALUES
    (
        '22222222-2222-2222-2222-222222222201',
        '00000000-0000-0000-0000-000000000001',
        'Global Autonomous AI Hackathon 2026',
        '48-hour global hackathon building multi-agent developer workflows, intelligent tools, and reactive UIs. Features live mentoring and Instant Connect networking.',
        'hackathon',
        NOW() + INTERVAL '3 days',
        NOW() + INTERVAL '5 days',
        'UTC',
        'Online / Global',
        'https://meet.google.com/hackathon-2026',
        'public',
        'upcoming'
    ),
    (
        '22222222-2222-2222-2222-222222222202',
        '00000000-0000-0000-0000-000000000001',
        'Next-Gen TypeScript & Edge Architecture Summit',
        'Keynotes and interactive panels covering React Server Components, TypeScript 6.0, and edge database replication.',
        'webinar',
        NOW() + INTERVAL '7 days',
        NOW() + INTERVAL '7 days 4 hours',
        'PST',
        'Online Livestream',
        'https://youtube.com/live/edge-summit-2026',
        'public',
        'upcoming'
    )
ON CONFLICT (id) DO NOTHING;

-- Sample Projects
INSERT INTO public.projects (id, owner_id, title, tagline, description, tech_stack, roles_needed, commitment, status, visibility, repo_url)
VALUES
    (
        '33333333-3333-3333-3333-333333333301',
        '00000000-0000-0000-0000-000000000001',
        'Agentic Code Intelligence Extension',
        'Autonomous agent extension with AST indexing and real-time multi-file refactoring.',
        'Building a lightweight, high-performance editor companion that indexes whole repos and executes self-verifying test workflows.',
        ARRAY['TypeScript', 'Rust', 'WebAssembly', 'LSP'],
        ARRAY['Frontend UI Engineer', 'Rust / Systems Dev'],
        'hackathon',
        'recruiting',
        'public',
        'https://github.com/googleplus-redesign/agentic-code-intel'
    ),
    (
        '33333333-3333-3333-3333-333333333302',
        '00000000-0000-0000-0000-000000000001',
        'SafeWatch Distributed Sentinel',
        'Real-time automated incident detection and verification platform using computer vision and edge nodes.',
        'A resilient microservices platform analyzing streaming telemetry and dispatching coordinated safety alerts.',
        ARRAY['Python', 'FastAPI', 'React', 'Docker', 'PostgreSQL'],
        ARRAY['Fullstack Developer', 'DevOps / Docker Specialist'],
        'part_time',
        'recruiting',
        'public',
        'https://github.com/googleplus-redesign/safewatch-sentinel'
    )
ON CONFLICT (id) DO NOTHING;
