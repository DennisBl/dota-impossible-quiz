import Rich from './Rich.jsx';

/* The ornamental card holding the question prompt + optional hint. */
export default function QuestionCard({ number, total = 20, prompt, hint }) {
  return (
    <div className="question-card">
      <div className="question-number">
        — {number} of {total} —
      </div>
      <div className="question-text">
        <Rich html={prompt} />
        {hint ? <span className="question-hint">{hint}</span> : null}
      </div>
    </div>
  );
}
