import { Router } from 'express';
import { Score } from '../models/Score.js';

const router = Router();

/* GET /api/scores/top?limit=10  — leaderboard, best runs first. */
router.get('/top', async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const scores = await Score.find()
      .sort({ won: -1, reached: -1, livesLeft: -1, skipsUsed: 1, createdAt: 1 })
      .limit(limit)
      .lean();
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

/* POST /api/scores  — record a finished run. */
router.post('/', async (req, res, next) => {
  try {
    const { name, reached, total, livesLeft, skipsUsed, won } = req.body;
    if (!name || typeof reached !== 'number' || typeof total !== 'number') {
      return res.status(400).json({ error: 'Invalid score payload' });
    }
    const score = await Score.create({
      name: String(name).slice(0, 24),
      reached,
      total,
      livesLeft: Number(livesLeft) || 0,
      skipsUsed: Number(skipsUsed) || 0,
      won: !!won,
    });
    res.status(201).json(score);
  } catch (err) {
    next(err);
  }
});

export default router;
