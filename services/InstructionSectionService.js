import db from '../database/Database';

export const addInstructionSectionData = (instructionSectionData) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO InstructionSectionData (GUID, PatternSectionGUID, InstructionSectionName, SectionTypeSelectionValue, StartNum, EndNum, OrderIndex) VALUES ';

                const sectionSet = instructionSectionData.instructionSectionSet;
                const sqlParamSet = [];

                // Build values part of the SQL command
                instructionSectionData.instructionSectionIds.forEach((id, index) => {
                    const sqlParamLine = `('${id}', '${sectionSet[id].patternSectionId}', '${sectionSet[id].title}', '${sectionSet[id].value}', ${sectionSet[id].startNum}, ${sectionSet[id].endNum? sectionSet[id].endNum: 'NULL'}, ${index})`;
                    sqlParamSet.push(sqlParamLine);
                });

                // Complete the SQL statement
                sql += sqlParamSet.join(", ") + ";";

                tx.executeSql(sql, [],
                    (_, result) => {
                        console.log('InstructionSectionData insertion successful');
                        resolve(result);
                    },
                    (_, error) => {
                        console.log('Error executing SQL for InstructionSectionData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while inserting into InstructionSectionData:', error);
                reject(error);
            }
        );
    });
}

// will be called when the instruction section edit is made
export const updateInstructionSectionData = ({ }) => {

}
