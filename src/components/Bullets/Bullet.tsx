import { AnswerStatus } from '@/types/types';
import React from 'react';
import Styles from '@/components/Bullets/Bullet.module.scss';

interface Props {
  status: AnswerStatus;
  active: boolean;
}

const Bullet: React.FC<Props> = ({ status, active }) => {
  return (
    <div
      className={`${Styles.bullet} ${Styles[status]} ${
        active ? Styles.active : ''
      }`}
    ></div>
  );
};

export default Bullet;
