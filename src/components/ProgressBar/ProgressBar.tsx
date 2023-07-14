import React from 'react';
import Styles from '@/components/ProgressBar/ProgressBar.module.scss';

interface Props {
  fullWidth: number;
  width: number;
}

const ProgressBar: React.FC<Props> = ({ width, fullWidth }) => {
  const range = (() => {
    const percent = (width / fullWidth) * 100;
    switch (true) {
      case percent < 20:
        return Styles.twenty;
      case percent < 40:
        return Styles.forty;
      case percent < 60:
        return Styles.sixty;
      case percent < 80:
        return Styles.eighty;
      case percent < 100:
        return Styles.hundred;
    }
  })();
  return (
    <div style={{ width }} className={`${Styles.progressBar} ${range}`}></div>
  );
};

export default ProgressBar;
