import { useState, useEffect } from 'react';

interface CountdownProps {
  seconds: number;
  onComplete: () => void;
}

const useCountdown = ({ seconds, onComplete }: CountdownProps) => {
  const [countdown, setCountdown] = useState<number>(() => {
    const storedCountdown = sessionStorage.getItem('countdown');
    return storedCountdown ? parseInt(storedCountdown, 10) : seconds;
  });

  useEffect(() => {
    sessionStorage.setItem('countdown', countdown.toString());

    if (countdown === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      sessionStorage.removeItem('countdown');
    };
  }, [countdown, onComplete]);

  return countdown;
};

export default useCountdown;
