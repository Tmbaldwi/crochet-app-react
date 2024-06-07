import db from '../database/Database';
import { addPatternSectionData } from './PatternSectionService';
import { addInstructionSectionData } from './InstructionSectionService';
import { addInstructionRowData } from './InstructionRowService';
import { fetchAllPatternData, fetchAllPatternSectionData, fetchAllInstructionSectionData, fetchAllInstructionData, fetchAllInstructionStepData } from './ServiceTools';
import { addInstructionStepData } from './InstructionStepService';

export const createNewPattern = async (patternName, patternData) => {
    try {
        const patternId = await addPatternData(patternName);

        await addPatternSectionData(patternId, patternData.patternSectionData);

        await addInstructionSectionData(patternData.instructionSectionData);

        await addInstructionRowData(patternData.instructionData);

        await addInstructionStepData(patternData.instructionStepData);

        return patternId;
    } catch (error) {
        console.error('Error creating new pattern', error);
        throw error;
    }
}

// will be called when the pattern is saved in create mode
export const addPatternData = (patternName) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                const sql = 'INSERT INTO PatternData (PatternName) VALUES (?)';
                tx.executeSql(sql, [patternName],
                    (_, result) => {
                        console.log('PatternData table insertion successful, row ID:', result.insertId);
                        resolve(result.insertId); // Resolve with the insertId
                    },
                    (_, error) => {
                        console.log('Error executing SQL:', error);
                        reject(error); // Reject on SQL error
                    }
                );
            },
            error => {
                console.log('Transaction error while inserting into PatternData table:', error);
                reject(error); // Reject on transaction error
            },
            () => {
                console.log('PatternData table insertion transaction successful');
            }
        );
    });
};


// will be called when the pattern is saved in edit mode
export const updatePatternData = () => { }

// will be called to get pattern data when loading
export const getPatternData = () => { }