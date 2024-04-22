import { configureStore } from '@reduxjs/toolkit';
import patternSectionReducer from '../slices/PatternSectionSlice';
import instructionSectionReducer from '../slices/InstructionSectionSlice';
import instructionRowReducer from '../slices/InstructionRowSlice';
import patternReducer from '../slices/PatternSlice';

export const store = configureStore({
  reducer: {
    patternSection: patternSectionReducer,
    instructionSection: instructionSectionReducer,
    instructionRow: instructionRowReducer,
    pattern: patternReducer,
  }
});