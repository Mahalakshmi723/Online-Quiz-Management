import { Router } from 'express';
import { getAttemptsForUser, saveQuizAttempt, getAdminDashboardStats } from '../../database/db';

const router = Router();

// GET /api/attempts
router.get('/', (req, res) => {
  const email = req.query.email as string | undefined;
  const attempts = getAttemptsForUser(email);
  return res.json(attempts);
});

// POST /api/attempts - Submit new attempt
router.post('/', (req, res) => {
  try {
    const attemptData = req.body;

    if (!attemptData.userEmail) {
      return res.status(400).json({ error: 'User email is required for recording quiz attempt' });
    }

    const saved = saveQuizAttempt(attemptData);
    return res.status(201).json(saved);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Failed to record attempt' });
  }
});

// GET /api/attempts/stats - Admin statistics
router.get('/stats', (req, res) => {
  const stats = getAdminDashboardStats();
  return res.json(stats);
});

export default router;
