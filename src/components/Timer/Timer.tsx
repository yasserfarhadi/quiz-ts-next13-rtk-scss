import useProgress from '@/hooks/useProgress';
import React, { PropsWithChildren } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import Styles from '@/components/Timer/Timer.module.scss';

interface ProgressWrapperProps {
  width: number;
  children: (width: number) => React.ReactNode;
  callback: () => void;
}

const ProgressWrapper: React.FC<ProgressWrapperProps> = ({
  children,
  width,
  callback,
}) => {
  const { progressWidth } = useProgress(width, 10000);

  React.useEffect(() => {
    if (progressWidth === 0) {
      callback();
    }
  }, [progressWidth, callback]);
  return <>{children(progressWidth)}</>;
};

const Timer = ({ callback }: { callback: () => void }) => {
  const [width, setWidth] = React.useState(0);

  function mountHandler(el: HTMLDivElement) {
    if (el) {
      setWidth(el.offsetWidth);
    }
  }

  return (
    <div ref={mountHandler} className={Styles.timer}>
      {width && (
        <ProgressWrapper width={width} callback={callback}>
          {(progressWidth: number) => (
            <ProgressBar width={progressWidth} fullWidth={width} />
          )}
        </ProgressWrapper>
      )}
    </div>
  );
};

export default React.memo(Timer);
