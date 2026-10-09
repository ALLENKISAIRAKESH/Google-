import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, ExternalLink, Search, UserCheck, Sparkles, MessageSquare } from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { useAuth } from '../context/AuthContext';

export const DevelopersPage: React.FC = () => {
  const { allUsers } = useAuth();
  const [skillFilter, setSkillFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredDevelopers = allUsers.filter(u => {
    if (!u.developerProfile) return false;
    if (availabilityFilter !== 'all' && u.developerProfile.availability !== availabilityFilter) return false;
    if (skillFilter.trim()) {
      const matchSkill = u.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
      const matchName = u.displayName.toLowerCase().includes(skillFilter.toLowerCase());
      if (!matchSkill && !matchName) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="h-6 w-6 text-rose-500" />
            <span>Developer Hub</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Connect with engineers, discover teammates, and inspect verified coding links (GitHub, LeetCode, Codeforces, HackerRank).
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: 'all', label: 'All Engineers' },
            { id: 'open_to_collab', label: '🤝 Open to Collab' },
            { id: 'mentoring', label: '🎓 Offering Mentorship' },
            { id: 'seeking_mentor', label: '🌱 Seeking Mentor' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAvailabilityFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                availabilityFilter === tab.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder="Search by skill or name..."
              className="w-full h-9 pl-9 pr-3 rounded-full border border-slate-200 bg-white text-xs text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Developers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDevelopers.map(dev => {
          const profile = dev.developerProfile;
          return (
            <div
              key={dev.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <Link to={`/profile/${dev.username}`} className="flex items-center gap-3 group">
                    <img
                      src={dev.avatarUrl}
                      alt={dev.displayName}
                      className="h-14 w-14 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-rose-500/40 transition-all"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                        {dev.displayName}
                      </h3>
                      <p className="text-xs text-slate-400">@{dev.username}</p>
                      {dev.location && (
                        <p className="text-[10px] text-slate-500 mt-0.5">{dev.location}</p>
                      )}
                    </div>
                  </Link>

                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 capitalize">
                    {profile?.availability.replace(/_/g, ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {dev.headline || dev.bio}
                </p>

                {/* Skills Chips */}
                <div className="mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Skills & Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.skills.map((skill, idx) => (
                      <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified External Profile Links (Complies with PRD without scraping) */}
                <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Verified External Coding Profiles
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile?.githubUrl && (
                      <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {profile?.leetcodeUrl && (
                      <a
                        href={profile.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50/60 px-2.5 py-1 text-[11px] font-semibold text-amber-700 hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
                      >
                        <span>LeetCode</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {profile?.codeforcesUrl && (
                      <a
                        href={profile.codeforcesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/60 px-2.5 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300"
                      >
                        <span>Codeforces</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {profile?.portfolioUrl && (
                      <a
                        href={profile.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <span>Portfolio</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  to={`/profile/${dev.username}`}
                  className="text-xs font-semibold text-slate-600 hover:text-rose-500 transition-colors"
                >
                  View Full Profile
                </Link>
                <Link
                  to="/messages"
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm shadow-rose-500/20 hover:bg-rose-600 active:scale-95 transition-all"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Connect / Message</span>
                </Link>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
