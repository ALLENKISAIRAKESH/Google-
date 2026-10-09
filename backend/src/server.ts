import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { validateExternalLink } from './services/linkValidator.js';
import { checkInstantConnectRateLimit, sanitizeInstantConnectAttendee } from './services/instantConnectService.js';
import { submitReport, getModerationQueue, updateReportStatus } from './services/moderationService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 1. Health & Readiness Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Google+ Redesign Backend Core',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 2. Safe Profile Link Validation & Preview (No Scraping)
app.post(['/api/validate-link', '/api/link-preview'], (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'A valid URL string is required.' });
  }

  const result = validateExternalLink(url);
  const preview = {
    ...result,
    title: result.isValid ? `${result.platform.toUpperCase()} Profile / Resource` : 'Invalid Link',
    domain: result.cleanUrl ? new URL(result.cleanUrl).hostname : 'unknown',
    isSafe: result.isValid
  };
  res.json(preview);
});

// 3. Instant Connect Matchmaking Candidates API
app.post('/api/instant-connect/candidates', (req: Request, res: Response) => {
  const { currentUserId, eventId, goal, skills = [] } = req.body;
  
  // Sample candidate pool for matching algorithm
  const pool = [
    {
      userId: 'usr_2',
      displayName: 'Dr. Elena Rostova',
      role: 'Principal AI Researcher',
      skills: ['Python', 'PyTorch', 'Transformers', 'CUDA'],
      goal: 'mentor',
      bio: 'Looking to mentor promising AI hackathon teams.'
    },
    {
      userId: 'usr_3',
      displayName: 'Jordan Lee',
      role: 'Open-Source Contributor',
      skills: ['Rust', 'WebAssembly', 'Distributed Systems'],
      goal: 'teammate',
      bio: 'Seeking frontend developers for low-latency database project.'
    },
    {
      userId: 'usr_4',
      displayName: 'Maya Chen',
      role: 'Lead Mobile Engineer',
      skills: ['TypeScript', 'React Native', 'Swift', 'UI/UX'],
      goal: 'teammate',
      bio: 'Building cross-platform mobile app for social good.'
    }
  ];

  // Scoring algorithm: overlap of complementary skills + goal alignment
  const scoredCandidates = pool
    .filter(c => c.userId !== currentUserId)
    .map(c => {
      let score = 50; // base score
      if (goal && c.goal === goal) score += 25;
      const sharedOrComplementary = c.skills.filter(s => 
        skills.some((userSkill: string) => userSkill.toLowerCase() === s.toLowerCase())
      );
      score += Math.min(25, sharedOrComplementary.length * 10);

      return {
        ...c,
        matchScore: Math.min(99, score),
        commonKeywords: sharedOrComplementary
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    eventId: eventId || 'evt_hackathon',
    candidates: scoredCandidates
  });
});

// 4. Instant Connect Rate Limiting & Safety Verification
app.post('/api/instant-connect/check-rate-limit', (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  const status = checkInstantConnectRateLimit(userId);
  if (!status.allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded for Instant Connect intro requests.',
      resetInMs: status.resetInMs
    });
  }

  res.json({
    allowed: true,
    remainingRequests: status.remaining
  });
});

// 5. Automated Content Toxicity & Link Spam Inspection
app.post('/api/moderation/inspect', (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Text content string is required for inspection.' });
  }

  const toxicWords = ['spam', 'phishing', 'scam', 'malware', 'hack_now', 'free_crypto'];
  const lower = content.toLowerCase();
  const flaggedWords = toxicWords.filter(w => lower.includes(w));

  const isSuspicious = flaggedWords.length > 0;
  res.json({
    safe: !isSuspicious,
    flaggedWords,
    toxicityScore: isSuspicious ? 0.85 : 0.02,
    recommendation: isSuspicious ? 'FLAG_FOR_REVIEW' : 'APPROVE'
  });
});

// 4. Sanitize Attendee for Instant Connect Discovery
app.post('/api/instant-connect/sanitize-attendee', (req: Request, res: Response) => {
  const { attendee } = req.body;
  if (!attendee) {
    return res.status(400).json({ error: 'Attendee object required.' });
  }

  const sanitized = sanitizeInstantConnectAttendee(attendee);
  if (!sanitized) {
    return res.status(403).json({
      error: 'Attendee has not opted into Instant Connect networking.'
    });
  }

  res.json({ profile: sanitized });
});

// 5. Moderation Reports API
app.post('/api/moderation/reports', (req: Request, res: Response) => {
  const { reporterId, targetType, targetId, reason, details } = req.body;
  if (!reporterId || !targetType || !targetId || !reason) {
    return res.status(400).json({ error: 'Missing required report fields.' });
  }

  const report = submitReport({ reporterId, targetType, targetId, reason, details });
  res.status(201).json({ message: 'Report submitted successfully.', report });
});

app.get('/api/moderation/queue', (_req: Request, res: Response) => {
  const queue = getModerationQueue();
  res.json({ queue });
});

app.patch('/api/moderation/reports/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { status } = req.body;
  const updated = updateReportStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Report not found.' });
  }
  res.json({ report: updated });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`[Google+ Redesign Backend] Service listening on port ${PORT}`);
});

export default app;
