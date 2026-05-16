import { useState } from 'react';
import { submitAnswer } from '../../api.js';
import QuestionCard from '../QuestionCard.jsx';
import Rich from '../Rich.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

/* Q13 — the trick: the answer is the literal period at the end of one
   option. Clicking the tile body is wrong; clicking the period is right. */
export default function PeriodQuestion({ question, total, onCorrect, onWrong }) {
  const [locked, setLocked] = useState(false);
  const [wrongIdx, setWrongIdx] = useState(null);

  async function hitPeriod(e) {
    e.stopPropagation();
    if (locked) return;
    setLocked(true);
    let correct = false;
    try {
      const res = await submitAnswer(question.number, { solved: true });
      correct = res.correct;
    } catch {
      correct = false;
    }
    (correct ? onCorrect : onWrong)();
  }

  function hitTile(i) {
    if (locked) return;
    setLocked(true);
    setWrongIdx(i);
    onWrong();
  }

  return (
    <>
      <QuestionCard
        number={question.number}
        total={total}
        prompt={question.prompt}
      />
      <div className="answers-grid">
        {question.answers.map((answer, i) => {
          const isHotspot = answer.endsWith('.');
          const cls = `answer-tile${wrongIdx === i ? ' wrong' : ''}`;
          return (
            <button key={i} className={cls} onClick={() => hitTile(i)}>
              <span className="letter">{LETTERS[i]}</span>
              {isHotspot ? (
                <span>
                  {answer.slice(0, -1)}
                  <span className="the-period" onClick={hitPeriod}>
                    .
                  </span>
                </span>
              ) : (
                <Rich html={answer} />
              )}
            </button>
          );
        })}
      </div>
      <div
        style={{
          textAlign: 'center',
          fontFamily: "'VT323', monospace",
          color: 'var(--gold)',
          opacity: 0.6,
          fontSize: '0.85rem',
          marginTop: '0.5rem',
        }}
      >
        Click <em>precisely</em>.
      </div>
    </>
  );
}
