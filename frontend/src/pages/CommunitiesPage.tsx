import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Shield, Globe, Lock, Search, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export const CommunitiesPage: React.FC = () => {
  const { communities, toggleJoinCommunity } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'AI/ML', 'Web Development', 'Open Source', 'Cloud & Systems'];

  const filteredCommunities = communities.filter(c => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (searchQuery.trim() && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-rose-500" />
            <span>Communities</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Interest-driven spaces for engineering discussions, paper reviews, and collaborative problem solving.
          </p>
        </div>

        <Link
          to="/communities/new"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create Community</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter communities..."
              className="w-full h-9 pl-9 pr-3 rounded-full border border-slate-200 bg-white text-xs text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCommunities.map(comm => (
          <div
            key={comm.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Banner & Avatar */}
            <div>
              <div className="h-28 w-full bg-gradient-to-r from-rose-500/20 via-blue-500/20 to-amber-500/20 relative">
                {comm.bannerUrl && (
                  <img src={comm.bannerUrl} alt={comm.name} className="h-full w-full object-cover" />
                )}
                <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white uppercase backdrop-blur-sm">
                  {comm.category}
                </span>
              </div>

              <div className="px-5 pt-0 pb-4 relative">
                <img
                  src={comm.avatarUrl}
                  alt={comm.name}
                  className="h-14 w-14 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 -mt-7 mb-3 shadow-sm"
                />

                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      <Link to={`/communities/${comm.slug}`} className="hover:text-rose-500 transition-colors">
                        {comm.name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{comm.memberCount.toLocaleString()} members</span>
                      <span>•</span>
                      <span className="capitalize">{comm.visibility} Group</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {comm.description}
                </p>

                {comm.rules && comm.rules.length > 0 && (
                  <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-500 dark:bg-slate-800/60 dark:text-slate-400 mb-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Rule 1:</span> {comm.rules[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-800">
              <Link
                to={`/communities/${comm.slug}`}
                className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
              >
                <span>View Discussions</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <button
                onClick={() => toggleJoinCommunity(comm.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  comm.isMember
                    ? 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                    : 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-500/20'
                }`}
              >
                {comm.isMember ? 'Joined' : 'Join Community'}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
