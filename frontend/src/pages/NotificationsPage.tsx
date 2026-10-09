import React from 'react';
import { Bell, CheckCheck, Sparkles, MessageSquare, Heart, FolderGit2, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();

  const getIcon = (type: string) => {
    switch (type) {
      case 'reaction':
        return <Heart className="h-4 w-4 text-rose-500" />;
      case 'reply':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'project_application':
        return <FolderGit2 className="h-4 w-4 text-emerald-500" />;
      case 'instant_connect_request':
        return <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="h-6 w-6 text-rose-500" />
            <span>Notifications</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Stay updated with replies, project collaboration applications, and Instant Connect networking requests.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map(notif => {
            const isUnread = !notif.readAt;
            return (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`flex items-start gap-3.5 p-4 rounded-3xl border transition-all cursor-pointer ${
                  isUnread
                    ? 'border-rose-200 bg-rose-50/30 hover:bg-rose-50/50 dark:border-rose-950/60 dark:bg-rose-950/20'
                    : 'border-slate-200/90 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60'
                }`}
              >
                <img
                  src={notif.actor.avatarUrl}
                  alt={notif.actor.displayName}
                  className="h-10 w-10 rounded-full object-cover shrink-0 ring-2 ring-slate-100 dark:ring-slate-800"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {getIcon(notif.type)}
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {notif.title}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {notif.body}
                  </p>
                </div>

                {isUnread && (
                  <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 self-center" />
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
            <Bell className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No new notifications</h3>
            <p className="text-xs text-slate-400 mt-1">You're completely caught up!</p>
          </div>
        )}
      </div>

    </div>
  );
};
