import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Bell, 
  MessageSquare, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown, 
  Settings, 
  User, 
  LogOut,
  FolderGit2,
  Calendar,
  Users,
  PenTool,
  Database,
  Film,
  Tv
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const Navbar: React.FC<{ onOpenCreatePost?: () => void }> = ({ onOpenCreatePost }) => {
  const { currentUser, allUsers, switchAccount, signOut, isSupabaseConnected } = useAuth();
  const { notifications } = useData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);

  const unreadCount = notifications.filter(n => !n.readAt).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-red-500 to-amber-500 text-white font-bold text-xl shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <span className="font-black tracking-tighter">g+</span>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
                Google<span className="text-rose-500 font-extrabold">+</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500">
                Redesign • Hackathon MVP
              </span>
            </div>
          </Link>

          {/* Environment Status Badge */}
          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
            <Database className="w-3 h-3 text-rose-500" />
            <span>{isSupabaseConnected ? 'Supabase Live' : 'Interactive Preview'}</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, developers, projects, events, communities..."
              className="w-full h-10 pl-10 pr-4 rounded-full border border-slate-200 bg-slate-100/70 text-sm text-slate-900 placeholder-slate-500 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-rose-500 dark:focus:bg-slate-900 transition-all"
            />
          </form>
        </div>

        {/* Right: Actions, Notifications, Profile & Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Pitch Deck PPT Quick Link */}
          <Link
            to="/presentation"
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900/50 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shadow-xs"
            title="Open Hackathon Presentation (PPT)"
          >
            <Tv className="h-3.5 w-3.5 text-red-500" />
            <span>Pitch Deck (PPT)</span>
          </Link>

          {/* Quick Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-sm shadow-rose-500/25 active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>

            {showCreateMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setShowCreateMenu(false)}
              >
                <button
                  onClick={() => {
                    if (onOpenCreatePost) onOpenCreatePost();
                    else navigate('/?create=true');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <PenTool className="h-4 w-4 text-rose-500" />
                  New Post / Discussion
                </button>
                <Link
                  to="/communities/new"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <Users className="h-4 w-4 text-blue-500" />
                  Create Community
                </Link>
                <Link
                  to="/projects/new"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <FolderGit2 className="h-4 w-4 text-emerald-500" />
                  Post Project for Collab
                </Link>
                <Link
                  to="/events/new"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <Calendar className="h-4 w-4 text-amber-500" />
                  Create Event / Hackathon
                </Link>
                <Link
                  to="/reels"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <Film className="h-4 w-4 text-purple-500" />
                  Post / Watch Tech Reels
                </Link>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <Link
            to="/notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Messages */}
          <Link
            to="/messages"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            title="Direct Messages"
          >
            <MessageSquare className="h-5 w-5" />
          </Link>

          {/* Demo User Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
              className="flex items-center gap-1.5 h-8 px-2.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/60 transition-colors"
              title="Switch demo persona for testing"
            >
              <UserCheck className="h-3.5 w-3.5 text-blue-500" />
              <span className="hidden lg:inline">Switch Role</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showAccountSwitcher && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 z-50 animate-in fade-in zoom-in-95"
                onClick={() => setShowAccountSwitcher(false)}
              >
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Active Persona
                </div>
                {allUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => switchAccount(user.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${
                      user.id === currentUser.id 
                        ? 'bg-rose-50 font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' 
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <img src={user.avatarUrl} alt={user.displayName} className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
                    <div className="flex-1 truncate">
                      <div className="truncate font-medium">{user.displayName}</div>
                      <div className="text-[10px] text-slate-400 truncate">@{user.username} • {user.role || 'Member'}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1.5 rounded-full p-0.5 hover:ring-2 hover:ring-rose-500/30 transition-all"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
              />
            </button>

            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 z-50 animate-in fade-in zoom-in-95"
                onClick={() => setShowUserMenu(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700/60 mb-1">
                  <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">{currentUser.displayName}</div>
                  <div className="text-[11px] text-slate-400 truncate">@{currentUser.username}</div>
                </div>

                <Link
                  to={`/profile/${currentUser.username}`}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  My Profile
                </Link>
                <Link
                  to="/settings/profile"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  Settings & Privacy
                </Link>
                <Link
                  to="/moderation"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                >
                  <ShieldCheck className="h-4 w-4 text-amber-500" />
                  Moderation Center
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
