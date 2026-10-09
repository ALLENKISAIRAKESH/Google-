import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Users, Zap, Clock, MapPin, Globe, Check } from 'lucide-react';
import { useData } from '../context/DataContext';

export const EventsPage: React.FC = () => {
  const { events, toggleEventRSVP } = useData();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="h-6 w-6 text-rose-500" />
            <span>Events & Hackathons</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover developer hackathons, tech webinars, and join opt-in Instant Connect to network with attendees.
          </p>
        </div>

        <Link
          to="/events/new"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-rose-500/25 hover:bg-rose-600 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Host an Event</span>
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div
            key={event.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              {/* Banner */}
              <div className="h-36 w-full bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-blue-500/20 relative">
                {event.bannerUrl && (
                  <img src={event.bannerUrl} alt={event.title} className="h-full w-full object-cover" />
                )}
                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white uppercase backdrop-blur-sm">
                  {event.category}
                </span>

                <span className="absolute top-3 right-3 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase shadow-sm">
                  {event.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-2">
                  <Link to={`/events/${event.id}/instant-connect`} className="hover:text-rose-500 transition-colors">
                    {event.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-rose-500" />
                    <span>
                      {new Date(event.startAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} ({event.timezone})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-blue-500" />
                    <span>{event.location || 'Online Virtual'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{event.attendeeCount.toLocaleString()} attendees registered</span>
                  </div>
                </div>

                {/* Instant Connect Feature Callout */}
                <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-3.5 dark:border-rose-950/60 dark:bg-rose-950/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 fill-rose-500" />
                      <span>Instant Connect Enabled</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {event.networkingOptIn ? 'Opted-In' : 'Off by Default'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Find teammates and mentors safely with opt-in networking. Zero private contact details exposed.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button
                onClick={() => toggleEventRSVP(event.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  event.isRegistered
                    ? 'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                    : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                }`}
              >
                {event.isRegistered ? 'Registered (RSVP)' : 'Register for Event'}
              </button>

              <Link
                to={`/events/${event.id}/instant-connect`}
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-rose-500/20 hover:bg-rose-600 active:scale-95 transition-all"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>Instant Connect</span>
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
