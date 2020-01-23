import React, { useState } from 'react';
import QuizQuestion from '../interfaces/QuizQuestion';
import QuestionCard from './QuestionCard';
import Timer from './Timer';

interface GameInstanceProps {
  questions: QuizQuestion[];
}

const GameInstance: React.FC<GameInstanceProps> = ({ questions }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const handleNextClick = (): void => {
    questionIndex < questions.length && setQuestionIndex(questionIndex + 1);
  };
  const nextButton = questionIndex < questions.length - 1 && (
    <button type="button" onClick={handleNextClick}>
      Next
    </button>
  );

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
            <Timer />
          </>
        )}
      </div>
      {nextButton}
    </>
  );
};

export default GameInstance;
