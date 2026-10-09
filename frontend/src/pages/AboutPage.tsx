import React from 'react';
import { ShieldCheck, Zap, Users, Code2, FolderGit2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
          <span>Google Antigravity Hackathon MVP</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          About Google+ Redesign
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          An independent, modern reimagining of Google+ built around user-controlled social sharing, interest-based communities, developer collaboration, and event-based opt-in Instant Connect.
        </p>
      </div>

      {/* Differentiators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="h-10 w-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-2 dark:bg-rose-950/40">
            <Zap className="h-5 w-5 fill-rose-500" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Opt-In Event Instant Connect</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Strict PRD rule: Default is OFF. Event attendance does not expose personal details. Attendees explicitly opt in per event, choose their networking goals, and connect safely with rate limits.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-2 dark:bg-blue-950/40">
            <Code2 className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Developer Profiles & Coding Links</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Validated links to GitHub, LeetCode, Codeforces, and HackerRank. Complies with PRD: Zero unauthorized scraping; links are user-submitted and strictly verified.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2 dark:bg-emerald-950/40">
            <FolderGit2 className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Project Collaboration Board</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Post and discover collaborative projects. Apply for needed engineering roles with custom messages and track milestones on task checklists.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-2">
          <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-2 dark:bg-amber-950/40">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Google+ Circles & RLS Privacy</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Audience targeting (Public, Circles, Community, Private). Privacy is enforced on the database level via Supabase Row Level Security (RLS) policies.
          </p>
        </div>

      </div>

      {/* Tech Stack Breakdown */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Locked Technology Stack</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 font-semibold">
            ⚛️ React 19 + Vite
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 font-semibold">
            🎨 Tailwind CSS v4
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 font-semibold">
            🛡️ Supabase PostgreSQL + RLS
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 font-semibold">
            🚀 Express API Microservice
          </div>
        </div>
      </div>

      {/* Legal & Non-Affiliation Disclaimer (Required by PRD) */}
      <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
        <strong>Independent Concept Disclaimer:</strong> This project is an independent conceptual redesign and hackathon demonstration. It is not an official Google product, does not claim official affiliation or endorsement, and does not copy proprietary assets.
      </div>

    </div>
  );
};
