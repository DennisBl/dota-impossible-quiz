const TOTAL_LIVES = 3;
const TOTAL_SKIPS = 3;

export default function Hud({ lives, index, total, skipsLeft, onSkip }) {
  return (
    <div className="hud">
      <div className="hud-section">
        <div>
          <div className="hud-label">Lives</div>
          <div className="lives">
            {Array.from({ length: TOTAL_LIVES }, (_, i) => (
              <span key={i} className={`heart${i >= lives ? ' lost' : ''}`}>
                ♥
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hud-section">
        <div style={{ textAlign: 'center' }}>
          <div className="hud-label">Question</div>
          <div className="hud-value">
            <span>{index + 1}</span> <span style={{ opacity: 0.5 }}>/</span>{' '}
            <span>{total}</span>
          </div>
        </div>
      </div>

      <div className="hud-section">
        <div style={{ textAlign: 'right' }}>
          <div className="hud-label">Skips</div>
          <div className="skips">
            {Array.from({ length: TOTAL_SKIPS }, (_, i) => (
              <div
                key={i}
                className={`skip-token${i >= skipsLeft ? ' used' : ''}`}
              >
                <span>S</span>
              </div>
            ))}
          </div>
        </div>
        <button className="skip-btn" onClick={onSkip} disabled={skipsLeft <= 0}>
          Skip
        </button>
      </div>
    </div>
  );
}
