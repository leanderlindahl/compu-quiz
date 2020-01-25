import React, { useState, useEffect } from 'react';

interface TimerProps {
  whenTimerEnds: any;
  secondsToCount: number;
  reloadTimer: number;
}

const Timer: React.FC<TimerProps> = ({ whenTimerEnds, secondsToCount, reloadTimer }) => {
  const [seconds, setSeconds] = useState(secondsToCount);

  useEffect(() => {
    console.log('Timer cleanup/umount');
    setSeconds(secondsToCount);
  }, [reloadTimer]);

  useEffect(() => {
    if (seconds > 0) {
      const countdown = setTimeout(() => setSeconds(seconds - 1), 1000);
      return (): void => clearInterval(countdown);
    } else {
      console.log('Timer stopped...');
      whenTimerEnds();
    }
  }, [seconds]);

  return (
    <div>
      <p>Time remaining: {seconds < 10 ? `0${seconds}` : seconds} sec</p>
    </div>
  );
};

export default Timer;
