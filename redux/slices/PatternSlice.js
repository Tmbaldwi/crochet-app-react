import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    patternSections: {
        byId: {},
        allIds: []
    },
    instructionSections: {
        byId: {},
        allIds: []
    },
    instructions: {
        byId: {},
        allIds: []
    }
};

const patternSectionSlice = createSlice({
    name: 'pattern',
    initialState,
    reducers: {
        addPatternSection: (state, action) => {
            const { id, sectionTitle, repetitions, specialInstruction } = action.payload;
            state.patternSections.byId[id] = {
                id: id,
                title: sectionTitle,
                repetitions: repetitions,
                specialInstruction: specialInstruction,
                instructionSections: []
            };
            state.patternSections.allIds.push(id);
        },
        editPatternSection: (state, action) => {
            const { id, updates } = action.payload;
            const patternSection = state.patternSections.byId[id];
            if (patternSection) {
                Object.assign(patternSection, updates);
            }
        },
        deletePatternSection: (state, action) => {
            const deleteId = action.payload;
            delete state.patternSections.byId[deleteId];
            state.patternSections.allIds = state.patternSections.allIds.filter(id => id !== deleteId);
        },
        addInstructionSection: (state, action) => {
            const { patternId, instructionSection } = action.payload;
            const pattern = state.patternSections.byId[patternId];
            if (pattern) {
                const sectionId = instructionSection.id;
                state.instructionSections.byId[sectionId] = {
                    ...instructionSection
                };
                pattern.instructionSections.push(sectionId);
                state.instructionSections.allIds.push(sectionId);
            }
        },
        editInstructionSection: (state, action) => {
            const { sectionId, updates } = action.payload;
            const section = state.instructionSections.byId[sectionId];
            if (section) {
                Object.assign(section, updates);
            }
        },
        deleteInstructionSection: (state, action) => {
            const { patternId, sectionId } = action.payload;
            const pattern = state.patternSections.byId[patternId];
            if (pattern) {
                pattern.instructionSections = pattern.instructionSections.filter(id => id !== sectionId);
            }
            delete state.instructionSections.byId[sectionId];
            state.instructionSections.allIds = state.instructionSections.allIds.filter(id => id !== sectionId);
        },
        addInstruction: (state, action) => {
            const { sectionId, instruction } = action.payload;
            const section = state.instructionSections.byId[sectionId];
            if (section) {
                const instructionId = instruction.id; 
                state.instructions.byId[instructionId] = {
                    id: instructionId,
                    text: instruction.instruction,
                    steps: instruction.instructionSteps,
                    repetitions: instruction.repetition,
                    color: instruction.color,
                    specialInstruction: instruction.specialInstruction
                };
                if (!section.instructions) {
                    section.instructions = [];
                }
                section.instructions.push(instructionId);
                state.instructions.allIds.push(instructionId);
            }
        },
        editInstruction: (state, action) => {
            const { instructionId, updates } = action.payload;
            const instruction = state.instructions.byId[instructionId];
            if (instruction) {
                Object.assign(instruction, updates);
            }
        },
        deleteInstruction: (state, action) => {
            const { sectionId, instructionId } = action.payload;
            const section = state.instructionSections.byId[sectionId];
            if (section) {
                section.instructions = section.instructions.filter(id => id !== instructionId);
            }
            delete state.instructions.byId[instructionId];
            state.instructions.allIds = state.instructions.allIds.filter(id => id !== instructionId);
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
} = patternSectionSlice.actions;

export default patternSectionSlice.reducer;
