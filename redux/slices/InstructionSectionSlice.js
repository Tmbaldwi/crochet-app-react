import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    instructionSections: [],
};

const instructionSectionSlice = createSlice({
    name: 'instructionSection',
    initialState,
    reducers: {
        //adds instruction sections with inputted range at the end of the list
        addInstructionSection: (state, action) => {
            state.instructionSections.push(action.payload);
        },

        // edits the instruction section at a given index with the new range
        editInstructionSection: (state, action) => {
            const { index, section } = action.payload;
            state.instructionSections[index] = { ...state.instructionSections[index], ...section };
        },

        // removes instruction section at a given index
        deleteInstructionSection: (state, action) => {
            state.instructionSections.splice(action.payload, 1);
        },
    }
});

export const {
    addInstructionSection,
    editInstructionSection,
    deleteInstructionSection,
} = instructionSectionSlice.actions;

export default instructionSectionSlice.reducer;