import db from '../database/Database';

export const addInstructionRowData = (instructionData) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO InstructionData (GUID, InstructionSectionGUID, Instruction, Repetition, YarnColor, SpecialInstruction, OrderIndex) VALUES ';

                const instructionSet = instructionData.instructionSet;
                const sqlParamSet = [];

                // Build values part of the SQL command
                instructionData.instructionIds.forEach((id, index) => {
                    const sqlParamLine = `('${id}', '${instructionSet[id].instructionSectionId}', '${instructionSet[id].instruction}', ${instructionSet[id].repetition}, '${instructionSet[id].color}', '${instructionSet[id].specialInstruction}', ${index})`;
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
