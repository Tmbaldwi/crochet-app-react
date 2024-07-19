import db from '../database/Database';

export const addPatternSectionData = (patternId, patternSectionData) => {
    return new Promise((resolve, reject) => {

        if(patternSectionData.patternSectionIds.length === 0){
            console.log('No data to insert into InstructionData');
            reject("No pattern sections to save");
            return;
        }
        
        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO PatternSectionData (GUID, PatternId, PatternSectionName, Repetitions, SpecialInstruction, OrderIndex) VALUES ';

                const sectionSet = patternSectionData.patternSectionSet;
                const sqlParamSet = [];

                // Build values part of the SQL command
                patternSectionData.patternSectionIds.forEach((id, index) => {
                    const sqlParamLine = `('${id}', ${patternId}, '${sectionSet[id].title}', ${sectionSet[id].repetitions}, '${sectionSet[id].specialInstruction}', ${index})`;
                    sqlParamSet.push(sqlParamLine);
                });

                // Complete the SQL statement
                sql += sqlParamSet.join(", ") + ";";

                tx.executeSql(sql, [],
                    (_, result) => {
                        console.log('PatternSectionData insertion successful');
                        resolve(result);
                    },
                    (_, error) => {
                        console.log('Error executing SQL for PatternSectionData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while inserting into PatternSectionData:', error);
                reject(error);
            }
        );
    });
}

export const getPatternSections = (patternId) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                const sql = `
                    SELECT psd.GUID, psd.PatternId, psd.PatternSectionName, psd.Repetitions, psd.SpecialInstruction, psd.OrderIndex,
                           GROUP_CONCAT(isd.GUID) as InstructionSectionIds
                    FROM PatternSectionData psd
                    LEFT JOIN InstructionSectionData isd ON psd.GUID = isd.PatternSectionGUID
                    WHERE psd.PatternId = ${patternId}
                    GROUP BY psd.GUID, psd.PatternId, psd.PatternSectionName, psd.Repetitions, psd.SpecialInstruction, psd.OrderIndex
                    ORDER BY psd.OrderIndex;
                `;
                
                tx.executeSql(sql, [], 
                    (tx, results) => {
                        const patternSectionSet = {};
                        const patternSectionIds = [];
                        for (let i = 0; i < results.rows.length; i++) {
                            const row = results.rows.item(i);
                            const id = row.GUID;
                            patternSectionSet[id] = {
                                id: id,
                                title: row.PatternSectionName,
                                repetitions: row.Repetitions,
                                specialInstruction: row.SpecialInstruction,
                                instructionSections: row.InstructionSectionIds ? row.InstructionSectionIds.split(',') : [],
                            };
                            patternSectionIds.push(id);
                        }
                        resolve({ patternSectionSet, patternSectionIds });
                    },
                    (tx, error) => {
                        console.log('Error executing SQL for retrieving PatternSectionData:', error);
                        reject(error);
                    }
                );
            },
            error => {
                console.log('Transaction error while retrieving PatternSectionData:', error);
                reject(error);
            }
        );
    });
};

// will be called when the pattern section edit is made
export const updatePatternSectionData = ({ }) => {

}
