import React, { useState } from 'react';
import { useDatabase } from '../App';

export const InstructionRowService = ({}) => {
    const { db } = useDatabase();

    // will be called when the instruction row edit is made
    const updateInstructionRowData = ({}) => {}
}