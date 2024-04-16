import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patternSections: [],
};

const patternSectionSlice = createSlice({
  name: 'patternSection',
  initialState,
  reducers: {
    addPatternSection: (state, action) => {
      state.patternSections.push(action.payload);
    },
    editPatternSection: (state, action) => {
      const { index, section } = action.payload;
      state.patternSections[index] = { ...state.patternSections[index], ...section };
    },
    deletePatternSection: (state, action) => {
      state.patternSections.splice(action.payload, 1);
    },
  }
});

export const {
  addPatternSection,
  editPatternSection,
  deletePatternSection} = patternSectionSlice.actions;

export default patternSectionSlice.reducer;
