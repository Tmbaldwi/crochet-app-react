import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    instructionRows: [],
};

const instructionRowSlice = createSlice({
    name: 'instructionRow',
    initialState,
    reducers: {
        addInstructionRow: (state, action) => {
            state.instructionRows.push(action.payload);
        },

        // edits the instruction row at a given index with the new range
        editInstructionRow: (state, action) => {
            const { index, row } = action.payload;
            state.instructionRows[index] = { ...state.instructionRows[index], ...row };
        },

        // removes instruction row at a given index
        deleteInstructionRow: (state, action) => {
            state.instructionRows.splice(action.payload, 1);
        },
    }
});

export const {
    addInstructionRow,
    editInstructionRow,
    deleteInstructionRow,
} = instructionRowSlice.actions;

export default instructionRowSlice.reducer;