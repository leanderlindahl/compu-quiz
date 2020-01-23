import React, { useEffect, useState } from 'react';
import htmlDecode from './helpers/html-decode';

import './App.css';

interface QuizData {
  response_code: number;
  results: QuizQuestion[];
}
interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string;
}

const App: React.FC = () => {
  async function fetchQuestions(): Promise<QuizData> {
    const requestUrl = `${process.env.REACT_APP_API_URL}?amount=${process.env.REACT_APP_NUMBER_OF_QUESTIONS}&category=${process.env.REACT_APP_CATEGORY}&difficulty=easy`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  }

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    fetchQuestions()
      .then(data => setQuestions(data.results))
      .catch(err => console.warn(err));
  }, []);

  const questionsList = questions.map(item => (
    <li key={item.question} className="questions_list-item">
      {htmlDecode(item.question)}
    </li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Computer Quiz.</h1>
      </header>
      <main>{questionsList.length <= 0 ? 'Loading Questions...' : questionsList}</main>
    </div>
  );
};

export default App;
