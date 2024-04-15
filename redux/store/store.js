import { configureStore } from '@reduxjs/toolkit';
import patternSectionReducer from '../slices/patternSectionSlice'

export const store = configureStore({
  reducer: {
    pattern: patternSectionReducer
  }
});