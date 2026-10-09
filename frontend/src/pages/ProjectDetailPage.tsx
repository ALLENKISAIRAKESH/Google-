import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FolderGit2, 
  ArrowLeft, 
  ExternalLink, 
  Users, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Send, 
  Check, 
  X,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { projects, applyToProject, reviewProjectApplication, toggleTaskStatus } = useData();

  const project = projects.find(p => p.id === id) || projects[0];

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [roleApplied, setRoleApplied] = useState(project.rolesNeeded[0] || 'Contributor');
  const [applyMessage, setApplyMessage] = useState('');
  const [portfolioNote, setPortfolioNote] = useState('');

  const isOwner = project.ownerId === currentUser.id;
  const isMember = project.members.some(m => m.userId === currentUser.id);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyMessage.trim()) return;

    applyToProject(project.id, roleApplied, applyMessage.trim(), portfolioNote.trim());
    setShowApplyModal(false);
    setApplyMessage('');
    alert('Collaboration application submitted to project lead!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Back Link */}
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Project Board
      </Link>

      {/* Project Overview Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                {project.commitment.replace('_', ' ')}
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 capitalize">
                {project.status}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Led by {project.owner.displayName} (@{project.owner.username})
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Repository</span>
              </a>
            )}

            {!isMember && (
              <button
                onClick={() => setShowApplyModal(true)}
                className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 active:scale-95 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Apply to Join Team</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
          {project.tagline}
        </p>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* Roles Needed */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Open Roles
          </span>
          <div className="flex flex-wrap gap-2">
            {project.rolesNeeded.map((role, idx) => (
              <span
                key={idx}
                className="rounded-xl border border-rose-200 bg-rose-50/70 px-3 py-1 text-xs font-bold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Grid: Team Members & Milestone Tasks Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Team Members */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>Team Members ({project.members.length})</span>
          </h3>

          <div className="space-y-3">
            {project.members.map(member => (
              <div key={member.userId} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatarUrl}
                    alt={member.displayName}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{member.displayName}</h4>
                    <p className="text-[10px] text-slate-400">@{member.username}</p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-300 uppercase">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Tasks Checklist */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Milestone Task Checklist</span>
            </h3>
            <span className="text-[10px] text-slate-400">Click to toggle status</span>
          </div>

          <div className="space-y-2.5">
            {project.tasks.map(task => (
              <button
                key={task.id}
                onClick={() => toggleTaskStatus(project.id, task.id)}
                className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-slate-200 text-left transition-colors dark:border-slate-800 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                    task.status === 'done' 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : task.status === 'in_progress'
                      ? 'border-amber-500 text-amber-500'
                      : 'border-slate-300 text-transparent'
                  }`}>
                    {task.status === 'done' && <Check className="h-2.5 w-2.5" />}
                  </div>
                  <span className={`text-xs font-medium ${
                    task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {task.title}
                  </span>
                </div>

                <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  task.status === 'done' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' 
                    : task.status === 'in_progress'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {task.status.replace('_', ' ')}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Owner Application Review Drawer (Mandatory PRD requirement: Only owner can review) */}
      {isOwner && project.applications && project.applications.length > 0 && (
        <div className="rounded-3xl border border-amber-200/90 bg-amber-50/20 p-6 dark:border-amber-900/50 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            <span>Incoming Collaboration Applications (Project Owner Review)</span>
          </h3>

          <div className="space-y-3">
            {project.applications.map(app => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={app.applicant.avatarUrl} alt={app.applicant.displayName} className="h-7 w-7 rounded-full object-cover" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{app.applicant.displayName}</span>
                    <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                      Role: {app.roleApplied}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{app.message}"
                  </p>
                  {app.portfolioNote && (
                    <p className="text-[11px] text-slate-400">{app.portfolioNote}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {app.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => reviewProjectApplication(project.id, app.id, 'accepted')}
                        className="flex items-center gap-1 rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
                      >
                        <Check className="h-3 w-3" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => reviewProjectApplication(project.id, app.id, 'declined')}
                        className="flex items-center gap-1 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                      >
                        <X className="h-3 w-3" />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold uppercase capitalize text-slate-500">
                      Status: {app.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apply to Join Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-rose-500" />
                <span>Apply to Join {project.title}</span>
              </h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Role You Are Applying For</label>
                <select
                  value={roleApplied}
                  onChange={(e) => setRoleApplied(e.target.value)}
                  className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  {project.rolesNeeded.map((r, idx) => (
                    <option key={idx} value={r}>{r}</option>
                  ))}
                  <option value="General Contributor">General Contributor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message to Lead</label>
                <textarea
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  placeholder="Explain why you're interested, your time commitment, and what you will build..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Portfolio / Relevant Links Note</label>
                <input
                  type="text"
                  value={portfolioNote}
                  onChange={(e) => setPortfolioNote(e.target.value)}
                  placeholder="e.g., github.com/user or leetcode.com/u/user"
                  className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!applyMessage.trim()}
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 disabled:opacity-40 shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
