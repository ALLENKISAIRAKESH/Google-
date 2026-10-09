import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Tv, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  FileText, 
  Maximize2, 
  Minimize2,
  Video,
  ExternalLink,
  Code2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  rubricScore?: string;
  content: React.ReactNode;
  speakerNotes: string;
}

export const PresentationPage: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      tag: "Hackathon Pitch Deck",
      title: "Google+ Reimagined",
      subtitle: "The High-Signal Collaborative Social Network for Developers & Creators",
      rubricScore: "Submission Checklist (Prototype, Code, Summary, PPT)",
      content: (
        <div className="flex flex-col justify-center h-full space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider w-fit">
            Google+ Redesign Challenge
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Connecting Engineers Through Purposeful Circles, Instant Matchmaking, & Micro-Learning Reels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="text-red-400 font-bold text-sm">Target Audience</div>
              <div className="text-white text-base font-semibold mt-1">Developers, AI Researchers & Creators</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="text-blue-400 font-bold text-sm">Core Innovation</div>
              <div className="text-white text-base font-semibold mt-1">Circles + Instant Connect + Reels</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
              <div className="text-emerald-400 font-bold text-sm">Execution</div>
              <div className="text-white text-base font-semibold mt-1">Production Full-Stack (React 19 + Supabase)</div>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Welcome judges. Today we present the rebirth of Google+. Rather than repeating history by cloning a generic social network, we solved developer fatigue by transforming Google+ into a high-utility collaborative network."
    },
    {
      id: 2,
      tag: "Problem Analysis (20 Pts)",
      title: "Why Did Google+ Fail?",
      subtitle: "4 Structural Flaws That Led to the Shutdown of the Original Platform",
      rubricScore: "Product & Analysis & PS Identification — 20 Pts",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="bg-slate-800/60 border border-red-500/30 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-red-400 font-extrabold text-sm uppercase">01. Forced Identity & Resentment</div>
              <h3 className="text-lg font-bold text-white mt-1">Mandatory Account Merges</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Forcing YouTube comment systems and Gmail accounts onto Google+ inflated account metrics but created zero authentic engagement and intense user frustration.
              </p>
            </div>
            <span className="text-xs text-red-400 font-medium">Outcome: Millions of phantom 'ghost town' profiles.</span>
          </div>

          <div className="bg-slate-800/60 border border-amber-500/30 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 font-extrabold text-sm uppercase">02. The Facebook Clone Trap</div>
              <h3 className="text-lg font-bold text-white mt-1">Undifferentiated Value Proposition</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Google+ entered as a generalized friends-and-family feed. Users already had their social graphs cemented on Facebook, with zero switching incentive.
              </p>
            </div>
            <span className="text-xs text-amber-400 font-medium">Outcome: Lack of retention loops or network moat.</span>
          </div>

          <div className="bg-slate-800/60 border border-blue-500/30 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-blue-400 font-extrabold text-sm uppercase">03. Circles UX Friction</div>
              <h3 className="text-lg font-bold text-white mt-1">High Cognitive Overhead</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                While Circles pioneered privacy, manual drag-and-drop sorting felt like a chore without immediate utility or pre-configured defaults.
              </p>
            </div>
            <span className="text-xs text-blue-400 font-medium">Outcome: Users defaulted to public or abandoned posting.</span>
          </div>

          <div className="bg-slate-800/60 border border-emerald-500/30 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-emerald-400 font-extrabold text-sm uppercase">04. Ignored Creator Discovery</div>
              <h3 className="text-lg font-bold text-white mt-1">Zero Modern Content Formats</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                No developer repo integration, no project recruitment boards, and no short-form discovery media for micro-learning.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-medium">Outcome: Creators migrated to Medium, YouTube, and X.</span>
          </div>
        </div>
      ),
      speakerNotes: "Our analysis pinpointed 4 root causes: forced identity alienated users, trying to clone Facebook eliminated differentiation, manual Circles created UX friction, and technical creators had no specialized tools."
    },
    {
      id: 3,
      tag: "Originality & Vision (20 Pts)",
      title: "The New Purpose: Developer Collaboration Hub",
      subtitle: "From Generic Social Network to High-Signal Engineering Ecosystem",
      rubricScore: "Rethinking & Originality — 20 Pts",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
          <div className="bg-slate-800/70 border border-blue-500/30 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg mb-3">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white">Audience Precision</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Pivoted from family photos to verified developer profiles, GitHub repository links, and code snippet discussions.
              </p>
            </div>
            <div className="text-xs text-blue-300 font-semibold mt-4">Signal over Algorithmic Rage</div>
          </div>

          <div className="bg-slate-800/70 border border-emerald-500/30 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">
                🤝
              </div>
              <h3 className="text-xl font-bold text-white">Instant Serendipity</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Opt-in Instant Connect engine matches engineers for hackathons, co-founders, and mentorship based on complementary tech stacks.
              </p>
            </div>
            <div className="text-xs text-emerald-300 font-semibold mt-4">Zero spam; 100% opt-in matching</div>
          </div>

          <div className="bg-slate-800/70 border border-rose-500/30 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg mb-3">
                🎬
              </div>
              <h3 className="text-xl font-bold text-white">Micro-Learning Reels</h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Vertical 9:16 short video feed dedicated to algorithm animations, CSS tips, AI paper breakdowns, and engineering culture.
              </p>
            </div>
            <div className="text-xs text-rose-300 font-semibold mt-4">Bite-sized knowledge in 60s</div>
          </div>
        </div>
      ),
      speakerNotes: "We rethought Google+ around three pillars: targeted developer audience precision, active algorithmic serendipity for hackathons and projects, and micro-learning entertainment via Reels."
    },
    {
      id: 4,
      tag: "Tech Depth & Quality (20 Pts)",
      title: "System Architecture & Engineering Depth",
      subtitle: "Strict 2-Tier Monorepo with React 19, TypeScript, and Supabase PostgreSQL RLS",
      rubricScore: "Solution Quality & Tech Depth — 20 Pts",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
            <div className="text-blue-400 font-bold text-sm uppercase">Frontend Application</div>
            <h4 className="text-base font-bold text-white mt-1">React 19 + TypeScript 5.8</h4>
            <ul className="text-xs text-slate-300 space-y-2 mt-3">
              <li>• Built with Vite for sub-second hot reloading.</li>
              <li>• Tailwind CSS v4 design system with dark/light mode.</li>
              <li>• Interactive Persona Switcher for live judge testing.</li>
              <li>• Responsive mobile navigation drawer & custom SVGs.</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
            <div className="text-emerald-400 font-bold text-sm uppercase">Microservice Layer</div>
            <h4 className="text-base font-bold text-white mt-1">Express API & Matching Engine</h4>
            <ul className="text-xs text-slate-300 space-y-2 mt-3">
              <li>• <code className="text-emerald-300">/api/link-preview</code>: Scrapes live OpenGraph repo cards.</li>
              <li>• <code className="text-emerald-300">/api/instant-connect/candidates</code>: Deterministic scoring.</li>
              <li>• <code className="text-emerald-300">/api/moderation/inspect</code>: Content toxicity check.</li>
              <li>• TypeScript compilation passing with zero errors.</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
            <div className="text-amber-400 font-bold text-sm uppercase">Database & Security</div>
            <h4 className="text-base font-bold text-white mt-1">26-Table SQL + Strict RLS</h4>
            <ul className="text-xs text-slate-300 space-y-2 mt-3">
              <li>• Relational schema for circles, reels, events, and posts.</li>
              <li>• <strong>Row Level Security (RLS)</strong>: Users outside a circle cannot query private posts.</li>
              <li>• Explicit opt-in filtering for instant connect discovery.</li>
              <li>• Storage policies for avatar and media security.</li>
            </ul>
          </div>
        </div>
      ),
      speakerNotes: "On the technical front, we maintained exceptional discipline. We built a clean two-folder structure, verified zero TypeScript compilation errors, implemented a 26-table database schema, and enforced PostgreSQL Row Level Security."
    },
    {
      id: 5,
      tag: "Feature Deep Dive",
      title: "The Reels Feature: Technical Entertainment",
      subtitle: "Vertical Short-Form Video Feed for Engineering Culture & Micro-Learning",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
              <Video className="w-4 h-4" /> Built for User-Specific Engagement
            </div>
            <h3 className="text-2xl font-bold text-white">Micro-Learning Meets Modern Video UX</h3>
            <ul className="text-sm text-slate-300 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✔</span>
                <span><strong>9:16 Vertical Video Player:</strong> Fullscreen mobile-friendly playback with play/pause and mute/unmute toggles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✔</span>
                <span><strong>Category-Specific Filtering:</strong> Toggle instantly between Tech, AI, Dev Life, and Design tips.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✔</span>
                <span><strong>Community Creator Tools:</strong> Post reels directly with tags, code links, and descriptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✔</span>
                <span><strong>Real-Time Discussion Drawer:</strong> Comment threads anchored to specific technical concepts.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link to="/reels" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm">
                Open Reels in Prototype <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col justify-center space-y-3">
            <div className="text-xs font-bold uppercase text-slate-400">Sample Reel Categories in Feed:</div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-purple-400 uppercase">AI & Transformers</span>
              <div className="text-sm font-semibold text-white mt-1">Visualizing Multi-Head Attention in 45 Seconds</div>
              <div className="text-xs text-slate-400 mt-1">Dr. Elena Rostova • 1.2k Likes • #machinelearning</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-blue-400 uppercase">Frontend Architecture</span>
              <div className="text-sm font-semibold text-white mt-1">React 19 Server Actions Explained</div>
              <div className="text-xs text-slate-400 mt-1">Alex Rivera • 890 Likes • #react19</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-emerald-400 uppercase">Dev Life & Humor</span>
              <div className="text-sm font-semibold text-white mt-1">When You Fix a Bug by Deleting 400 Lines of Code</div>
              <div className="text-xs text-slate-400 mt-1">Jordan Lee • 2.4k Likes • #programming</div>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Notice how the Reels tab balances serious engineering with high-engagement micro-learning. Developers can absorb transformer attention mechanisms or CSS subgrid in under a minute."
    },
    {
      id: 6,
      tag: "Live Demo & Prototype (15 Pts)",
      title: "Interactive Prototype Walkthrough",
      subtitle: "Switch Personas with 1 Click to Validate User Journeys",
      rubricScore: "Prototype & Demo — 15 Pts",
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-full">
          {[
            {
              name: "Alex Rivera",
              role: "Senior Full-Stack Engineer",
              color: "text-blue-400 border-blue-500/40",
              journey: "Posts architecture breakdowns to 'Core Team'; seeks frontend collaborators via Instant Connect."
            },
            {
              name: "Dr. Elena Rostova",
              role: "AI Research Scientist",
              color: "text-rose-400 border-rose-500/40",
              journey: "Publishes neural net benchmarks to 'AI Researchers'; consumes paper breakdown Reels."
            },
            {
              name: "Jordan Lee",
              role: "Open-Source Contributor",
              color: "text-emerald-400 border-emerald-500/40",
              journey: "Manages open-source Rust project; recruits hackathon teammates."
            },
            {
              name: "Maya Chen",
              role: "Lead Mobile Developer",
              color: "text-amber-400 border-amber-500/40",
              journey: "Posts Swift tips on Reels; discovers Flutter developer communities."
            }
          ].map((persona, idx) => (
            <div key={idx} className={`bg-slate-800/80 border ${persona.color} rounded-xl p-5 flex flex-col justify-between`}>
              <div>
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white mb-2">
                  {persona.name[0]}
                </div>
                <h4 className="text-base font-bold text-white">{persona.name}</h4>
                <div className={`text-xs font-semibold mt-0.5 ${persona.color.split(' ')[0]}`}>{persona.role}</div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">{persona.journey}</p>
              </div>
              <div className="pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
                1-Click Persona Switcher in App Header
              </div>
            </div>
          ))}
        </div>
      ),
      speakerNotes: "To make demoing effortless for judges, we embedded a top persona switcher. You can test Elena sharing AI research or Alex testing the instant connect matchmaker in real time."
    },
    {
      id: 7,
      tag: "Impact & Feasibility (10 Pts)",
      title: "Market Viability & Growth Strategy",
      subtitle: "Why Google+ Reimagined Captures High-Value Knowledge Workers",
      rubricScore: "Impact & Feasibility — 10 Pts",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-indigo-400 font-bold text-sm uppercase">Developer Social Void</div>
              <h4 className="text-lg font-bold text-white mt-1">LinkedIn & X Fatigue</h4>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                LinkedIn is filled with generic corporate bragging; X is dominated by political arguments. Developers have no dedicated social hub with code execution, repository portfolios, and technical circles.
              </p>
            </div>
            <div className="text-xs text-indigo-400 font-semibold mt-4">Massive unmet market opportunity</div>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-emerald-400 font-bold text-sm uppercase">Growth Engine</div>
              <h4 className="text-lg font-bold text-white mt-1">Hackathon & Open Source Flywheel</h4>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Adoption is seeded at the source: university hackathons, open-source maintainer circles, and tech meetups using Instant Connect to build project teams.
              </p>
            </div>
            <div className="text-xs text-emerald-400 font-semibold mt-4">Organic B2D (Business to Developer) viral loop</div>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-amber-400 font-bold text-sm uppercase">Technical Feasibility</div>
              <h4 className="text-lg font-bold text-white mt-1">Low-Cost Edge Scalability</h4>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Stateless backend microservices, modern CDN media hosting, and PostgreSQL Row-Level Security allow linear cost scaling with zero infrastructure sprawl.
              </p>
            </div>
            <div className="text-xs text-amber-400 font-semibold mt-4">Economically sustainable unit economics</div>
          </div>
        </div>
      ),
      speakerNotes: "Our go-to-market strategy avoids broad consumer marketing. We tap directly into hackathons, open-source repositories, and developer creator programs where retention is highest."
    },
    {
      id: 8,
      tag: "Presentation & Q&A Defense (10 Pts)",
      title: "Anticipated Judge Q&A & Moats",
      subtitle: "Preempting Core Architectural & Strategy Inquiries",
      rubricScore: "Presentation & Q&A — 10 Pts",
      content: (
        <div className="space-y-3 h-full flex flex-col justify-between">
          <div className="bg-slate-800/80 border-l-4 border-blue-500 rounded-r-xl p-4">
            <div className="text-xs font-bold text-blue-400 uppercase">Q1: How does this compete with GitHub Discussions or Discord?</div>
            <div className="text-sm text-slate-200 mt-1 font-medium">
              Discord is unindexed and ephemeral; GitHub Discussions is repository-isolated. Google+ connects the entire developer persona across projects with fluid audience circles and discovery reels.
            </div>
          </div>

          <div className="bg-slate-800/80 border-l-4 border-emerald-500 rounded-r-xl p-4">
            <div className="text-xs font-bold text-emerald-400 uppercase">Q2: How do you guarantee privacy for confidential company code?</div>
            <div className="text-sm text-slate-200 mt-1 font-medium">
              PostgreSQL Row Level Security (RLS) is applied cryptographically at the database level. Unauthorized users receive zero row results regardless of frontend state or direct API calls.
            </div>
          </div>

          <div className="bg-slate-800/80 border-l-4 border-rose-500 rounded-r-xl p-4">
            <div className="text-xs font-bold text-rose-400 uppercase">Q3: How does Instant Connect avoid cold-start spam?</div>
            <div className="text-sm text-slate-200 mt-1 font-medium">
              Instant Connect is 100% opt-in, session-bound to active hackathons/events, and protected by real-time automated link toxicity validation.
            </div>
          </div>
        </div>
      ),
      speakerNotes: "We prepared specific defenses against common pitfalls: Discord isolation, database-level privacy security via RLS, and opt-in anti-spam algorithms."
    },
    {
      id: 9,
      tag: "Submission Wrap-Up (5 Pts)",
      title: "Submission Verification & Conclusion",
      subtitle: "Time-Box Execution & Full Deliverable Checklist",
      rubricScore: "Time-box Execution (5 Pts) — 100/100 Total Coverage",
      content: (
        <div className="bg-slate-800/60 border border-emerald-500/40 rounded-2xl p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-4">
              <CheckCircle2 className="w-6 h-6" /> Complete Submission Requirements Met
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong>Prototype:</strong> Running live, zero crashes, React 19.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong>Source Code:</strong> Clean 2-folder structure (frontend & backend).</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong>1-Page Summary:</strong> 1_PAGE_SUMMARY.md & /summary page.</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong>Reels Module:</strong> 9:16 vertical video & category filters.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong>Presentation Deck (PPT):</strong> .pptx file & in-app viewer.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong>GitHub Repo:</strong> Pushed to origin/main.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-700">
            <div className="text-xs text-slate-400 font-medium">
              Repo: <a href="https://github.com/ALLENKISAIRAKESH/Google-.git" target="_blank" rel="noreferrer" className="text-blue-400 underline">https://github.com/ALLENKISAIRAKESH/Google-.git</a>
            </div>
            <a 
              href="/Google+_Redesign_Pitch_Deck.pptx" 
              download 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md"
            >
              <Download className="w-4 h-4" /> Download PowerPoint (.pptx)
            </a>
          </div>
        </div>
      ),
      speakerNotes: "In summary, we delivered on every single item requested in the notebook: Prototype, clean source code, 1-page summary, Reels feature, and the PowerPoint deck. Thank you!"
    }
  ];

  const currentSlide = slides[currentSlideIndex];

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : 'max-w-6xl mx-auto pb-12'}`}>
      
      {/* Top Deck Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Google+ Hackathon Pitch Deck (PPT)
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-semibold">
                Slide {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {currentSlide.rubricScore || 'Hackathon Presentation'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct PPTX File Download Button */}
          <a
            href="/Google+_Redesign_Pitch_Deck.pptx"
            download="Google+_Redesign_Pitch_Deck.pptx"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" /> Download .pptx
          </a>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              showNotes 
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {showNotes ? 'Hide Notes' : 'Speaker Notes'}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 16:9 Presentation Stage */}
      <div className="relative aspect-video w-full bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
        
        {/* Slide Header */}
        <div className="border-b border-slate-800/80 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              {currentSlide.tag}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              0{currentSlide.id} / 0{slides.length}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
            {currentSlide.title}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Slide Dynamic Content */}
        <div className="flex-1 min-h-0 py-2">
          {currentSlide.content}
        </div>

        {/* Slide Footer Navigation */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlideIndex 
                    ? 'w-8 bg-red-500' 
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-white transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Speaker Notes Drawer (Optional) */}
      {showNotes && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-5 text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" /> Speaker Pitch Script (Slide {currentSlideIndex + 1})
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            "{currentSlide.speakerNotes}"
          </p>
        </div>
      )}

      {/* Quick Links for Judges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link 
          to="/summary" 
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-red-500 transition-colors"
        >
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Document</div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">1-Page Summary & Rubric</div>
          </div>
          <FileText className="w-5 h-5 text-red-500" />
        </Link>

        <Link 
          to="/reels" 
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-red-500 transition-colors"
        >
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Feature</div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">Reels Entertainment Feed</div>
          </div>
          <Video className="w-5 h-5 text-red-500" />
        </Link>

        <a 
          href="https://github.com/ALLENKISAIRAKESH/Google-.git" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-blue-500 transition-colors"
        >
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Repository</div>
            <div className="font-bold text-sm text-slate-900 dark:text-white">GitHub Source Code</div>
          </div>
          <ExternalLink className="w-5 h-5 text-blue-500" />
        </a>
      </div>

    </div>
  );
};
