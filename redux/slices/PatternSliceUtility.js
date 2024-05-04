/**
 * Adds instruction steps to the given state object for the specified instruction ID.
 */
export const addInstructionSteps = (state, instructionId, instSteps) => {
    instSteps.forEach(step => {
        const stepId = step.id;
        state.instructionStepData.instructionStepSet[stepId] = {
            instructionId,
            ...step
        };
        state.instructionStepData.instructionStepIds.push(stepId);
    });
}

export const editInstructionSteps = (state, instructionId, updates) => {
    let stepData = state.instructionStepData;
    stepData.instructionStepSet = {};
    stepData.instructionStepIds = [];

    addInstructionSteps(instructionId, updates);
}

export const deleteInstructionSteps = (state, instructionId) => {
    const stepData = state.instructionStepData;

    const stepsToRemove = stepData.instructionStepIds.filter(id => stepData.instructionStepSet[id].instructionId === instructionId);

    stepsToRemove.forEach(id => {
        delete stepData.instructionStepSet[id];
    });

    stepData.instructionStepIds = stepData.instructionStepIds.filter(id => !stepsToRemove.includes(id));
}

