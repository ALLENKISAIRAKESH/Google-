import React, { useState } from 'react';
import { Settings, Shield, Bell, Lock, User, Save, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [headline, setHeadline] = useState(currentUser.headline || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [websiteUrl, setWebsiteUrl] = useState(currentUser.websiteUrl || '');
  const [githubUrl, setGithubUrl] = useState(currentUser.developerProfile?.githubUrl || '');
  const [leetcodeUrl, setLeetcodeUrl] = useState(currentUser.developerProfile?.leetcodeUrl || '');
  const [saved, setSaved] = useState(false);

  const [defaultAudience, setDefaultAudience] = useState<'public' | 'circles' | 'private'>('public');
  const [allowInstantConnectDiscovery, setAllowInstantConnectDiscovery] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      headline,
      bio,
      location,
      websiteUrl,
      developerProfile: {
        ...(currentUser.developerProfile || {
          userId: currentUser.id,
          primarySkills: currentUser.skills,
          learningGoals: [],
          availability: 'open_to_collab'
        }),
        githubUrl,
        leetcodeUrl
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="h-6 w-6 text-rose-500" />
          <span>Settings & Privacy</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal details, Google+ Circles default audiences, and Instant Connect discoverability.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500" />
            <span>Profile Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Staff Fullstack Architect & Open Source Contributor"
              className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {/* External Links */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GitHub Profile URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">LeetCode Profile URL</label>
              <input
                type="url"
                value={leetcodeUrl}
                onChange={(e) => setLeetcodeUrl(e.target.value)}
                placeholder="https://leetcode.com/u/username"
                className="w-full h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Privacy & Audience Defaults Card (Mandatory PRD Section 8 & 16) */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-rose-500" />
            <span>Audience & Privacy Guardrails</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Default Post Audience</span>
                <p className="text-slate-500 text-[11px] mt-0.5">Choose who sees your updates when creating new posts.</p>
              </div>
              <select
                value={defaultAudience}
                onChange={(e) => setDefaultAudience(e.target.value as any)}
                className="h-8 rounded-xl border border-slate-200 px-3 text-xs dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="public">🌐 Public</option>
                <option value="circles">⭕ Selected Circles</option>
                <option value="private">🔒 Private Draft</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Event Instant Connect Discovery</span>
                <p className="text-slate-500 text-[11px] mt-0.5">Strict PRD rule: You are only discoverable if explicitly opted in per event.</p>
              </div>
              <input
                type="checkbox"
                checked={allowInstantConnectDiscovery}
                onChange={(e) => setAllowInstantConnectDiscovery(e.target.checked)}
                className="rounded text-rose-500 focus:ring-rose-500 h-4 w-4"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <Check className="h-4 w-4" /> Settings updated successfully
            </span>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-2.5 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 active:scale-95 transition-all"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>

    </div>
  );
};
