import db from '../database/Database';

export const addInstructionSectionData = (patternId, instructionSectionData) => {
    return new Promise((resolve, reject) => {

        if(instructionSectionData.instructionSectionIds.length === 0){
            console.log('No data to insert into InstructionSectionData');
            resolve(null);
            return;
        }

        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO InstructionSectionData (GUID, PatternId, PatternSectionGUID, InstructionSectionName, SectionTypeSelectionValue, StartNum, EndNum, OrderIndex) VALUES ';

                const sectionSet = instructionSectionData.instructionSectionSet;
                const sqlParamSet = [];

                // Build values part of the SQL command
                instructionSectionData.instructionSectionIds.forEach((id, index) => {
                    const sqlParamLine = `('${id}', ${patternId}, '${sectionSet[id].patternSectionId}', '${sectionSet[id].title}', '${sectionSet[id].value}', ${sectionSet[id].startNum}, ${sectionSet[id].endNum? sectionSet[id].endNum: 'NULL'}, ${index})`;
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


export const getInstructionSections = (patternId) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                const sql = `
                    SELECT isd.GUID, isd.PatternId, isd.PatternSectionGUID, isd.InstructionSectionName, isd.SectionTypeSelectionValue, isd.StartNum, isd.EndNum, isd.OrderIndex,
                           GROUP_CONCAT(inst.GUID) as InstructionIds
                    FROM InstructionSectionData isd
                    LEFT JOIN InstructionData inst ON isd.GUID = inst.InstructionSectionGUID
                    WHERE isd.PatternId = ${patternId}
                    GROUP BY isd.GUID, isd.PatternId, isd.PatternSectionGUID, isd.InstructionSectionName, isd.SectionTypeSelectionValue, isd.StartNum, isd.EndNum, isd.OrderIndex
                    ORDER BY isd.OrderIndex;
                `;
                
                tx.executeSql(sql, [], 
                    (tx, results) => {
                        const instructionSectionSet = {};
                        const instructionSectionIds = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            const row = results.rows.item(i);
                            const id = row.GUID;
                            instructionSectionSet[id] = {
                                id: id,
                                patternSectionId: row.PatternSectionGUID,
                                title: row.InstructionSectionName,
                                value: row.SectionTypeSelectionValue,
                                startNum: row.StartNum,
                                endNum: row.EndNum,
                                orderIndex: row.OrderIndex,
                                instructions: row.InstructionIds ? row.InstructionIds.split(',') : [],
                            };
                            instructionSectionIds.push(id);
                        }
                        resolve({ instructionSectionSet, instructionSectionIds });
                    },
                    (tx, error) => {
                        console.log('Error executing SQL for retrieving InstructionSectionData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while retrieving InstructionSectionData:', error);
                reject(error);
            }
        );
    });
};

// will be called when the instruction section edit is made
export const updateInstructionSectionData = ({ }) => {

}
