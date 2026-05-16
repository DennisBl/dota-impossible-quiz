import Hud from './Hud.jsx';
import StandardQuestion from './questions/StandardQuestion.jsx';
import GlyphQuestion from './questions/GlyphQuestion.jsx';
import SequenceQuestion from './questions/SequenceQuestion.jsx';
import PeriodQuestion from './questions/PeriodQuestion.jsx';
import RoshanQuestion from './questions/RoshanQuestion.jsx';

const REGISTRY = {
  standard: StandardQuestion,
  glyph: GlyphQuestion,
  sequence: SequenceQuestion,
  period: PeriodQuestion,
  roshan: RoshanQuestion,
};

export default function GameScreen({
  question,
  attempt,
  index,
  total,
  lives,
  skipsLeft,
  onCorrect,
  onWrong,
  onSkip,
}) {
  const QuestionComponent = REGISTRY[question.kind] || StandardQuestion;

  return (
    <div id="game-screen" className="screen">
      <Hud
        lives={lives}
        index={index}
        total={total}
        skipsLeft={skipsLeft}
        onSkip={onSkip}
      />
      <div className="question-stage">
        {/* key includes attempt so a wrong answer remounts a fresh question */}
        <QuestionComponent
          key={`${question.number}-${attempt}`}
          question={question}
          total={total}
          onCorrect={onCorrect}
          onWrong={onWrong}
        />
      </div>
    </div>
  );
}
