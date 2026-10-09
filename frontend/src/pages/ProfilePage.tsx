import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Settings, 
  CircleDot, 
  FolderGit2, 
  Sparkles, 
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { PostCard } from '../components/PostCard';

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { currentUser, allUsers } = useAuth();
  const { posts, projects } = useData();

  const user = allUsers.find(u => u.username === username) || currentUser;
  const isMe = user.id === currentUser.id;

  const [activeTab, setActiveTab] = useState<'posts' | 'projects' | 'about'>('posts');

  const userPosts = posts.filter(p => p.authorId === user.id);
  const userProjects = projects.filter(p => p.ownerId === user.id || p.members.some(m => m.userId === user.id));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Profile Header Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-slate-900">
        
        {/* Cover Banner */}
        <div className="h-48 w-full bg-gradient-to-r from-rose-500/20 via-blue-500/20 to-amber-500/20 relative">
          {user.coverUrl && (
            <img src={user.coverUrl} alt="Cover" className="h-full w-full object-cover" />
          )}
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 mb-4">
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              className="h-28 w-28 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-lg"
            />

            <div className="flex items-center gap-2">
              {isMe ? (
                <Link
                  to="/settings/profile"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Edit Profile</span>
                </Link>
              ) : (
                <Link
                  to="/messages"
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 transition-all"
                >
                  <span>Message</span>
                </Link>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {user.displayName}
              </h1>
              {user.role === 'moderator' && (
                <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                  <ShieldCheck className="h-3 w-3" /> Moderator
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">@{user.username}</p>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-2 max-w-2xl leading-relaxed">
            {user.headline}
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {user.bio}
          </p>

          {/* Location & Website */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-rose-500" />
                <span>{user.location}</span>
              </div>
            )}
            {user.websiteUrl && (
              <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-rose-500 hover:underline">
                <Globe className="h-3.5 w-3.5" />
                <span>{user.websiteUrl.replace('https://', '')}</span>
              </a>
            )}
          </div>

          {/* Verified External Coding Links */}
          {user.developerProfile && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {user.developerProfile.githubUrl && (
                <a
                  href={user.developerProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {user.developerProfile.leetcodeUrl && (
                <a
                  href={user.developerProfile.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50/60 px-2.5 py-1 text-[11px] font-semibold text-amber-700 hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
                >
                  <span>LeetCode</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {user.developerProfile.codeforcesUrl && (
                <a
                  href={user.developerProfile.codeforcesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/60 px-2.5 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300"
                >
                  <span>Codeforces</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'posts'
              ? 'border-rose-500 text-rose-600 dark:text-rose-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Posts ({userPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'projects'
              ? 'border-rose-500 text-rose-600 dark:text-rose-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Projects ({userProjects.length})
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'about'
              ? 'border-rose-500 text-rose-600 dark:text-rose-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Skills & Circles
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'posts' && (
          userPosts.length > 0 ? (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
              <p className="text-xs text-slate-400">No posts shared yet by @{user.username}.</p>
            </div>
          )
        )}

        {activeTab === 'projects' && (
          userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects.map(proj => (
                <Link
                  key={proj.id}
                  to={`/projects/${proj.id}`}
                  className="p-5 rounded-3xl border border-slate-200/90 bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-shadow block"
                >
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{proj.tagline}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-800">
              <p className="text-xs text-slate-400">No projects associated with this profile yet.</p>
            </div>
          )
        )}

        {activeTab === 'about' && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-1.5">
                {user.interests.map((int, idx) => (
                  <span key={idx} className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                    {int}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {user.skills.map((skill, idx) => (
                  <span key={idx} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {user.circles && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Configured Google+ Circles</h3>
                <div className="flex flex-wrap gap-2">
                  {user.circles.map(c => (
                    <span key={c.id} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold dark:border-slate-700">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                      <span>{c.name} ({c.memberCount} members)</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
