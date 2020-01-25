import React, { useState, useEffect } from 'react';
import QuizQuestion from '../interfaces/QuizQuestion';
import QuestionCard from './QuestionCard/QuestionCard';
import Timer from './Timer';

interface GameInstanceProps {
  questions: QuizQuestion[];
}

const GameInstance: React.FC<GameInstanceProps> = ({ questions }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondsToCount, setSecondsToCount] = useState(10);

  const handleNextClick = (): void => {
    setSecondsToCount(10);
    questionIndex < questions.length && setQuestionIndex(questionIndex + 1);
  };
  const handleTimerEnds = (): void => {
    console.log('Timer ended...');
  };
  const nextButton =
    questionIndex < questions.length - 1 ? (
      <button type="button" onClick={handleNextClick}>
        Next
      </button>
    ) : (
      <button type="button">View Result</button>
    );

  useEffect(() => {
    console.log('useEffect ran');
    setQuestionIndex(0);
  }, [questions]);

  return (
    <>
      <div>
        {questions.length <= 0 ? (
          <p>Loading Questions...</p>
        ) : (
          <>
            <p>
              Question {questionIndex + 1} of {questions.length}
            </p>
            <QuestionCard question={questions[questionIndex]} />
            {questions.length > 0 && (
              <Timer whenTimerEnds={handleTimerEnds} secondsToCount={secondsToCount} reloadTimer={questionIndex} />
            )}
          </>
        )}
      </div>
      {nextButton}
    </>
  );
};

export default GameInstance;
