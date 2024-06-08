import { configureStore } from '@reduxjs/toolkit';
import patternReducer from '../slices/PatternSlice';

export const store = configureStore({
  reducer: {
    pattern: patternReducer,
  }
});