import React from 'react';
import Styles from '@/components/Answer/Button.module.scss';

interface Props {
  text: string;
  clicked: () => void;
  disabled?: boolean;
  sx?: { [key: string]: string | number };
  className?: string;
}

const Button: React.FC<Props> = ({
  text,
  clicked,
  disabled,
  sx,
  className,
}) => {
  const combineClassNames =
    Styles.button + ' ' + (className && Styles[className]);
  return (
    <button
      className={combineClassNames}
      onClick={clicked}
      disabled={disabled || false}
      style={{ ...sx }}
    >
      {text}
    </button>
  );
};

export default Button;
