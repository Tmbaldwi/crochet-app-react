import db from '../database/Database';
import { getLabelByValue } from '../components/Common Models/Dropdown';

export const addInstructionStepData = (patternId, instructionStepData) => {
    return new Promise((resolve, reject) => {

        if(instructionStepData.instructionStepIds.length === 0){
            console.log('No data to insert into InstructionStepData');
            resolve(null);
            return;
        }

        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO InstructionStepData (GUID, PatternId, InstructionGUID, Repetition, Stitch, OrderIndex) VALUES ';

                const instructionStepSet = instructionStepData.instructionStepSet;
                const sqlParamSet = [];

                // Build values part of the SQL command
                instructionStepData.instructionStepIds.forEach((id, index) => {
                    const sqlParamLine = `('${id}', ${patternId}, '${instructionStepSet[id].instructionId}', ${instructionStepSet[id].repetition},'${instructionStepSet[id].stitch}', ${index})`;
                    sqlParamSet.push(sqlParamLine);
                });

                // Complete the SQL statement
                sql += sqlParamSet.join(", ") + ";";

                tx.executeSql(sql, [],
                    (_, result) => {
                        console.log('InstructionStepData insertion successful');
                        resolve(result);
                    },
                    (_, error) => {
                        console.log('Error executing SQL for InstructionStepData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while inserting into InstructionStepData:', error);
                reject(error);
            }
        );
    });
}

export const getInstructionSteps = (patternId) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                const sql = `
                    SELECT GUID, PatternId, InstructionGUID, Repetition, Stitch, OrderIndex
                    FROM InstructionStepData
                    WHERE PatternId = ${patternId}
                    ORDER BY OrderIndex;
                `;
                
                tx.executeSql(sql, [], 
                    (tx, results) => {
                        const instructionStepSet = {};
                        const instructionStepIds = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            const row = results.rows.item(i);
                            const id = row.GUID;
                            instructionStepSet[id] = {
                                instructionId: row.InstructionGUID,
                                id: id,
                                repetition: row.Repetition.toString(),
                                stitch: row.Stitch,
                                stitchAbbr: getLabelByValue(row.Stitch)
                            };
                            instructionStepIds.push(id);
                        }
                        resolve({ instructionStepSet, instructionStepIds });
                    },
                    (tx, error) => {
                        console.log('Error executing SQL for retrieving InstructionStepData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while retrieving InstructionStepData:', error);
                reject(error);
            }
        );
    });
};

// will be called when the instruction step edit is made
export const updateInstructionStepData = ({ }) => {

}
