/* Thin API client. Requests are proxied to the Express server by Vite
   in dev (see vite.config.js); set VITE_API_BASE for a deployed build. */

const BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export function fetchQuestions() {
  return request('/api/questions');
}

export function submitAnswer(number, payload) {
  return request(`/api/questions/${number}/answer`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchTopScores(limit = 10) {
  return request(`/api/scores/top?limit=${limit}`);
}

export function submitScore(score) {
  return request('/api/scores', {
    method: 'POST',
    body: JSON.stringify(score),
  });
}
