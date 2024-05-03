import db from '../database/Database';

export const fetchAllPatternData = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM PatternData ORDER BY CreatedAt DESC;`,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    console.error("Error fetching PatternData: ", error);
                    reject(error);
                }
            );
        });
    });
};

export const fetchAllPatternSectionData = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM PatternSectionData ORDER BY OrderIndex ASC;`,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    console.error("Error fetching PatternSectionData: ", error);
                    reject(error);
                }
            );
        });
    });
};

export const fetchAllInstructionSectionData = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM InstructionSectionData ORDER BY PatternSectionGUID ASC;`,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    console.error("Error fetching InstructionSectionData: ", error);
                    reject(error);
                }
            );
        });
    });
};