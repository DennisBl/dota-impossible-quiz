import { useState } from 'react';
import { submitAnswer } from '../../api.js';
import QuestionCard from '../QuestionCard.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

/* Q19 — Roshan flees: the correct tile swaps places on hover.
   Catch it by clicking it. Any other tile is wrong. */
export default function RoshanQuestion({ question, total, onCorrect, onWrong }) {
  const [labels, setLabels] = useState(question.answers);
  const [roshanAt, setRoshanAt] = useState(question.config?.roshanIndex ?? 1);
  const [locked, setLocked] = useState(false);
  const [resultIdx, setResultIdx] = useState(null);
  const [result, setResult] = useState(null);

  function flee(i) {
    if (locked || i !== roshanAt) return;
    const others = [0, 1, 2, 3].filter((x) => x !== roshanAt);
    const target = others[Math.floor(Math.random() * others.length)];
    setLabels((prev) => {
      const next = [...prev];
      [next[roshanAt], next[target]] = [next[target], next[roshanAt]];
      return next;
    });
    setRoshanAt(target);
  }

  async function click(i) {
    if (locked) return;
    setLocked(true);
    setResultIdx(i);

    if (i === roshanAt) {
      setResult('correct');
      let correct = false;
      try {
        const res = await submitAnswer(question.number, { solved: true });
        correct = res.correct;
      } catch {
        correct = false;
      }
      (correct ? onCorrect : onWrong)();
    } else {
      setResult('wrong');
      onWrong();
    }
  }

  return (
    <>
      <QuestionCard
        number={question.number}
        total={total}
        prompt={question.prompt}
      />
      <div className="answers-grid">
        {labels.map((label, i) => {
          let cls = 'answer-tile';
          if (i === roshanAt) cls += ' moving-tile';
          if (resultIdx === i && result) cls += ` ${result}`;
          return (
            <button
              key={i}
              className={cls}
              onMouseEnter={() => flee(i)}
              onClick={() => click(i)}
            >
              <span className="letter">{LETTERS[i]}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
