import React, { useState } from 'react';
import { useDatabase } from '../App';

export const CreatePatternService = ({}) => {
    const { db } = useDatabase();

    // will be called when the pattern is saved in create mode
    const addPatternData = ({}) => {}

    // will be called when the pattern is saved in edit mode
    const updatePatternData = ({}) => {}

    // will be called to get pattern data when loading
    const getPatternData = ({}) => {}
}