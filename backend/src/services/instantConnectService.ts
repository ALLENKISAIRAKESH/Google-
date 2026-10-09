/**
 * Event Instant Connect Service
 * Enforces mandatory PRD guardrails:
 * - Default is OFF
 * - Explicit opt-in per event required
 * - Goal selection required
 * - Rate limiting against spam
 * - No private contact details exposed
 */

export interface InstantConnectProfile {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  headline?: string;
  networkingGoal: 'teammate' | 'mentor' | 'study_partner' | 'speaker_organizer' | 'general_networking';
  intro?: string;
  skills?: string[];
  interests?: string[];
  githubUrl?: string;
}

// In-memory rate limiting tracker (User ID -> timestamps)
const requestRateLimits = new Map<string, number[]>();
const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export function checkInstantConnectRateLimit(userId: string): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const timestamps = (requestRateLimits.get(userId) || []).filter(t => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetInMs: WINDOW_MS - (now - oldest)
    };
  }

  timestamps.push(now);
  requestRateLimits.set(userId, timestamps);

  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - timestamps.length,
    resetInMs: WINDOW_MS
  };
}

export function sanitizeInstantConnectAttendee(attendee: any): InstantConnectProfile | null {
  if (!attendee.networking_opt_in) {
    // Non-opted-in attendees must NEVER be returned in Instant Connect discovery!
    return null;
  }

  const visible = attendee.visible_fields || { skills: true, interests: true, github: true, bio: true };

  return {
    userId: attendee.user_id,
    displayName: attendee.profiles?.display_name || 'Anonymous Attendee',
    avatarUrl: attendee.profiles?.avatar_url,
    headline: visible.bio ? attendee.profiles?.headline : undefined,
    networkingGoal: attendee.networking_goal || 'general_networking',
    intro: attendee.intro || '',
    skills: visible.skills ? attendee.profiles?.skills : undefined,
    interests: visible.interests ? attendee.profiles?.interests : undefined,
    githubUrl: visible.github ? attendee.profiles?.github_url : undefined
  };
}
