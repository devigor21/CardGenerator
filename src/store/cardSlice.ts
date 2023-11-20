import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { generateInitialCardList } from '../utils/generateInitialCardList';
import { generateCard } from '../utils/generateCard';
import type { Card } from '../types/card';

export interface CardState {
  list: Card[];
}

interface FieldPayload {
  text: string;
  idx: number;
  id: string;
}

interface TimePayload {
  time: number;
  id: string;
}

interface IntervalIdPayload {
  intervalId: number | null;
  id: string;
}

const initialState: CardState = { list: generateInitialCardList() };

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    unshift: state => {
      state.list.unshift(generateCard());
    },
    push: state => {
      state.list.push(generateCard());
    },
    updateField: (state, action: PayloadAction<FieldPayload>) => {
      const { id, text, idx } = action.payload;

      state.list.find(card => {
        if (card.id === id) {
          card.fields[idx] = text;
        }
      });
    },
    setTimerIntervalId: (state, action: PayloadAction<IntervalIdPayload>) => {
      const { id, intervalId } = action.payload;

      state.list.find(card => {
        if (card.id === id) {
          card.intervalId = intervalId;
        }
      });
    },
    countdown: (state, action: PayloadAction<TimePayload>) => {
      const { id, time } = action.payload;

      state.list.find(card => {
        if (card.id === id) {
          card.lastUpdate = time;
        }
      });
    },
  },
});

export const { unshift, push, updateField, countdown, setTimerIntervalId } =
  cardSlice.actions;

export default cardSlice.reducer;
