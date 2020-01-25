import React from 'react';
import htmlDecode from '../../helpers/html-decode';
import shuffleArray from '../../helpers/shuffle-array';
import QuizQuestion from '../../interfaces/QuizQuestion';

import './QuestionCard.css';

interface QuestionCardProps {
  question: QuizQuestion;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const correctAnswer = [question.correct_answer];
  const answers: string[] = [...question.incorrect_answers, question.correct_answer];
  console.log('answers', answers);
  shuffleArray(answers);
  console.log('answers', answers);

  console.log('isArray', Array.isArray(answers));

  return (
    <>
      <p className="question__question">
        {question.question.length <= 0 ? 'Loading Question...' : htmlDecode(question.question)}
      </p>
      <form>
        {answers.map(item => (
          <div className="form-control" key={item}>
            <label htmlFor="answer">
              <input type="radio" name="answer" className="form-control__input--radio"></input>
              {item}
            </label>
          </div>
        ))}
      </form>
    </>
  );
};

export default QuestionCard;
