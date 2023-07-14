export type Row = {
  [key: string]: number | string;
};

export interface Answer {
  text: string;
  is_correct: boolean;
}

export type Answers = Answer[];

export interface Question {
  question_text: string;
  answers: Answers;
}
export type AnswerStatus = 'idle' | 'correct' | 'false';

export type WizardStatus = 'idle' | 'in-progress' | 'delay' | 'done';
