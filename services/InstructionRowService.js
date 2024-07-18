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

// will be called when the instruction edit is made
export const updateInstructionRowData = ({ }) => {

}
