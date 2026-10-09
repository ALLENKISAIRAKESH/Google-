import { 
  UserProfile, 
  Post, 
  Community, 
  Collection, 
  Project, 
  EventItem, 
  InstantConnectAttendee, 
  ConnectionRequest, 
  NotificationItem, 
  MessageConversation, 
  ModerationReport 
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user_alex',
    username: 'alexrivera',
    displayName: 'Alex Rivera',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    headline: 'Staff Fullstack Architect & Open Source Contributor',
    bio: 'Building developer tools, distributed reactive systems, and exploring agentic coding workflows. Community organizer at Google+ Redesign.',
    location: 'San Francisco, CA',
    interests: ['AI Agents', 'Distributed Systems', 'Web Architecture', 'UI/UX Design'],
    skills: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL'],
    websiteUrl: 'https://alexrivera.dev',
    isPublic: true,
    role: 'moderator',
    developerProfile: {
      userId: 'user_alex',
      githubUrl: 'https://github.com/alexrivera-dev',
      leetcodeUrl: 'https://leetcode.com/u/alexrivera',
      codeforcesUrl: 'https://codeforces.com/profile/alexrivera',
      hackerrankUrl: 'https://hackerrank.com/profile/alexrivera',
      portfolioUrl: 'https://alexrivera.dev',
      linkedinUrl: 'https://linkedin.com/in/alexrivera-dev',
      primarySkills: ['React', 'TypeScript', 'PostgreSQL', 'Docker'],
      learningGoals: ['Rust WASM Modules', 'Vector Embeddings in Postgres'],
      availability: 'open_to_collab'
    },
    circles: [
      { id: 'c1', ownerId: 'user_alex', name: 'Core Teammates', color: '#ea4335', memberCount: 3, memberUserIds: ['user_elena', 'user_jordan', 'user_maya'] },
      { id: 'c2', ownerId: 'user_alex', name: 'AI & Research', color: '#4285f4', memberCount: 2, memberUserIds: ['user_elena', 'user_maya'] },
      { id: 'c3', ownerId: 'user_alex', name: 'Hackathon Squad', color: '#34a853', memberCount: 1, memberUserIds: ['user_jordan'] }
    ]
  },
  {
    id: 'user_elena',
    username: 'elenarostova',
    displayName: 'Dr. Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    headline: 'Principal AI Researcher & Systems Lead',
    bio: 'Researching neural evaluation frameworks, speculative decoding, and low-latency agent inference pipelines.',
    location: 'Seattle, WA',
    interests: ['Machine Learning', 'Deep Learning', 'PyTorch', 'Neurosymbolic AI'],
    skills: ['Python', 'PyTorch', 'CUDA', 'C++', 'FastAPI'],
    websiteUrl: 'https://elenarostova.ai',
    isPublic: true,
    role: 'user',
    developerProfile: {
      userId: 'user_elena',
      githubUrl: 'https://github.com/elena-rostova-ai',
      leetcodeUrl: 'https://leetcode.com/u/elena_ml',
      portfolioUrl: 'https://elenarostova.ai',
      primarySkills: ['PyTorch', 'Python', 'FastAPI', 'Distributed Systems'],
      learningGoals: ['Quantization algorithms', 'FlashAttention 3'],
      availability: 'mentoring'
    }
  },
  {
    id: 'user_jordan',
    username: 'jordanlee',
    displayName: 'Jordan Lee',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    headline: 'Computer Science Undergrad & Frontend Builder',
    bio: 'Passionate about accessible UI design, competitive programming, and building hackathon projects. Looking for teammates!',
    location: 'Austin, TX',
    interests: ['Hackathons', 'Competitive Programming', 'Tailwind CSS', 'Vite'],
    skills: ['TypeScript', 'React', 'Tailwind CSS', 'Python', 'Algorithms'],
    websiteUrl: 'https://jordanlee.io',
    isPublic: true,
    role: 'user',
    developerProfile: {
      userId: 'user_jordan',
      githubUrl: 'https://github.com/jordan-lee-code',
      leetcodeUrl: 'https://leetcode.com/u/jordan_solve',
      codeforcesUrl: 'https://codeforces.com/profile/jordan_cf',
      hackerrankUrl: 'https://hackerrank.com/profile/jordan_rank',
      portfolioUrl: 'https://jordanlee.io',
      primarySkills: ['React', 'TypeScript', 'Tailwind CSS', 'Python'],
      learningGoals: ['Next.js App Router', 'Dynamic Programming Patterns'],
      availability: 'seeking_mentor'
    }
  },
  {
    id: 'user_maya',
    username: 'mayachen',
    displayName: 'Maya Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    headline: 'Distributed Systems & Cloud Infrastructure Engineer',
    bio: 'Obsessed with high-throughput event buses, zero-trust container meshes, and PostgreSQL replication.',
    location: 'New York, NY',
    interests: ['Kubernetes', 'PostgreSQL', 'Rust', 'DevOps'],
    skills: ['Rust', 'Go', 'Kubernetes', 'PostgreSQL', 'Terraform'],
    websiteUrl: 'https://mayachen.cloud',
    isPublic: true,
    role: 'user',
    developerProfile: {
      userId: 'user_maya',
      githubUrl: 'https://github.com/maya-cloud-infra',
      portfolioUrl: 'https://mayachen.cloud',
      primarySkills: ['Go', 'Rust', 'PostgreSQL', 'Kubernetes'],
      learningGoals: ['eBPF observability', 'ClickHouse analytics'],
      availability: 'open_to_collab'
    }
  }
];

export const INITIAL_COMMUNITIES: Community[] = [
  {
    id: 'comm_aiml',
    ownerId: 'user_elena',
    slug: 'aiml-researchers',
    name: 'AI & Machine Learning Researchers',
    description: 'Technical discussions on LLM architectures, multi-agent frameworks, speculative decoding, and production AI deployment.',
    category: 'AI/ML',
    avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    visibility: 'public',
    rules: [
      'Focus on technical depth and cite papers where possible.',
      'Constructive peer-review and code feedback only.',
      'No low-effort hype or unverified claims.'
    ],
    memberCount: 4280,
    isMember: true,
    memberRole: 'member',
    createdAt: '2026-01-15T08:00:00Z'
  },
  {
    id: 'comm_web',
    ownerId: 'user_alex',
    slug: 'modern-web-craft',
    name: 'Modern Web Craftsmen',
    description: 'Frontend architecture, React 19, TypeScript compiler internals, Tailwind design systems, and delightful micro-interactions.',
    category: 'Web Development',
    avatarUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    visibility: 'public',
    rules: [
      'Share clean, reproducible code examples.',
      'Prioritize accessibility, responsiveness, and speed.',
      'Respectful architectural debates are welcomed.'
    ],
    memberCount: 6150,
    isMember: true,
    memberRole: 'owner',
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'comm_oss',
    ownerId: 'user_maya',
    slug: 'open-source-builders',
    name: 'Open Source Builders Guild',
    description: 'Discover emerging repositories, find maintainers and contributors, discuss RFCs, and collaborate across borders.',
    category: 'Open Source',
    avatarUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    visibility: 'public',
    rules: [
      'Maintain inclusive, helpful issue and PR etiquette.',
      'Only share genuine open source projects (permissive licenses preferred).',
      'Give constructive code reviews.'
    ],
    memberCount: 3890,
    isMember: false,
    createdAt: '2026-02-01T12:00:00Z'
  },
  {
    id: 'comm_systems',
    ownerId: 'user_maya',
    slug: 'systems-and-cloud',
    name: 'Distributed Systems & Cloud Infra',
    description: 'High-concurrency services, PostgreSQL tuning, raft consensus, container orchestration, and real-time streaming architectures.',
    category: 'Cloud & Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    visibility: 'restricted',
    rules: [
      'High signal-to-noise ratio: provide benchmarks when claiming optimizations.',
      'No spamming cloud provider affiliate links.'
    ],
    memberCount: 2940,
    isMember: false,
    createdAt: '2026-02-10T14:00:00Z'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    authorId: 'user_alex',
    author: {
      username: 'alexrivera',
      displayName: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      headline: 'Staff Fullstack Architect'
    },
    type: 'project_showcase',
    body: "🚀 Announcing the prototype for our **Agentic Code Intelligence Extension**!\n\nWe designed an AST indexer that tracks symbol dependencies across 20k+ line codebases in sub-second response times, pairing it with self-verifying test workflows.\n\nLooking for 1 Frontend UI Engineer and 1 Rust Systems Engineer to join our squad for the upcoming Global AI Hackathon. Check out the project board link below!",
    linkUrl: 'https://github.com/googleplus-redesign/agentic-code-intel',
    linkPreview: {
      title: 'Agentic Code Intelligence Extension (v0.4 preview)',
      description: 'High-performance workspace indexing with automated regression test validation.',
      domain: 'github.com',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'
    },
    audienceType: 'public',
    reactions: {
      plusOne: 48,
      heart: 19,
      rocket: 32,
      celebrate: 14,
      userReacted: 'plusOne'
    },
    commentCount: 5,
    comments: [
      {
        id: 'c_1',
        postId: 'post_1',
        authorId: 'user_jordan',
        author: {
          username: 'jordanlee',
          displayName: 'Jordan Lee',
          avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
        },
        body: 'This looks fantastic Alex! Just sent an application via the Project Board. I have 2 years of experience with React 19 and Tailwind CSS.',
        createdAt: '2026-04-18T14:32:00Z'
      },
      {
        id: 'c_2',
        postId: 'post_1',
        authorId: 'user_maya',
        author: {
          username: 'mayachen',
          displayName: 'Maya Chen',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
        },
        body: 'Sub-second AST graph indexing over 20k lines in WASM is seriously impressive. What parser are you using under the hood?',
        createdAt: '2026-04-18T15:10:00Z'
      }
    ],
    createdAt: '2026-04-18T13:45:00Z'
  },
  {
    id: 'post_2',
    authorId: 'user_elena',
    author: {
      username: 'elenarostova',
      displayName: 'Dr. Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      headline: 'Principal AI Researcher'
    },
    type: 'question',
    body: "Deep dive question for the AI Researchers community:\n\nWhen orchestrating multi-agent decision loops, are you seeing better reliability from hierarchical supervision (critic agent) or vote-based consensus across diverse system prompts?\n\nIn our benchmarks, hierarchical arbitration reduced hallucinations by 34%, but latency increased by 1.8x. How are you handling latency in production?",
    audienceType: 'community',
    communityId: 'comm_aiml',
    communityName: 'AI & Machine Learning Researchers',
    reactions: {
      plusOne: 62,
      heart: 8,
      rocket: 15,
      celebrate: 5
    },
    commentCount: 8,
    comments: [],
    createdAt: '2026-04-18T16:20:00Z'
  },
  {
    id: 'post_3',
    authorId: 'user_alex',
    author: {
      username: 'alexrivera',
      displayName: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      headline: 'Staff Fullstack Architect'
    },
    type: 'text',
    body: "Private update to my **Core Teammates Circle** 🔒:\n\nOur sprint planning for the hackathon demo is complete. I've enabled our project milestones board and verified our Supabase RLS security policies. Make sure your profiles are updated with your current GitHub handles!",
    audienceType: 'circles',
    circleId: 'c1',
    circleName: 'Core Teammates',
    reactions: {
      plusOne: 6,
      heart: 4,
      rocket: 5,
      celebrate: 2
    },
    commentCount: 2,
    createdAt: '2026-04-18T18:00:00Z'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_1',
    ownerId: 'user_alex',
    owner: {
      username: 'alexrivera',
      displayName: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    title: 'Agentic Code Intelligence Extension',
    tagline: 'Autonomous developer companion with instant AST indexing and self-verifying test workflows.',
    description: 'We are engineering a developer tool that bridges language servers with autonomous agents. It performs real-time AST dependency analysis and verifies proposed code modifications by running isolated sandbox tests before committing diffs.',
    techStack: ['TypeScript', 'React 19', 'Rust', 'WebAssembly', 'Tree-Sitter'],
    rolesNeeded: ['Frontend UI Engineer', 'Rust / Systems Dev', 'QA & Benchmarking'],
    commitment: 'hackathon',
    status: 'recruiting',
    visibility: 'public',
    repoUrl: 'https://github.com/googleplus-redesign/agentic-code-intel',
    demoUrl: 'https://agentic-intel.dev',
    members: [
      { userId: 'user_alex', displayName: 'Alex Rivera', username: 'alexrivera', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', role: 'owner' },
      { userId: 'user_elena', displayName: 'Dr. Elena Rostova', username: 'elenarostova', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', role: 'lead' }
    ],
    tasks: [
      { id: 't1', projectId: 'proj_1', title: 'Complete AST Symbol Graph Extractor in Rust', status: 'done', assigneeName: 'Elena' },
      { id: 't2', projectId: 'proj_1', title: 'Implement React 19 Diff Viewer Panel', status: 'in_progress', assigneeName: 'Alex' },
      { id: 't3', projectId: 'proj_1', title: 'Integrate Supabase Auth & Project Collaboration', status: 'todo' }
    ],
    applications: [
      {
        id: 'app_1',
        projectId: 'proj_1',
        applicantId: 'user_jordan',
        applicant: {
          username: 'jordanlee',
          displayName: 'Jordan Lee',
          avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          headline: 'Computer Science Undergrad & Frontend Builder'
        },
        roleApplied: 'Frontend UI Engineer',
        message: 'Hi Alex! I would love to build the frontend diff viewer and settings panels. I have deep experience in React, Tailwind, and keyboard navigation.',
        portfolioNote: 'Check my GitHub at github.com/jordan-lee-code',
        status: 'pending',
        createdAt: '2026-04-18T14:40:00Z'
      }
    ],
    createdAt: '2026-04-15T10:00:00Z'
  },
  {
    id: 'proj_2',
    ownerId: 'user_maya',
    owner: {
      username: 'mayachen',
      displayName: 'Maya Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    title: 'SafeWatch Distributed Sentinel',
    tagline: 'Real-time incident detection & resilient edge telemetry dispatching network.',
    description: 'An open source distributed sensor pipeline designed for critical system monitoring, real-time alert triage, and edge verification. Built with modular Docker containers and high-performance event queues.',
    techStack: ['Python', 'FastAPI', 'Docker', 'PostgreSQL', 'Redis', 'React'],
    rolesNeeded: ['DevOps / Docker Specialist', 'Fullstack API Engineer'],
    commitment: 'part_time',
    status: 'recruiting',
    visibility: 'public',
    repoUrl: 'https://github.com/googleplus-redesign/safewatch-sentinel',
    members: [
      { userId: 'user_maya', displayName: 'Maya Chen', username: 'mayachen', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', role: 'owner' }
    ],
    tasks: [
      { id: 't201', projectId: 'proj_2', title: 'Containerize microservices with Docker Compose', status: 'done', assigneeName: 'Maya' },
      { id: 't202', projectId: 'proj_2', title: 'Create REST Client test suites for incident endpoints', status: 'in_progress' }
    ],
    createdAt: '2026-04-10T12:00:00Z'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event_hackathon',
    organizerId: 'user_alex',
    organizer: {
      username: 'alexrivera',
      displayName: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    title: 'Global Autonomous AI Hackathon 2026',
    description: 'A 48-hour global sprint building agentic developer tools, reactive collaborative apps, and neural interfaces. Connect with mentors, form teams in real time using Instant Connect, and win community recognition.',
    category: 'hackathon',
    startAt: '2026-04-24T18:00:00Z',
    endAt: '2026-04-26T22:00:00Z',
    timezone: 'UTC',
    location: 'Virtual / Global',
    onlineUrl: 'https://meet.google.com/hackathon-2026',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    capacity: 2500,
    visibility: 'public',
    status: 'upcoming',
    attendeeCount: 1420,
    isRegistered: true,
    // Instant Connect default is OFF according to PRD
    networkingOptIn: false,
    networkingGoal: 'teammate',
    introNote: 'Fullstack architect looking for a teammate with Rust or ML experience!',
    visibleFields: {
      skills: true,
      interests: true,
      github: true,
      bio: true
    }
  },
  {
    id: 'event_summit',
    organizerId: 'user_elena',
    organizer: {
      username: 'elenarostova',
      displayName: 'Dr. Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    title: 'Next-Gen TypeScript & Edge Architecture Summit',
    description: 'Keynotes and live panel discussions exploring React Server Components, TypeScript 6.0 performance updates, and edge database replication.',
    category: 'webinar',
    startAt: '2026-04-28T16:00:00Z',
    endAt: '2026-04-28T20:00:00Z',
    timezone: 'PST',
    location: 'Online Livestream',
    onlineUrl: 'https://youtube.com/live/edge-summit-2026',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    capacity: 5000,
    visibility: 'public',
    status: 'upcoming',
    attendeeCount: 3100,
    isRegistered: false,
    networkingOptIn: false
  }
];

// Note: Strict PRD rule: Only attendees who explicitly opt in are discoverable!
export const INITIAL_INSTANT_CONNECT_ATTENDEES: InstantConnectAttendee[] = [
  {
    id: 'ic_1',
    userId: 'user_elena',
    username: 'elenarostova',
    displayName: 'Dr. Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    headline: 'Principal AI Researcher & Systems Lead',
    networkingGoal: 'mentor',
    intro: 'Open to advising 2 hackathon teams on speculative decoding or agent arbitration architectures.',
    skills: ['PyTorch', 'Python', 'FastAPI', 'Distributed Systems'],
    interests: ['Machine Learning', 'CUDA', 'Agent Loops'],
    githubUrl: 'https://github.com/elena-rostova-ai',
    registeredAt: '2026-04-17T11:00:00Z',
    connectionStatus: 'none'
  },
  {
    id: 'ic_2',
    userId: 'user_jordan',
    username: 'jordanlee',
    displayName: 'Jordan Lee',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    headline: 'Computer Science Undergrad & Frontend Builder',
    networkingGoal: 'teammate',
    intro: 'Looking for a hackathon team building web apps or AI tools! Can build fast, beautiful React & Tailwind UIs.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Python'],
    interests: ['Hackathons', 'Competitive Programming', 'Vite'],
    githubUrl: 'https://github.com/jordan-lee-code',
    registeredAt: '2026-04-18T09:30:00Z',
    connectionStatus: 'none'
  },
  {
    id: 'ic_3',
    userId: 'user_maya',
    username: 'mayachen',
    displayName: 'Maya Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    headline: 'Distributed Systems & Cloud Infrastructure Engineer',
    networkingGoal: 'teammate',
    intro: 'Interested in teaming up for backend infrastructure, Docker setups, or edge databases.',
    skills: ['Go', 'Rust', 'PostgreSQL', 'Docker'],
    interests: ['Kubernetes', 'Cloud Infrastructure'],
    githubUrl: 'https://github.com/maya-cloud-infra',
    registeredAt: '2026-04-18T10:15:00Z',
    connectionStatus: 'none'
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'coll_1',
    ownerId: 'user_alex',
    title: 'AI Engineering Roadmap 2026',
    description: 'Curated articles, open source libraries, and architectural diagrams for building reliable agent systems.',
    visibility: 'public',
    color: '#ea4335',
    itemCount: 4,
    items: [
      { id: 'ci_1', collectionId: 'coll_1', title: 'Multi-Agent Consensus & Hierarchical Arbitration', externalUrl: 'https://arxiv.org/abs/2401.0001', note: 'Essential read for agent supervision loops.', createdAt: '2026-04-10T10:00:00Z' },
      { id: 'ci_2', collectionId: 'coll_1', title: 'Postgres pgvector Index Optimization', externalUrl: 'https://supabase.com/docs/guides/ai', note: 'HNSW index benchmarks and tuning parameters.', createdAt: '2026-04-12T14:20:00Z' }
    ],
    createdAt: '2026-04-05T09:00:00Z'
  },
  {
    id: 'coll_2',
    ownerId: 'user_alex',
    title: 'Clean UI & Component Craft',
    description: 'Design patterns, micro-interactions, and accessible keyboard-first navigation.',
    visibility: 'public',
    color: '#4285f4',
    itemCount: 3,
    items: [],
    createdAt: '2026-04-08T11:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    recipientId: 'user_alex',
    actor: {
      username: 'jordanlee',
      displayName: 'Jordan Lee',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },
    type: 'project_application',
    title: 'New Collaboration Application',
    body: 'Jordan Lee applied for the Frontend UI Engineer role on Agentic Code Intelligence Extension.',
    entityType: 'project',
    entityId: 'proj_1',
    createdAt: '2026-04-18T14:40:00Z'
  },
  {
    id: 'notif_2',
    recipientId: 'user_alex',
    actor: {
      username: 'elenarostova',
      displayName: 'Dr. Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    type: 'reaction',
    title: '+1 on your project showcase',
    body: 'Dr. Elena Rostova gave a +1 to your post about Agentic Code Intelligence.',
    entityType: 'post',
    entityId: 'post_1',
    readAt: '2026-04-18T15:00:00Z',
    createdAt: '2026-04-18T14:10:00Z'
  }
];

export const INITIAL_CONVERSATIONS: MessageConversation[] = [
  {
    id: 'conv_1',
    participant: {
      userId: 'user_jordan',
      username: 'jordanlee',
      displayName: 'Jordan Lee',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      isOnline: true
    },
    lastMessage: 'Sounds great! I will review the AST viewer designs tonight.',
    unreadCount: 0,
    updatedAt: '2026-04-18T15:30:00Z',
    messages: [
      { id: 'm1', senderId: 'user_jordan', body: 'Hey Alex, excited to team up for the hackathon!', createdAt: '2026-04-18T15:20:00Z' },
      { id: 'm2', senderId: 'user_alex', body: 'Awesome Jordan, check the task checklist on the project board!', createdAt: '2026-04-18T15:25:00Z' },
      { id: 'm3', senderId: 'user_jordan', body: 'Sounds great! I will review the AST viewer designs tonight.', createdAt: '2026-04-18T15:30:00Z' }
    ]
  }
];

export const INITIAL_REPORTS: ModerationReport[] = [
  {
    id: 'rep_1',
    reporterId: 'user_maya',
    reporterName: 'Maya Chen',
    targetType: 'post',
    targetId: 'post_spam_mock',
    targetSummary: 'Promotional crypto Telegram link shared in Cloud Infra community',
    reason: 'Spam / Commercial advertising',
    details: 'User repeatedly posted automated Telegram links violating community rules.',
    status: 'submitted',
    createdAt: '2026-04-18T11:20:00Z'
  }
];

export const INITIAL_REELS = [
  {
    id: 'reel_1',
    creatorId: 'user_alex',
    creator: {
      username: 'alexrivera',
      displayName: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      headline: 'Staff Fullstack Architect'
    },
    title: 'React 19 Actions & useTransition in 45 Seconds ⚡',
    description: 'Stop using useEffect for form submission states! React 19 Actions handle pending states, optimistic updates, and error rollbacks natively.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    category: 'tech' as const,
    tags: ['react19', 'typescript', 'frontend', 'webdev'],
    likesCount: 1420,
    commentsCount: 88,
    sharesCount: 310,
    isLiked: false,
    createdAt: '2026-04-18T12:00:00Z'
  },
  {
    id: 'reel_2',
    creatorId: 'user_elena',
    creator: {
      username: 'elenarostova',
      displayName: 'Dr. Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      headline: 'Principal AI Researcher'
    },
    title: 'How Hierarchical Agent Loops Reduce Hallucinations by 34% 🧠',
    description: 'Benchmarking supervisor agents vs majority vote consensus across 10,000 code-generation prompts. Here is the architecture breakdown.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    category: 'ai' as const,
    tags: ['aiagents', 'machinelearning', 'llm', 'research'],
    likesCount: 2890,
    commentsCount: 215,
    sharesCount: 740,
    isLiked: true,
    createdAt: '2026-04-18T14:30:00Z'
  },
  {
    id: 'reel_3',
    creatorId: 'user_jordan',
    creator: {
      username: 'jordanlee',
      displayName: 'Jordan Lee',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      headline: 'CS Undergrad & UI Builder'
    },
    title: 'Building Modern Glassmorphic Cards with Tailwind v4 🎨',
    description: '3 quick CSS tricks: backdrop-blur-md, gradient border rings, and sub-pixel shadow stacking to make UI elements pop.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    category: 'design' as const,
    tags: ['tailwindcss', 'uidesign', 'css', 'designsystems'],
    likesCount: 940,
    commentsCount: 42,
    sharesCount: 160,
    isLiked: false,
    createdAt: '2026-04-18T16:00:00Z'
  },
  {
    id: 'reel_4',
    creatorId: 'user_maya',
    creator: {
      username: 'mayachen',
      displayName: 'Maya Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      headline: 'Distributed Systems Lead'
    },
    title: 'Why Postgres HNSW Indexes Beat IVFFlat in Production 🚀',
    description: 'Vector similarity search at 10M rows: HNSW provides higher recall without rebuild overhead. Here is our p99 latency curve.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    category: 'tech' as const,
    tags: ['postgres', 'database', 'pgvector', 'systems'],
    likesCount: 3120,
    commentsCount: 180,
    sharesCount: 890,
    isLiked: false,
    createdAt: '2026-04-18T17:15:00Z'
  }
];

