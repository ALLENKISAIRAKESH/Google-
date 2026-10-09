/**
 * Moderation and Trust Service
 * Manages user reports, audit logging, and automated safety screening.
 */

export interface ReportPayload {
  reporterId: string;
  targetType: 'user' | 'post' | 'comment' | 'community' | 'project' | 'event' | 'instant_connect';
  targetId: string;
  reason: string;
  details?: string;
}

// In-memory reports store for backend fallback / local dev
const reportsStore: Array<ReportPayload & { id: string; status: string; createdAt: string }> = [];

export function submitReport(payload: ReportPayload) {
  const newReport = {
    ...payload,
    id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: 'submitted',
    createdAt: new Date().toISOString()
  };

  reportsStore.push(newReport);
  return newReport;
}

export function getModerationQueue() {
  return reportsStore;
}

export function updateReportStatus(reportId: string, status: 'submitted' | 'under_review' | 'actioned' | 'dismissed') {
  const rep = reportsStore.find(r => r.id === reportId);
  if (rep) {
    rep.status = status;
    return rep;
  }
  return null;
}
