import { useState } from 'react';
import { submitAnswer } from '../../api.js';
import QuestionCard from '../QuestionCard.jsx';
import Rich from '../Rich.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

/* Multiple-choice question. Answer correctness is validated server-side. */
export default function StandardQuestion({ question, total, onCorrect, onWrong }) {
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null);

  async function choose(i) {
    if (locked) return;
    setLocked(true);
    setPicked(i);

    let correct = false;
    try {
      const res = await submitAnswer(question.number, { answerIndex: i });
      correct = res.correct;
    } catch {
      correct = false;
    }

    setResult(correct ? 'correct' : 'wrong');
    (correct ? onCorrect : onWrong)();
  }

  return (
    <>
      <QuestionCard
        number={question.number}
        total={total}
        prompt={question.prompt}
        hint={question.hint}
      />
      <div className="answers-grid">
        {question.answers.map((answer, i) => {
          let cls = 'answer-tile';
          if (picked === i && result) cls += ` ${result}`;
          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              <span className="letter">{LETTERS[i]}</span>
              <Rich html={answer} />
            </button>
          );
        })}
      </div>
    </>
  );
}
