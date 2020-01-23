import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(9);
  let countdown: NodeJS.Timeout;

  const stopTimer: Function = (): void => {
    clearInterval(countdown);
    console.log('Timer stopped...');
  };

  useEffect(() => {
    if (seconds > 0) {
      countdown = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      stopTimer();
    }
  });

  return (
    <div>
      <p>Time remaining: {seconds < 10 ? `0${seconds}` : seconds} sec</p>
    </div>
  );
};

export default Timer;
