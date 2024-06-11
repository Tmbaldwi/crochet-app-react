import db from '../database/Database';
import { addPatternSectionData } from './PatternSectionService';
import { addInstructionSectionData } from './InstructionSectionService';
import { addInstructionRowData } from './InstructionRowService';
import { addInstructionStepData } from './InstructionStepService';
import { fetchAllPatternData, fetchAllPatternSectionData, fetchAllInstructionSectionData, fetchAllInstructionData, fetchAllInstructionStepData } from './ServiceTools';

export const createNewPattern = (patternName, patternData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const patternId = await addPatternData(patternName);

            await addPatternSectionData(patternId, patternData.patternSectionData);

            await addInstructionSectionData(patternData.instructionSectionData);

            await addInstructionRowData(patternData.instructionData);

            await addInstructionStepData(patternData.instructionStepData);

            resolve(patternId);
        } catch (error) {
            console.error('Error creating new pattern', error);
            reject(error);
        }
    });
};

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
export const getPatternData = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT ID, PatternName FROM PatternData;`,
          [],
          (_, { rows }) => {
            let patterns = [];
            for (let i = 0; i < rows.length; i++) {
              patterns.push({
                ID: rows.item(i).ID,
                PatternName: rows.item(i).PatternName,
              });
            }
            resolve(patterns);
          },
          (_, error) => {
            console.log("Error fetching patterns", error);
            reject(error);
            return true;
          }
        );
      });
    });
  };