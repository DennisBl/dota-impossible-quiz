import { useEffect, useRef, useState } from 'react';
import QuestionCard from '../QuestionCard.jsx';

/* Q6 — click the glyph N times before the timer runs out. */
export default function GlyphQuestion({ question, total, onCorrect, onWrong }) {
  const clicksRequired = question.config?.clicksRequired ?? 7;
  const timeLimit = question.config?.timeLimit ?? 5;

  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const settled = useRef(false);

  // countdown tick
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, Number((t - 0.1).toFixed(1))));
    }, 100);
    return () => clearInterval(id);
  }, []);

  // win check
  useEffect(() => {
    if (clicks >= clicksRequired && !settled.current) {
      settled.current = true;
      onCorrect();
    }
  }, [clicks, clicksRequired, onCorrect]);

  // timeout check
  useEffect(() => {
    if (timeLeft <= 0 && !settled.current) {
      settled.current = true;
      onWrong();
    }
  }, [timeLeft, onWrong]);

  function tap() {
    if (settled.current) return;
    setClicks((c) => c + 1);
  }

  return (
    <>
      <QuestionCard
        number={question.number}
        total={total}
        prompt={question.prompt}
        hint={question.hint}
      />
      <div className="special-question">
        <div style={{ textAlign: 'center' }}>
          <div className="click-target" onClick={tap}>
            {clicks}
          </div>
          <div className="countdown-timer">{timeLeft.toFixed(1)}s</div>
        </div>
      </div>
      <div className="timer-bar">
        <div
          className="timer-fill"
          style={{ transform: `scaleX(${timeLeft / timeLimit})` }}
        />
      </div>
    </>
  );
}
