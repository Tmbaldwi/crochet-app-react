import { configureStore } from '@reduxjs/toolkit';
import instructionRowReducer from '../slices/InstructionRowSlice';
import patternReducer from '../slices/PatternSlice';

export const store = configureStore({
  reducer: {
    instructionRow: instructionRowReducer,
    pattern: patternReducer,
  }
});