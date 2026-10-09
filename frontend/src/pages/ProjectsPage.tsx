import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, Plus, Users, ExternalLink, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ProjectsPage: React.FC = () => {
  const { projects } = useData();
  const [filterCommitment, setFilterCommitment] = useState('all');

  const filteredProjects = projects.filter(p => {
    if (filterCommitment !== 'all' && p.commitment !== filterCommitment) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-rose-500" />
            <span>Project Collaboration Board</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Find hackathon teammates, join open source repositories, and coordinate development milestones.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Post a Project</span>
        </Link>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'hackathon', label: '⚡ Hackathon Sprints' },
          { id: 'part_time', label: '⏳ Part-Time Collab' },
          { id: 'full_time', label: '💼 Full-Time' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterCommitment(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filterCommitment === tab.id
                ? 'bg-rose-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    <Link to={`/projects/${proj.id}`} className="hover:text-rose-500 transition-colors">
                      {proj.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Lead: {proj.owner.displayName} (@{proj.owner.username})
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 capitalize">
                  {proj.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mb-3">
                {proj.tagline}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {proj.description}
              </p>

              {/* Roles Needed */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Roles Needed
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.rolesNeeded.map((role, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-rose-50 px-2 py-0.5 text-[11px] font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                    >
                      + {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-blue-500" />
                  <span>{proj.members.length} team member{proj.members.length === 1 ? '' : 's'}</span>
                </span>
              </div>

              <Link
                to={`/projects/${proj.id}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 active:scale-95 transition-all"
              >
                <span>View Workspace</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
