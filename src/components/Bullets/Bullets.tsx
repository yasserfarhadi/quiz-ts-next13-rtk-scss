import { AnswerStatus } from '@/types/types';
import React from 'react';
import Bullet from './Bullet';
import Styles from '@/components/Bullets/Bullets.module.scss';

interface Props {
  bullets: AnswerStatus[];
  activeBullet: number;
}

const Bullets: React.FC<Props> = ({ bullets, activeBullet }) => {
  return (
    <div className={Styles.bullets}>
      {bullets.map((status, index) => {
        return (
          <Bullet
            status={status}
            key={status + index}
            active={index === activeBullet}
          />
        );
      })}
    </div>
  );
};

export default Bullets;
