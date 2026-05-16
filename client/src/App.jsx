import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchQuestions } from './api.js';
import Embers from './components/Embers.jsx';
import TitleScreen from './components/TitleScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import EndScreen from './components/EndScreen.jsx';

const TOTAL_LIVES = 3;
const TOTAL_SKIPS = 3;

export default function App() {
  const [screen, setScreen] = useState('title');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [current, setCurrent] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [lives, setLives] = useState(TOTAL_LIVES);
  const [skipsLeft, setSkipsLeft] = useState(TOTAL_SKIPS);
  const [skipsUsed, setSkipsUsed] = useState(0);
  const [flash, setFlash] = useState(null);

  const flashTimer = useRef(null);

  const loadQuestions = useCallback(() => {
    setLoading(true);
    setLoadError(null);
    fetchQuestions()
      .then((qs) => {
        setQuestions(qs);
        setLoading(false);
      })
      .catch((e) => {
        setLoadError(e.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  function doFlash(type) {
    setFlash(type);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 250);
  }

  function startGame() {
    setCurrent(0);
    setAttempt(0);
    setLives(TOTAL_LIVES);
    setSkipsLeft(TOTAL_SKIPS);
    setSkipsUsed(0);
    setScreen('game');
  }

  const advance = useCallback(() => {
    setCurrent((c) => c + 1);
    setAttempt(0);
  }, []);

  // reaching past the last question is a victory
  useEffect(() => {
    if (screen === 'game' && questions.length > 0 && current >= questions.length) {
      setScreen('victory');
    }
  }, [screen, current, questions.length]);

  // running out of lives is a defeat
  useEffect(() => {
    if (screen === 'game' && lives <= 0) {
      const t = setTimeout(() => setScreen('defeat'), 800);
      return () => clearTimeout(t);
    }
  }, [screen, lives]);

  const handleCorrect = useCallback(() => {
    doFlash('correct');
    const t = setTimeout(advance, 700);
    return () => clearTimeout(t);
  }, [advance]);

  const handleWrong = useCallback(() => {
    doFlash('wrong');
    setLives((l) => l - 1);
    setTimeout(() => setAttempt((a) => a + 1), 800);
  }, []);

  const handleSkip = useCallback(() => {
    setSkipsLeft((s) => {
      if (s <= 0) return s;
      setSkipsUsed((u) => u + 1);
      doFlash('correct');
      setTimeout(advance, 400);
      return s - 1;
    });
  }, [advance]);

  const playing =
    screen === 'game' && !loading && !loadError && questions[current];

  return (
    <div id="app">
      <Embers count={25} />

      {screen === 'title' && (
        <TitleScreen
          onStart={startGame}
          loading={loading}
          error={loadError}
          onRetry={loadQuestions}
        />
      )}

      {playing && (
        <GameScreen
          question={questions[current]}
          attempt={attempt}
          index={current}
          total={questions.length}
          lives={lives}
          skipsLeft={skipsLeft}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onSkip={handleSkip}
        />
      )}

      {screen === 'victory' && (
        <EndScreen
          won
          reached={questions.length}
          total={questions.length}
          livesLeft={lives}
          skipsUsed={skipsUsed}
          onPlayAgain={() => setScreen('title')}
        />
      )}

      {screen === 'defeat' && (
        <EndScreen
          won={false}
          reached={current + 1}
          total={questions.length}
          livesLeft={0}
          skipsUsed={skipsUsed}
          onPlayAgain={() => setScreen('title')}
        />
      )}

      <div className={`feedback-flash${flash ? ` ${flash}` : ''}`} />
    </div>
  );
}
