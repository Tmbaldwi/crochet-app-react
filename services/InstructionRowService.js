import db from '../database/Database';

export const addInstructionRowData = (patternId, instructionData) => {
    return new Promise((resolve, reject) => {

        if(instructionData.instructionIds.length === 0){
            console.log('No data to insert into InstructionData');
            resolve(null);
            return;
        }

        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO InstructionData (GUID, PatternId, InstructionSectionGUID, Instruction, Repetition, YarnColor, SpecialInstruction, OrderIndex) VALUES ';

                const instructionSet = instructionData.instructionSet;
                const sqlParamSet = [];

                // Build values part of the SQL command
                instructionData.instructionIds.forEach((id, index) => {
                    const sqlParamLine = `('${id}', ${patternId}, '${instructionSet[id].instructionSectionId}', '${instructionSet[id].instruction}', ${instructionSet[id].repetition}, '${instructionSet[id].color}', '${instructionSet[id].specialInstruction}', ${index})`;
                    sqlParamSet.push(sqlParamLine);
                });

                // Complete the SQL statement
                sql += sqlParamSet.join(", ") + ";";

                tx.executeSql(sql, [],
                    (_, result) => {
                        console.log('InstructionData insertion successful');
                        resolve(result);
                    },
                    (_, error) => {
                        console.log('Error executing SQL for InstructionData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while inserting into InstructionData:', error);
                reject(error);
            }
        );
    });
}

export const getInstructionData = (patternId) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                const sql = `
                    SELECT id.GUID, id.PatternId, id.InstructionSectionGUID, id.Instruction, id.Repetition, id.YarnColor, id.SpecialInstruction, id.OrderIndex,
                           GROUP_CONCAT(steps.GUID) as InstructionStepIds
                    FROM InstructionData id
                    LEFT JOIN InstructionStepData steps ON id.GUID = steps.InstructionGUID
                    WHERE id.PatternId = ${patternId}
                    GROUP BY id.GUID, id.PatternId, id.InstructionSectionGUID, id.Instruction, id.Repetition, id.YarnColor, id.SpecialInstruction, id.OrderIndex
                    ORDER BY id.OrderIndex;
                `;
                
                tx.executeSql(sql, [], 
                    (tx, results) => {
                        const instructionSet = {};
                        const instructionIds = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            const row = results.rows.item(i);
                            const id = row.GUID;
                            instructionSet[id] = {
                                instructionSectionId: row.InstructionSectionGUID,
                                id: id,
                                instruction: row.Instruction,
                                repetition: row.Repetition,
                                color: row.YarnColor,
                                specialInstruction: row.SpecialInstruction,
                                instructionSteps: row.InstructionStepIds ? row.InstructionStepIds.split(',') : [],
                            };
                            instructionIds.push(id);
                        }
                        resolve({ instructionSet, instructionIds });
                    },
                    (tx, error) => {
                        console.log('Error executing SQL for retrieving InstructionData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while retrieving InstructionData:', error);
                reject(error);
            }
        );
    });
};

// will be called when the instruction edit is made
export const updateInstructionRowData = ({ }) => {

}
