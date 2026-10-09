import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, ArrowLeft, Shield, Globe, Lock, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PostCard } from '../components/PostCard';
import { PostComposer } from '../components/PostComposer';

export const CommunityDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { communities, posts, toggleJoinCommunity } = useData();
  const [showComposer, setShowComposer] = useState(false);

  const community = communities.find(c => c.slug === slug) || communities[0];
  const communityPosts = posts.filter(p => p.communityId === community.id || p.communityName === community.name);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Back Link */}
      <Link to="/communities" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Communities
      </Link>

      {/* Community Banner & Header */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-44 w-full bg-gradient-to-r from-rose-500/30 via-purple-500/20 to-blue-500/30 relative">
          {community.bannerUrl && (
            <img src={community.bannerUrl} alt={community.name} className="h-full w-full object-cover" />
          )}
          <span className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white uppercase backdrop-blur-sm">
            {community.category}
          </span>
        </div>

        <div className="p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <img
              src={community.avatarUrl}
              alt={community.name}
              className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowComposer(!showComposer)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Post in Community</span>
              </button>

              <button
                onClick={() => toggleJoinCommunity(community.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
                  community.isMember
                    ? 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                    : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
                }`}
              >
                {community.isMember ? 'Joined' : 'Join Community'}
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {community.name}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 mb-3">
            <span>{community.memberCount.toLocaleString()} members</span>
            <span>•</span>
            <span className="capitalize">{community.visibility} group</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {community.description}
          </p>

          {/* Community Rules */}
          {community.rules && community.rules.length > 0 && (
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                <Shield className="h-3.5 w-3.5 text-rose-500" />
                <span>Community Guidelines & Moderation Rules</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {community.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

      {/* Community Composer */}
      {showComposer && (
        <PostComposer 
          defaultCommunityId={community.id}
          onClose={() => setShowComposer(false)}
        />
      )}

      {/* Community Feed */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Discussions & Posts ({communityPosts.length})
        </h3>

        {communityPosts.length > 0 ? (
          communityPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
            <Users className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">No discussions posted yet</h4>
            <p className="text-xs text-slate-400 mt-1">Be the first member to start a discussion thread!</p>
          </div>
        )}
      </div>

    </div>
  );
};
