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

// 2. Safe Profile Link Validation (No Scraping)
app.post('/api/validate-link', (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'A valid URL string is required.' });
  }

  const result = validateExternalLink(url);
  res.json(result);
});

// 3. Instant Connect Rate Limiting & Safety Verification
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
