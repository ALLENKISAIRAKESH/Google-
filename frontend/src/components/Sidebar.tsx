import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Compass, 
  Code2, 
  FolderGit2, 
  Calendar, 
  Bookmark, 
  Bell, 
  MessageSquare, 
  ShieldCheck, 
  Settings, 
  CircleDot,
  Film
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const Sidebar: React.FC<{ selectedCircle?: string; onSelectCircle?: (circleId?: string) => void }> = ({
  selectedCircle,
  onSelectCircle
}) => {
  const { currentUser } = useAuth();
  const { notifications, reports } = useData();

  const unreadNotifs = notifications.filter(n => !n.readAt).length;
  const pendingReports = reports.filter(r => r.status === 'submitted').length;

  const navItems = [
    { to: '/', label: 'Home Feed', icon: Home, end: true },
    { to: '/reels', label: 'Reels', icon: Film, badge: 'New' },
    { to: '/communities', label: 'Communities', icon: Users },
    { to: '/explore', label: 'Explore & Search', icon: Compass },
    { to: '/developers', label: 'Developer Hub', icon: Code2 },
    { to: '/projects', label: 'Projects Board', icon: FolderGit2 },
    { to: '/events', label: 'Events & Connect', icon: Calendar, badge: 'Opt-in' },
    { to: '/collections', label: 'Collections', icon: Bookmark },
    { to: '/notifications', label: 'Notifications', icon: Bell, count: unreadNotifs },
    { to: '/messages', label: 'Direct Messages', icon: MessageSquare },
    { to: '/moderation', label: 'Safety & Reports', icon: ShieldCheck, count: pendingReports },
    { to: '/settings/profile', label: 'Settings & Privacy', icon: Settings }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-20 space-y-6 pr-4">
        
        {/* Main Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-rose-600' : 'bg-rose-500 text-white'
                    }`}>
                      {item.count}
                    </span>
                  )}

                  {item.badge && !item.count && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isActive ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Google+ Circles Widget */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-3.5 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/70 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <CircleDot className="w-3.5 h-3.5 text-rose-500" />
              <span>Your Circles</span>
            </div>
            {selectedCircle && onSelectCircle && (
              <button
                onClick={() => onSelectCircle(undefined)}
                className="text-[10px] font-semibold text-rose-500 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="space-y-1">
            {currentUser.circles && currentUser.circles.length > 0 ? (
              currentUser.circles.map(circle => {
                const isSelected = selectedCircle === circle.id;
                return (
                  <button
                    key={circle.id}
                    onClick={() => onSelectCircle && onSelectCircle(isSelected ? undefined : circle.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-colors ${
                      isSelected 
                        ? 'bg-rose-50 text-rose-600 font-bold dark:bg-rose-950/40 dark:text-rose-400' 
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: circle.color }} />
                      <span className="truncate">{circle.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {circle.memberCount}
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="text-[11px] text-slate-400">No circles configured yet.</p>
            )}
          </div>
        </div>

        {/* Footer info & Disclaimer */}
        <div className="px-2 text-[11px] leading-relaxed text-slate-400 dark:text-slate-500 space-y-1">
          <p>© 2026 Google+ Redesign Concept</p>
          <p>Independent community project. Not affiliated with Google Inc.</p>
        </div>

      </div>
    </aside>
  );
};
