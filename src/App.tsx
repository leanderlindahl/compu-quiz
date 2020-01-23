import React, { useEffect, useState } from 'react';
import QuizQuestion from './interfaces/QuizQuestion';
import GameInstance from './components/GameInstance';

import './App.css';

interface QuizData {
  response_code: number;
  results: QuizQuestion[];
}

const App: React.FC = () => {
  async function fetchQuestions(): Promise<QuizData> {
    const requestUrl = `${process.env.REACT_APP_API_URL}?amount=${process.env.REACT_APP_NUMBER_OF_QUESTIONS}&category=${process.env.REACT_APP_CATEGORY}&difficulty=easy`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  }

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [gameStatus, setGameStatus] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestions()
      .then(data => setQuestions(data.results))
      .catch(err => console.warn(err));
  }, [gameStatus]);

  const handleStartGame = (): void => {
    setGameStatus(!gameStatus);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Computer Quiz.</h1>
      </header>
      <main>
        {!gameStatus ? (
          <button type="button" onClick={handleStartGame}>
            Start Quiz
          </button>
        ) : (
          <GameInstance questions={questions} />
        )}
      </main>
    </div>
  );
};

export default App;
