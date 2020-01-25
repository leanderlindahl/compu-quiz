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
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      try {
        fetchQuestions()
          .then(data => {
            console.log('1', data.results[0].question);
            console.log('2', data.results[1].question);
            console.log('3', data.results[2].question);
            return data;
          })
          .then(data => setQuestions(data.results))
          .catch(err => console.warn(err));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    console.log('use effect ran');
  }, []);

  const handleStartGame = (): void => {
    setGameInProgress(!gameInProgress);
  };

  const handleResetGame = (): void => {
    console.log('Reset Game was clicked');
    setQuestions([]);
    setGameInProgress(false);
    if (!loading) {
      setLoading(true);
      try {
        fetchQuestions()
          .then(data => {
            console.log('1', data.results[0].question);
            console.log('2', data.results[1].question);
            console.log('3', data.results[2].question);
            return data;
          })
          .then(data => setQuestions(data.results))
          .catch(err => console.warn(err));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    setGameInProgress(true);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar__app-logo">App Logo</div>
        <ul className="navbar__menu">
          <li className="navbar__menu-item">Menu Item 1</li>
          <li className="navbar__menu-item">Menu Item 2</li>
          <li className="navbar__menu-item">
            <button type="button" onClick={handleResetGame}>
              Reset Game
            </button>
          </li>
        </ul>
      </nav>
      <header className="App-header">
        <h1>Computer Quiz.</h1>
      </header>
      <main>
        {!gameInProgress ? (
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
