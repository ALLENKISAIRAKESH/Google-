import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Zap, 
  ShieldCheck, 
  Users, 
  UserCheck, 
  Send, 
  Check, 
  X, 
  Lock, 
  Eye, 
  ArrowLeft,
  Sparkles,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const InstantConnectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const { 
    events, 
    instantConnectAttendees, 
    toggleInstantConnectOptIn, 
    sendInstantConnectIntro, 
    respondToConnectionRequest 
  } = useData();

  const event = events.find(e => e.id === id) || events[0];

  // Local state for opt-in settings form
  const [goal, setGoal] = useState<'teammate' | 'mentor' | 'study_partner' | 'speaker_organizer' | 'general_networking'>(
    event.networkingGoal || 'teammate'
  );
  const [intro, setIntro] = useState(event.introNote || 'Looking for collaborators for the hackathon sprint!');
  const [visibleFields, setVisibleFields] = useState(
    event.visibleFields || { skills: true, interests: true, github: true, bio: true }
  );

  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string | null>(null);
  const [introMessage, setIntroMessage] = useState('');
  const [filterGoal, setFilterGoal] = useState<string>('all');

  const isOptedIn = Boolean(event.networkingOptIn);

  const handleToggleOptIn = (enable: boolean) => {
    toggleInstantConnectOptIn(event.id, enable, goal, intro, visibleFields);
  };

  const handleSendIntro = (attendeeUserId: string) => {
    if (!introMessage.trim()) return;
    sendInstantConnectIntro(attendeeUserId, introMessage.trim(), event.id);
    setIntroMessage('');
    setSelectedAttendeeId(null);
    alert('Introduction request sent safely! Once accepted, direct messaging will unlock.');
  };

  // Filter out current user from discoverable list (or highlight self)
  const discoverableAttendees = instantConnectAttendees.filter(a => {
    if (filterGoal !== 'all' && a.networkingGoal !== filterGoal) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/events" className="hover:text-rose-500 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Events
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-900 dark:text-white truncate">{event.title}</span>
        <span>/</span>
        <span className="text-rose-500 font-bold">Opt-in Instant Connect</span>
      </div>

      {/* Hero Banner */}
      <div className="rounded-3xl border border-rose-200/90 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-blue-500/10 p-6 dark:border-rose-900/50 dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Zap className="h-4 w-4 fill-rose-500" />
              <span>Event Differentiator • Opt-In Networking</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Instant Connect — {event.title}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Find teammates, mentors, and study partners without sharing private phone numbers or personal emails. 
              <strong> You control who discovers you and what is visible.</strong>
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-xs text-slate-500">
              {instantConnectAttendees.length} active attendee{instantConnectAttendees.length === 1 ? '' : 's'} opted in
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Zero-Exposure Safety Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Opt-In Control Panel (Mandatory PRD Feature) */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Your Networking Status</h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isOptedIn 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {isOptedIn ? 'DISCOVERABLE (OPTED IN)' : 'OFF (PRIVATE)'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              By default, attendance does NOT expose you to other attendees. You must explicitly toggle networking ON.
            </p>
          </div>

          <button
            onClick={() => handleToggleOptIn(!isOptedIn)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${
              isOptedIn
                ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
            }`}
          >
            <Zap className="h-4 w-4 fill-current" />
            <span>{isOptedIn ? 'Turn OFF Networking (Leave)' : 'Enable Instant Connect (Opt-In)'}</span>
          </button>
        </div>

        {/* Configuration settings (Visible when opted in or configuring) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          
          {/* Networking Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Networking Goal</label>
            <select
              value={goal}
              onChange={(e) => {
                const newGoal = e.target.value as any;
                setGoal(newGoal);
                if (isOptedIn) toggleInstantConnectOptIn(event.id, true, newGoal, intro, visibleFields);
              }}
              className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="teammate">🤝 Seeking Teammate</option>
              <option value="mentor">🎓 Offering Mentorship</option>
              <option value="study_partner">📚 Study Partner</option>
              <option value="speaker_organizer">🎤 Speaker / Organizer</option>
              <option value="general_networking">🌐 General Networking</option>
            </select>
          </div>

          {/* Quick Intro Note */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Short Introduction Message</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="e.g., Looking for a Rust engineer to build an AST parser together!"
                className="flex-1 h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              {isOptedIn && (
                <button
                  onClick={() => toggleInstantConnectOptIn(event.id, true, goal, intro, visibleFields)}
                  className="px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold dark:bg-slate-800 dark:text-slate-200"
                >
                  Save
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Visible Fields Guardrails */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-blue-500" />
            Visible to Attendees:
          </span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleFields.skills}
              onChange={(e) => setVisibleFields({ ...visibleFields, skills: e.target.checked })}
              className="rounded text-rose-500 focus:ring-rose-500"
            />
            <span>Skills ({currentUser.skills.slice(0, 3).join(', ')})</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleFields.github}
              onChange={(e) => setVisibleFields({ ...visibleFields, github: e.target.checked })}
              className="rounded text-rose-500 focus:ring-rose-500"
            />
            <span>GitHub Profile Link</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={visibleFields.bio}
              onChange={(e) => setVisibleFields({ ...visibleFields, bio: e.target.checked })}
              className="rounded text-rose-500 focus:ring-rose-500"
            />
            <span>Headline & Bio</span>
          </label>
        </div>

      </div>

      {/* Discoverable Opted-in Attendees Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-rose-500" />
              <span>Discoverable Opted-in Attendees</span>
            </h2>
            <p className="text-xs text-slate-500">
              Only participants who explicitly chose to be open for connections appear below.
            </p>
          </div>

          {/* Goal Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'teammate', 'mentor', 'study_partner'].map((g) => (
              <button
                key={g}
                onClick={() => setFilterGoal(g)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold capitalize transition-colors ${
                  filterGoal === g
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {g.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discoverableAttendees.map(attendee => {
            const isSelf = attendee.userId === currentUser.id;
            return (
              <div
                key={attendee.id}
                className={`rounded-3xl border p-5 transition-all ${
                  isSelf 
                    ? 'border-rose-300 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20' 
                    : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-sm dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={attendee.avatarUrl}
                      alt={attendee.displayName}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {attendee.displayName}
                        </span>
                        {isSelf && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500 text-white">YOU</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">@{attendee.username}</span>
                      <div className="mt-1">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300 capitalize">
                          Goal: {attendee.networkingGoal.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {attendee.intro && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 italic mb-3">
                    "{attendee.intro}"
                  </p>
                )}

                {attendee.skills && attendee.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {attendee.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Connection Status & Action */}
                <div className="border-t border-slate-100 pt-3 dark:border-slate-800/80 flex items-center justify-between">
                  {attendee.githubUrl ? (
                    <a
                      href={attendee.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
                      title="Verified GitHub"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  ) : <span />}

                  {!isSelf && (
                    attendee.connectionStatus === 'connected' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <Check className="h-3.5 w-3.5" /> Connected
                      </span>
                    ) : attendee.connectionStatus === 'pending_sent' ? (
                      <span className="text-xs font-medium text-slate-400">
                        Intro Request Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedAttendeeId(attendee.userId)}
                        className="flex items-center gap-1.5 rounded-full bg-rose-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-rose-500/20 hover:bg-rose-600 active:scale-95 transition-all"
                      >
                        <Send className="h-3 w-3" />
                        <span>Send Intro</span>
                      </button>
                    )
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Intro Request Modal */}
      {selectedAttendeeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="h-4 w-4 text-rose-500" />
                <span>Send Quick Introduction</span>
              </h3>
              <button onClick={() => setSelectedAttendeeId(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Introduce yourself and your goals. The recipient will see your name, skills, and intro note. 
              Once accepted, direct communication unlocks.
            </p>

            <textarea
              value={introMessage}
              onChange={(e) => setIntroMessage(e.target.value)}
              placeholder="Hi! I loved your skills in React & PyTorch. Would love to team up for this hackathon sprint..."
              rows={3}
              className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedAttendeeId(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendIntro(selectedAttendeeId)}
                disabled={!introMessage.trim()}
                className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 disabled:opacity-40 shadow-sm"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
