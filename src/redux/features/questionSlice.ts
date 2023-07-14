import { AnswerStatus, Question, WizardStatus } from '@/types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  questionIndex: number;
  data: Question[];
  currentQuestion: Question | null;
  results: AnswerStatus[];
  status: WizardStatus;
}

const initialState: InitialState = {
  questionIndex: 0,
  data: [],
  currentQuestion: null,
  results: [],
  status: 'idle',
};

export const delayedSelectAnswer = createAsyncThunk(
  'questions/delay',
  async (data: number, _thunkApi) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
    return data;
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    start: (state) => {
      state.questionIndex = 0;
      state.status = 'in-progress';
      state.currentQuestion = state.data[state.questionIndex];
      state.results = Array(state.data.length).fill('idle');
    },
    setData: (state, action: PayloadAction<Question[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(delayedSelectAnswer.pending, (state, action) => {
        state.status = 'delay';
        if (state.currentQuestion?.answers[action.meta.arg]?.is_correct) {
          state.results[state.questionIndex] = 'correct';
        } else {
          state.results[state.questionIndex] = 'false';
        }
      })
      .addCase(
        delayedSelectAnswer.fulfilled,
        (state, _action: PayloadAction<number>) => {
          state.status = 'in-progress';
          state.questionIndex += 1;
          if (state.questionIndex === state.data.length) {
            state.status = 'done';
            return;
          }
          state.currentQuestion = state.data[state.questionIndex];
        }
      );
  },
});

export default questionSlice.reducer;
export const { start, setData } = questionSlice.actions;
