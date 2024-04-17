import { configureStore } from '@reduxjs/toolkit';
import patternSectionReducer from '../slices/PatternSectionSlice';
import instructionSectionReducer from '../slices/InstructionSectionSlice';
import instructionRowReducer from '../slices/InstructionRowSlice'

export const store = configureStore({
  reducer: {
    patternSection: patternSectionReducer,
    instructionSection: instructionSectionReducer,
    instructionRow: instructionRowReducer,
  }
});