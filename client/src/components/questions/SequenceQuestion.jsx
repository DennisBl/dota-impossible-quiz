import { useState } from 'react';
import { submitAnswer } from '../../api.js';
import QuestionCard from '../QuestionCard.jsx';

/* Q10 — click the three orbs in the correct order (Sun Strike = Exort x3).
   The picked orb sequence is validated server-side. */
const ORBS = [
  ['Q', 'Q · Quas'],
  ['W', 'W · Wex'],
  ['E', 'E · Exort'],
  ['Q', 'Q · Quas'],
  ['W', 'W · Wex'],
  ['E', 'E · Exort'],
  ['Q', 'Q · Quas'],
  ['W', 'W · Wex'],
  ['E', 'E · Exort'],
];

export default function SequenceQuestion({ question, total, onCorrect, onWrong }) {
  const [picked, setPicked] = useState([]);
  const [locked, setLocked] = useState(false);

  async function pick(idx) {
    if (locked || picked.includes(idx) || picked.length >= 3) return;
    const next = [...picked, idx];
    setPicked(next);

    if (next.length === 3) {
      setLocked(true);
      const sequence = next.map((i) => ORBS[i][0]);
      let correct = false;
      try {
        const res = await submitAnswer(question.number, { sequence });
        correct = res.correct;
      } catch {
        correct = false;
      }
      (correct ? onCorrect : onWrong)();
    }
  }

  const display =
    picked.length > 0 ? picked.map((i) => ORBS[i][0]).join('  ') : '_  _  _';

  return (
    <>
      <QuestionCard
        number={question.number}
        total={total}
        prompt={question.prompt}
        hint={question.hint}
      />
      <div className="special-question">
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div className="sequence-display">{display}</div>
          <div className="sequence-list">
            {ORBS.map(([, label], i) => (
              <button
                key={i}
                className={`sequence-item${picked.includes(i) ? ' picked' : ''}`}
                onClick={() => pick(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
