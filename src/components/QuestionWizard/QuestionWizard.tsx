'use client';
import type { Question } from '@/types/types';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  delayedSelectAnswer,
  setData,
  start,
} from '@/redux/features/questionSlice';
import Bullets from '../Bullets/Bullets';
import Timer from '../Timer/Timer';
import Button from '../Answer/Button';
import Styles from '@/components/QuestionWizard/QuestionWizard.module.scss';

interface Props {
  questions: Question[];
}

function calculateCorrectAnswers(answers: string[]) {
  let count = 0;
  answers.forEach((answer) => {
    if (answer === 'correct') {
      count += 1;
    }
  });
  return (count / answers.length) * 100;
}

const QuestionWizard: React.FC<Props> = ({ questions }) => {
  const dispatch = useAppDispatch();
  React.useLayoutEffect(() => {
    dispatch(setData(questions));
  }, [questions, dispatch]);

  const state = useAppSelector((state) => state.questions);

  if (state.status === 'idle') {
    return (
      <div className={Styles.wizardBox}>
        <div className={Styles.welcome}>
          <h3>Start the question wizard!</h3>
          <Button
            clicked={() => dispatch(start())}
            text="Start"
            sx={{ textAlign: 'center' }}
          />
        </div>
      </div>
    );
  }
  if (state.status === 'done') {
    return (
      <div className={Styles.wizardBox}>
        <div className={Styles.welcome}>
          <h3>{`You have answered ${calculateCorrectAnswers(
            state.results
          )}% of the questions correctly!`}</h3>
          <Button
            clicked={() => dispatch(start())}
            text="Restart"
            sx={{ textAlign: 'center' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.wizardBox}>
      <div className={Styles.timer}>
        <Timer
          key={state.questionIndex}
          callback={() => {
            if (state.status !== 'delay') {
              dispatch(delayedSelectAnswer(NaN));
            }
          }}
        />
      </div>
      <div className={Styles.content}>
        <div className={Styles.question}>
          <div className={Styles.header}>
            <h1>Question</h1>
            <div>
              <h1>{state.questionIndex + 1}</h1>
              <h3>/ {state.data.length}</h3>
            </div>
          </div>
          <h3>{state.currentQuestion?.question_text}</h3>
        </div>
        <div className={Styles.answers}>
          {state.currentQuestion?.answers.map((answer, index) => {
            return (
              <Button
                key={answer.text + index}
                disabled={state.status === 'delay'}
                text={answer.text}
                clicked={() => dispatch(delayedSelectAnswer(index))}
                className={
                  state.status !== 'delay'
                    ? 'transparent'
                    : answer.is_correct
                    ? 'correct'
                    : 'wrong'
                }
              />
            );
          })}
        </div>
      </div>

      <div className={Styles.bullets}>
        {
          <Bullets
            bullets={state.results}
            activeBullet={state.status !== 'delay' ? state.questionIndex : NaN}
          />
        }
      </div>
    </div>
  );
};

export default QuestionWizard;
