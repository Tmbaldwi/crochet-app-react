import { configureStore } from '@reduxjs/toolkit';
import patternSectionReducer from '../slices/PatternSectionSlice';
import instructionSectionReducer from '../slices/InstructionSectionSlice';

export const store = configureStore({
  reducer: {
    patternSection: patternSectionReducer,
    instructionSection: instructionSectionReducer,
  }
});