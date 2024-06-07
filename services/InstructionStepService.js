import db from '../database/Database';

export const addInstructionStepData = (instructionStepData) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO InstructionStepData (GUID, InstructionGUID, Repetition, Stitch, OrderIndex) VALUES ';

                const instructionStepSet = instructionStepData.instructionStepSet;
                console.log(instructionStepSet)
                const sqlParamSet = [];

                // Build values part of the SQL command
                instructionStepData.instructionStepIds.forEach((id, index) => {
                    const sqlParamLine = `('${id}', '${instructionStepSet[id].instructionId}', ${instructionStepSet[id].rep},'${instructionStepSet[id].stitch}', ${index})`;
                    sqlParamSet.push(sqlParamLine);
                });

                // Complete the SQL statement
                sql += sqlParamSet.join(", ") + ";";

                console.log(sql)

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

// will be called when the instruction step edit is made
export const updateInstructionStepData = ({ }) => {

}
