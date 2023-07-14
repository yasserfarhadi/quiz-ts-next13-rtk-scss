import React from 'react';

const useProgress = (
  fullWidth: number,
  timeMS: number,
  frameRate: number = 60
) => {
  const [width, setWidth] = React.useState(fullWidth);
  const widthPerFrame = fullWidth / (timeMS / (1000 / frameRate));

  React.useLayoutEffect(() => {
    const interval = setInterval(() => {
      setWidth((prev) => {
        if (prev - widthPerFrame <= 0) {
          return 0;
        }
        return prev - widthPerFrame;
      });
    }, 1000 / frameRate);
    return () => clearInterval(interval);
  }, [frameRate, timeMS, widthPerFrame]);
  return { progressWidth: width };
};

export default useProgress;
