import db from '../database/Database';

export const addPatternSectionData = (patternId, patternSectionData) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                // Start the SQL statement
                let sql = 'INSERT INTO PatternSectionData (GUID, PatternID, PatternSectionName, Repetitions, SpecialInstruction, OrderIndex) VALUES ';

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

// will be called when the pattern section edit is made
export const updatePatternSectionData = ({ }) => {

}
