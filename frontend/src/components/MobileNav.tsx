import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Compass, FolderGit2, Calendar, Bell, Film } from 'lucide-react';
import { useData } from '../context/DataContext';

export const MobileNav: React.FC = () => {
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.readAt).length;

  return (
    <div className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 md:hidden dark:border-slate-800 dark:bg-slate-900/95">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          }`
        }
      >
        <Home className="h-5 w-5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/reels"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          }`
        }
      >
        <Film className="h-5 w-5" />
        <span>Reels</span>
      </NavLink>

      <NavLink
        to="/communities"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          }`
        }
      >
        <Users className="h-5 w-5" />
        <span>Groups</span>
      </NavLink>

      <NavLink
        to="/projects"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          }`
        }
      >
        <FolderGit2 className="h-5 w-5" />
        <span>Projects</span>
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          }`
        }
      >
        <Calendar className="h-5 w-5" />
        <span>Events</span>
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          }`
        }
      >
        <Compass className="h-5 w-5" />
        <span>Explore</span>
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
          }`
        }
      >
        <Bell className="h-5 w-5" />
        <span>Alerts</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </NavLink>
    </div>
  );
};
