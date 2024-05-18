import useCountdown from '@renderer/utils/countDown';
import styles from './index.module.less';
import { useEffect } from 'react';

const StartAnimation = () => {
  const countdown = useCountdown({
    seconds: 3,
    onComplete: () => {
      console.log('倒计时结束！');
    }
  });

  useEffect(() => {
    const circle = document.getElementById('countdown-circle');
    if (circle) {
      const progress = (countdown / 3) * 100;
      circle.style.background = `conic-gradient(#4285f4 ${progress}%, transparent ${progress}% 100%)`;
    }
  }, [countdown]);

  return (
    <>
      <div className={styles['start-animation-container']}>
        <div className="w-32 h-32 relative">
          <div
            id="countdown-circle"
            className="w-full h-full rounded-full border-2 absolute top-0 left-0"
            style={{
              background: 'conic-gradient(#4285f4 100%, transparent 100% 100%)'
            }}
          ></div>
          <div className="w-28 h-28 flex justify-center items-center rounded-full absolute top-2 left-2 border-2">
            <span className="text-6xl font-bold animate-bounce">
              {countdown}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartAnimation;
