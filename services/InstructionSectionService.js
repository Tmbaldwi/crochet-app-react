import React, { useState } from 'react';
import { useDatabase } from '../App';

export const InstructionSectionService = ({}) => {
    const { db } = useDatabase();

    // will be called when the instruction section edit is made
    const updateInstructionSectionData = ({}) => {}
}