export default function TitleScreen({ onStart, loading, error, onRetry }) {
  return (
    <div id="title-screen" className="screen">
      <div className="title-mark">
        The Impossible
        <span className="quiz-word">Dota Quiz</span>
      </div>
      <div className="title-flourish" />
      <p className="title-tagline">
        A trial of wits, lore, and lateral thinking.
        <br />
        Three lives. Three skips. Twenty riddles. The Ancients are watching.
      </p>

      {loading && <div className="loading-state">Summoning the trial…</div>}

      {error && (
        <div className="error-state">
          <p>Could not reach the Ancients: {error}</p>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: '0.5rem 0' }}>
            Make sure the server is running and the database is seeded.
          </p>
          <button className="btn" onClick={onRetry} style={{ marginTop: '0.5rem' }}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <button className="btn btn-large" onClick={onStart}>
          Begin the Trial
        </button>
      )}

      <div className="title-hint">
        ⚠ Read carefully. The obvious answer is rarely correct.
      </div>
    </div>
  );
}
