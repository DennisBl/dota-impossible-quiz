import { useMemo } from 'react';

/* Floating ember particles for atmosphere. */
export default function Embers({ count = 25 }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
        drift: Math.random() * 200 - 100,
      })),
    [count],
  );

  return embers.map((e, i) => (
    <div
      key={i}
      className="ember-particle"
      style={{
        left: `${e.left}vw`,
        animationDuration: `${e.duration}s`,
        animationDelay: `${e.delay}s`,
        '--drift': `${e.drift}px`,
      }}
    />
  ));
}
