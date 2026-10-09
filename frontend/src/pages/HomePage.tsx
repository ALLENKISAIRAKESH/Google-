import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  CircleDot, 
  FolderGit2, 
  Calendar, 
  Flame, 
  ArrowRight,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { PostCard } from '../components/PostCard';
import { PostComposer } from '../components/PostComposer';

export const HomePage: React.FC<{ selectedCircle?: string }> = ({ selectedCircle }) => {
  const { currentUser } = useAuth();
  const { posts, communities, events, projects } = useData();

  const [activeTab, setActiveTab] = useState<'all' | 'circles' | 'communities' | 'projects'>('all');

  // Filter posts according to active tab and selected circle
  const filteredPosts = posts.filter(post => {
    if (selectedCircle) {
      return post.circleId === selectedCircle;
    }

    if (activeTab === 'circles') {
      return post.audienceType === 'circles';
    }
    if (activeTab === 'communities') {
      return post.audienceType === 'community' || post.communityId;
    }
    if (activeTab === 'projects') {
      return post.type === 'project_showcase';
    }

    // Default 'all': Show public, community posts, and user's own/circle posts
    return true;
  });

  const flagshipEvent = events[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Center Feed Column */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Post Composer */}
        <PostComposer />

        {/* Feed Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'all' && !selectedCircle
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Latest Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('circles')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'circles' || selectedCircle
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            <CircleDot className="h-3.5 w-3.5" />
            <span>Circles Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('communities')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'communities'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Communities</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Projects Showcase</span>
          </button>
        </div>

        {/* Selected Circle Active Banner */}
        {selectedCircle && (
          <div className="flex items-center justify-between rounded-2xl bg-rose-50 px-4 py-2.5 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            <span>Filtering posts for circle: <strong>{currentUser.circles?.find(c => c.id === selectedCircle)?.name}</strong></span>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
              <Sparkles className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No posts in this stream</h3>
              <p className="text-xs text-slate-400 mt-1">Be the first to share an update with your circle or community!</p>
            </div>
          )}
        </div>

      </div>

      {/* Right Rail Column */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Instant Connect Spotlight Card */}
        {flagshipEvent && (
          <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-500/5 via-rose-500/10 to-amber-500/10 p-5 dark:border-rose-900/50 dark:bg-slate-900 relative overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
              <Zap className="h-3.5 w-3.5 fill-rose-500" />
              <span>Event Instant Connect</span>
            </div>
            
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {flagshipEvent.title}
            </h3>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2">
              {flagshipEvent.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {flagshipEvent.attendeeCount} registered
              </span>
              <Link
                to={`/events/${flagshipEvent.id}/instant-connect`}
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 transition-all active:scale-95"
              >
                <span>Try Instant Connect</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Suggested Communities */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-4 w-4 text-blue-500" />
              <span>Top Communities</span>
            </h3>
            <Link to="/communities" className="text-[11px] font-semibold text-rose-500 hover:underline">
              Explore All
            </Link>
          </div>

          <div className="space-y-3">
            {communities.slice(0, 3).map(comm => (
              <Link
                key={comm.id}
                to={`/communities/${comm.slug}`}
                className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
              >
                <img
                  src={comm.avatarUrl}
                  alt={comm.name}
                  className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-rose-500 transition-colors">
                    {comm.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {comm.category} • {comm.memberCount} members
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Project Collaboration Board Teaser */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FolderGit2 className="h-4 w-4 text-emerald-500" />
              <span>Recruiting Projects</span>
            </h3>
            <Link to="/projects" className="text-[11px] font-semibold text-rose-500 hover:underline">
              Board
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 2).map(proj => (
              <Link
                key={proj.id}
                to={`/projects/${proj.id}`}
                className="block p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors"
              >
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {proj.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {proj.tagline}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {proj.rolesNeeded.slice(0, 2).map((role, idx) => (
                    <span key={idx} className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      Wanted: {role}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
