import React from 'react';
import htmlDecode from '../helpers/html-decode';
import QuizQuestion from '../interfaces/QuizQuestion';

interface QuestionCardProps {
  question: QuizQuestion;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <>
      <p>{question.question.length <= 0 ? 'Loading Question...' : htmlDecode(question.question)}</p>
    </>
  );
};

export default QuestionCard;
