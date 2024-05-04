import { createSlice } from '@reduxjs/toolkit';
import { addInstructionSteps, editInstructionSteps, deleteInstructionSteps } from './PatternSliceUtility';

const initialState = {
    patternSectionData: {
        patternSectionSet: {},
        patternSectionIds: []
    },
    instructionSectionData: {
        instructionSectionSet: {},
        instructionSectionIds: []
    },
    instructionData: {
        instructionSet: {},
        instructionIds: []
    },
    instructionStepData: {
        instructionStepSet: {},
        instructionStepIds: []
    }
};

const patternSlice = createSlice({
    name: 'pattern',
    initialState,
    reducers: {
        addPatternSection: (state, action) => {
            const { id, title, repetitions, specialInstruction } = action.payload;
            state.patternSectionData.patternSectionSet[id] = {
                id: id,
                title: title,
                repetitions: repetitions,
                specialInstruction: specialInstruction,
                instructionSections: [],
            };
            state.patternSectionData.patternSectionIds.push(id);
        },
        editPatternSection: (state, action) => {
            const { patternSectionId, updates } = action.payload;
            const patternSection = state.patternSectionData.patternSectionSet[patternSectionId];
            if (patternSection) {
                Object.assign(patternSection, updates);
            }
        },
        deletePatternSection: (state, action) => {
            const deleteId = action.payload;
            delete state.patternSectionData.patternSectionSet[deleteId];
            state.patternSectionData.patternSectionIds = state.patternSectionData.patternSectionIds.filter(id => id !== deleteId);
        },
        addInstructionSection: (state, action) => {
            const {patternSectionId, instructionSection } = action.payload;
            const pattern = state.patternSectionData.patternSectionSet[patternSectionId];
            if (pattern) {
                const instructionSectionId = instructionSection.id;
                state.instructionSectionData.instructionSectionSet[instructionSectionId] = {
                    patternSectionId,
                    ...instructionSection,
                    instructions: [],
                };
                pattern.instructionSections.push(instructionSectionId);
                state.instructionSectionData.instructionSectionIds.push(instructionSectionId);
            }
        },
        editInstructionSection: (state, action) => {
            const { instructionSectionId, updates } = action.payload;
            const section = state.instructionSectionData.instructionSectionSet[instructionSectionId];
            if (section) {
                Object.assign(section, updates);
            }
        },
        deleteInstructionSection: (state, action) => {
            const { patternSectionId, instructionSectionId } = action.payload;
            const pattern = state.patternSectionData.patternSectionSet[patternSectionId];
            if (pattern) {
                pattern.instructionSections = pattern.instructionSections.filter(id => id !== instructionSectionId);
            }
            delete state.instructionSectionData.instructionSectionSet[instructionSectionId];
            state.instructionSectionData.instructionSectionIds = state.instructionSectionData.instructionSectionIds.filter(id => id !== instructionSectionId);
        },
        addInstruction: (state, action) => {
            const { instructionSectionId, instruction } = action.payload;
            const section = state.instructionSectionData.instructionSectionSet[instructionSectionId];
            if (section) {
                const instructionId = instruction.id; 
                state.instructionData.instructionSet[instructionId] = {
                    instructionSectionId,
                    id: instruction.id,
                    repetition: instruction.repetition,
                    color: instruction.color,
                    specialInstruction: instruction.specialInstruction,
                };
                section.instructions.push(instructionId);
                state.instructionData.instructionIds.push(instructionId);

                addInstructionSteps(state, instruction.id, instruction.instSteps);
            }
        },
        editInstruction: (state, action) => {
            const { instructionId, updates } = action.payload;
            const instruction = state.instructionData.instructionSet[instructionId];
            if (instruction) {
                Object.assign(instruction, updates);
                
                editInstructionSteps(state, instructionId, updates.instSteps);
            }
        },
        deleteInstruction: (state, action) => {
            const { instructionSectionId, instructionId } = action.payload;
            const section = state.instructionSectionData.instructionSectionSet[instructionSectionId];
            if (section) {
                section.instructions = section.instructions.filter(id => id !== instructionId);
            }
            delete state.instructionData.instructionSet[instructionId];
            state.instructionData.instructionIds = state.instructionData.instructionIds.filter(id => id !== instructionId);

            deleteInstructionSteps(state, instructionId);
        },
    }
});

export const {
    addPatternSection,
    editPatternSection,
    deletePatternSection,
    addInstructionSection,
    editInstructionSection,
    deleteInstructionSection,
    addInstruction,
    editInstruction,
    deleteInstruction
} = patternSlice.actions;

export default patternSlice.reducer;
