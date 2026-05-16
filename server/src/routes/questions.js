import { Router } from 'express';
import { Question } from '../models/Question.js';

const router = Router();

/* GET /api/questions
   Public copy of the question bank — answer keys are stripped so the
   client cannot peek. Validation happens server-side. */
router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find().sort({ number: 1 }).lean();
    const safe = questions.map(({ correctIndex, correctSequence, ...q }) => q);
    res.json(safe);
  } catch (err) {
    next(err);
  }
});

/* POST /api/questions/:number/answer
   Validates an answer. Payload depends on question kind:
     standard            -> { answerIndex }
     sequence            -> { sequence: ['E','E','E'] }
     glyph/period/roshan -> { solved: true }   (the interaction is the puzzle) */
router.post('/:number/answer', async (req, res, next) => {
  try {
    const number = Number(req.params.number);
    const q = await Question.findOne({ number }).lean();
    if (!q) return res.status(404).json({ error: 'Question not found' });

    let correct = false;
    if (q.kind === 'standard') {
      correct = Number(req.body.answerIndex) === q.correctIndex;
    } else if (q.kind === 'sequence') {
      const seq = Array.isArray(req.body.sequence) ? req.body.sequence : [];
      correct = seq.join('') === (q.correctSequence || []).join('');
    } else {
      correct = req.body.solved === true;
    }
    res.json({ correct });
  } catch (err) {
    next(err);
  }
});

export default router;
