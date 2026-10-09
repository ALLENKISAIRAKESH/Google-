import React from 'react';
import { ShieldCheck, AlertTriangle, Check, X, Eye, Flag, UserX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const ModerationPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { reports, updateReportStatus } = useData();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300 uppercase">
            Authorized Moderator Tools
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-amber-500" />
          <span>Safety & Moderation Dashboard</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review reported content, take actions, and audit community safety decisions in accordance with platform rules.
        </p>
      </div>

      {/* Reports Queue */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Incoming Content Reports Queue ({reports.length})</span>
          </h2>
        </div>

        <div className="space-y-3">
          {reports.map(report => (
            <div
              key={report.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    Type: {report.targetType}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    report.status === 'submitted'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : report.status === 'actioned'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}>
                    {report.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Target: "{report.targetSummary}"
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Reason:</span> {report.reason}
                  {report.details && ` — "${report.details}"`}
                </div>

                <div className="text-[10px] text-slate-400">
                  Reported by {report.reporterName} on {new Date(report.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {report.status !== 'actioned' && (
                  <button
                    onClick={() => updateReportStatus(report.id, 'actioned')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors shadow-sm"
                  >
                    <Check className="h-3 w-3" />
                    <span>Action Report</span>
                  </button>
                )}

                {report.status !== 'dismissed' && (
                  <button
                    onClick={() => updateReportStatus(report.id, 'dismissed')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
                  >
                    <X className="h-3 w-3" />
                    <span>Dismiss</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
