import useCountdown from '@renderer/utils/countDown';
import styles from './index.module.less';
import { useEffect } from 'react';

const StartAnimation = () => {
  const countdown = useCountdown({
    seconds: 4,
    onComplete: () => {
      console.log('倒计时结束！');
      window.api.recordingAnimationClose();
    }
  });

  useEffect(() => {
    const circle = document.getElementById('countdown-circle');
    if (circle) {
      const progress = ((countdown - 1) / 3) * 100;
      circle.style.background = `conic-gradient(#4285f4 ${progress}%, transparent ${progress}% 100%)`;
    }
  }, [countdown]);

  return (
    <>
      <div className={styles['start-animation-container']}>
        <div className="w-48 h-48 relative">
          <div
            id="countdown-circle"
            className="w-full h-full rounded-full border-4 absolute top-0 left-0"
            style={{
              background: 'conic-gradient(#4285f4 100%, transparent 100% 100%)'
            }}
          ></div>
          <div className="w-44 h-44 flex justify-center items-center rounded-full absolute top-2 left-2 border-4">
            {countdown - 1 > 0 ? (
              <span className="text-8xl font-bold animate-bounce">
                {countdown - 1}
              </span>
            ) : (
              <span className="text-6xl font-bold animate-bounce">Start</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StartAnimation;
