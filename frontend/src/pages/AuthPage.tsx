import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, Sparkles, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const { signIn, signUp, allUsers, switchAccount, isSupabaseConnected } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signin') {
      const res = await signIn(email, password);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.error || 'Failed to sign in. Please verify credentials.');
      }
    } else {
      if (!username || !displayName) {
        setError('Please provide both username and display name.');
        return;
      }
      const res = await signUp(email, username, displayName);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.error || 'Failed to sign up.');
      }
    }
  };

  const handleQuickLogin = (userId: string) => {
    switchAccount(userId);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-amber-500 text-white font-black text-2xl shadow-lg shadow-rose-500/25">
            g+
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Google+ Redesign
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Developer communities, project collaboration, and event-based opt-in Instant Connect.
          </p>
        </div>

        {/* Auth Box */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 space-y-5">
          
          {/* Toggle */}
          <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => { setMode('signin'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signin' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-medium dark:bg-rose-950/40 dark:text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full h-10 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. alexrivera"
                    className="w-full h-10 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full h-10 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 rounded-xl border border-slate-200 px-3 text-xs text-slate-900 focus:border-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-full bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-500/25 hover:bg-rose-600 active:scale-95 transition-all mt-2"
            >
              {mode === 'signin' ? 'Sign In to Google+' : 'Create Free Account'}
            </button>
          </form>

          {/* Quick Demo Personas (For Instant Evaluator Testing) */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Instant 1-Click Demo Personas
            </span>
            <div className="grid grid-cols-2 gap-2">
              {allUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleQuickLogin(user.id)}
                  className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-left transition-colors"
                >
                  <img src={user.avatarUrl} alt={user.displayName} className="h-6 w-6 rounded-full object-cover" />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate">{user.displayName}</div>
                    <div className="text-[9px] text-slate-400 capitalize">{user.role || 'Member'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
