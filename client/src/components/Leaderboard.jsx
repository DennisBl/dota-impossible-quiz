/* Top runs from the server. The viewer's just-saved run is highlighted. */
export default function Leaderboard({ scores, myId }) {
  if (!scores || scores.length === 0) {
    return (
      <div className="leaderboard">
        <div className="leaderboard-title">The Ledger</div>
        <p className="leaderboard-empty">No runs recorded yet. Be the first.</p>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-title">The Ledger — Top Runs</div>
      {scores.map((s, i) => (
        <div
          key={s._id}
          className={`leaderboard-row${s._id === myId ? ' you' : ''}`}
        >
          <span className="leaderboard-rank">{i + 1}</span>
          <span className="leaderboard-name">{s.name}</span>
          <span className={`leaderboard-result${s.won ? ' won' : ''}`}>
            {s.won ? 'ASCENDANT' : `Q${s.reached}/${s.total}`}
          </span>
        </div>
      ))}
    </div>
  );
}
