import { useState } from 'react';
import { fetchTopScores, submitScore } from '../api.js';
import Leaderboard from './Leaderboard.jsx';

const DEFEAT_REASONS = [
  '"Your tower has fallen. Mortal."',
  '"GG. Better luck next time."',
  '"The Ancient is unimpressed."',
  '"You should have used a skip."',
  '"Reported."',
];

function Stat({ label, value }) {
  return (
    <div>
      <div className="end-stat-label">{label}</div>
      <div className="end-stat-value">{value}</div>
    </div>
  );
}

/* Victory / defeat screen — records the run and shows the leaderboard. */
export default function EndScreen({
  won,
  reached,
  total,
  livesLeft,
  skipsUsed,
  onPlayAgain,
}) {
  const [name, setName] = useState('');
  const [phase, setPhase] = useState('entry'); // entry | saving | done
  const [scores, setScores] = useState(null);
  const [myId, setMyId] = useState(null);
  const [error, setError] = useState(null);
  const [reason] = useState(
    () => DEFEAT_REASONS[Math.floor(Math.random() * DEFEAT_REASONS.length)],
  );

  async function save() {
    const trimmed = name.trim();
    if (!trimmed || phase === 'saving') return;
    setPhase('saving');
    setError(null);
    try {
      const saved = await submitScore({
        name: trimmed,
        reached,
        total,
        livesLeft,
        skipsUsed,
        won,
      });
      setMyId(saved._id);
      setScores(await fetchTopScores(10));
      setPhase('done');
    } catch (e) {
      setError(e.message);
      setPhase('entry');
    }
  }

  async function viewBoard() {
    if (phase === 'saving') return;
    setPhase('saving');
    try {
      setScores(await fetchTopScores(10));
    } catch {
      setScores([]);
    }
    setPhase('done');
  }

  return (
    <div className="screen">
      <div className="end-card">
        <h1 className={`end-title ${won ? 'victory' : 'defeat'}`}>
          {won ? 'Ascendant' : 'Defeated'}
        </h1>
        <p className="end-subtitle">
          {won ? '"The Ancient acknowledges your wit."' : reason}
        </p>

        <div className="end-stats">
          {won ? (
            <>
              <Stat label="Lives Left" value={livesLeft} />
              <Stat label="Skips Used" value={skipsUsed} />
            </>
          ) : (
            <>
              <Stat label="Reached" value={reached} />
              <Stat label="of" value={total} />
            </>
          )}
        </div>

        {phase !== 'done' && (
          <>
            <div className="score-entry">
              <input
                className="score-input"
                placeholder="Your name for the ledger"
                value={name}
                maxLength={24}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && save()}
                disabled={phase === 'saving'}
              />
              <button
                className="btn"
                onClick={save}
                disabled={phase === 'saving' || !name.trim()}
              >
                Save
              </button>
            </div>
            {error && <p className="error-state">{error}</p>}
            <button
              className="btn"
              onClick={viewBoard}
              disabled={phase === 'saving'}
            >
              View Leaderboard
            </button>
          </>
        )}

        {phase === 'done' && <Leaderboard scores={scores} myId={myId} />}

        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn" onClick={onPlayAgain}>
            {won ? 'Play Again' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
}
