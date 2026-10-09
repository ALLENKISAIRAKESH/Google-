import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Compass, Search, Users, FolderGit2, Calendar, FileText, Code2, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { PostCard } from '../components/PostCard';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { allUsers } = useAuth();
  const { posts, communities, projects, events } = useData();

  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<'all' | 'people' | 'posts' | 'communities' | 'projects' | 'events'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  };

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedUsers = allUsers.filter(u => 
    !q || u.displayName.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.skills.some(s => s.toLowerCase().includes(q))
  );

  const matchedCommunities = communities.filter(c => 
    !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
  );

  const matchedProjects = projects.filter(p => 
    !q || p.title.toLowerCase().includes(q) || p.techStack.some(t => t.toLowerCase().includes(q)) || p.description.toLowerCase().includes(q)
  );

  const matchedEvents = events.filter(e => 
    !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  );

  const matchedPosts = posts.filter(p => 
    !q || p.body.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="h-6 w-6 text-rose-500" />
          <span>Explore & Search</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Search across engineering talent, open communities, collaboration projects, and upcoming hackathons.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keywords, tags, names, or tech stacks (e.g., React, AI, Rust, Hackathon)..."
          className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 shadow-sm"
        />
      </form>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Results' },
          { id: 'people', label: `People (${matchedUsers.length})` },
          { id: 'communities', label: `Communities (${matchedCommunities.length})` },
          { id: 'projects', label: `Projects (${matchedProjects.length})` },
          { id: 'events', label: `Events (${matchedEvents.length})` },
          { id: 'posts', label: `Posts (${matchedPosts.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filterType === tab.id
                ? 'bg-rose-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Content */}
      <div className="space-y-8">
        
        {/* People Section */}
        {(filterType === 'all' || filterType === 'people') && matchedUsers.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="h-4 w-4 text-blue-500" />
              <span>People & Engineers</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {matchedUsers.map(user => (
                <Link
                  key={user.id}
                  to={`/profile/${user.username}`}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center text-center group"
                >
                  <img src={user.avatarUrl} alt={user.displayName} className="h-14 w-14 rounded-full object-cover mb-2 ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-rose-500/40 transition-all" />
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">{user.displayName}</h3>
                  <p className="text-[10px] text-slate-400">@{user.username}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{user.headline || user.bio}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Communities Section */}
        {(filterType === 'all' || filterType === 'communities') && matchedCommunities.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-rose-500" />
              <span>Communities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedCommunities.map(comm => (
                <Link
                  key={comm.id}
                  to={`/communities/${comm.slug}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <img src={comm.avatarUrl} alt={comm.name} className="h-12 w-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">{comm.name}</h3>
                    <p className="text-[11px] text-slate-400 truncate">{comm.category} • {comm.memberCount} members</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{comm.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {(filterType === 'all' || filterType === 'projects') && matchedProjects.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-emerald-500" />
              <span>Projects Seeking Collaborators</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedProjects.map(proj => (
                <Link
                  key={proj.id}
                  to={`/projects/${proj.id}`}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60 transition-colors block"
                >
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{proj.tagline}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.rolesNeeded.map((r, idx) => (
                      <span key={idx} className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                        Wanted: {r}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Events Section */}
        {(filterType === 'all' || filterType === 'events') && matchedEvents.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-500" />
              <span>Events & Hackathons</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedEvents.map(evt => (
                <Link
                  key={evt.id}
                  to={`/events/${evt.id}/instant-connect`}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60 transition-colors block"
                >
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{evt.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{evt.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts Section */}
        {(filterType === 'all' || filterType === 'posts') && matchedPosts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              <span>Discussions & Posts</span>
            </h2>

            <div className="space-y-4">
              {matchedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
