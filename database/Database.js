import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('CrochetAppDatabase');

// for debug purposes
const deleteTables = () => {
    db.transaction(tx => {
        // PatternData table creation
        tx.executeSql(
            `DROP TABLE PatternData;`,
            [],
            () => console.log("PatternData dropped"),
            (_, error) => console.log("Failed to drop PatternData", error)
        );
        tx.executeSql(
            `DROP TABLE PatternSectionData;`,
            [],
            () => console.log("PatternSectionData dropped"),
            (_, error) => console.log("Failed to drop PatternSectionData", error)
        );
        tx.executeSql(
            `DROP TABLE InstructionSectionData;`,
            [],
            () => console.log("InstructionSectionData dropped"),
            (_, error) => console.log("Failed to drop InstructionSectionData", error)
        );
        tx.executeSql(
            `DROP TABLE InstructionData;`,
            [],
            () => console.log("InstructionData dropped"),
            (_, error) => console.log("Failed to drop InstructionData", error)
        );
        tx.executeSql(
            `DROP TABLE InstructionStepData;`,
            [],
            () => console.log("InstructionStepData dropped"),
            (_, error) => console.log("Failed to drop InstructionStepData", error)
        );
    });
}

const initializeDatabase = () => {
    db.transaction(tx => {
        // PatternData table creation
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS PatternData (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                PatternName TEXT NOT NULL,
                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`,
            [],
            () => console.log("PatternData table created/already exists"),
            (_, error) => console.log("Failed to create PatternData table", error)
        );

        // PatternSectionData table creation
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS PatternSectionData (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                GUID TEXT NOT NULL,
                PatternID INTEGER NOT NULL,
                PatternSectionName TEXT NOT NULL,
                Repetitions INTEGER NOT NULL,
                SpecialInstruction TEXT,
                OrderIndex INTEGER NOT NULL,
                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`,
            [],
            () => console.log("PatternSectionData table created/already exists"),
            (_, error) => console.log("Failed to create PatternSectionData table", error)
        );

        // InstructionSectionData table creation
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS InstructionSectionData (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                GUID TEXT NOT NULL,
                PatternSectionGUID INTEGER NOT NULL,
                InstructionSectionName TEXT NOT NULL,
                SectionTypeSelectionValue TEXT NOT NULL,
                StartNum INTEGER NOT NULL,
                EndNum INTEGER,
                OrderIndex INTEGER NOT NULL,
                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            );`,
            [],
            () => console.log("InstructionSectionData table created/already exists"),
            (_, error) => console.log("Failed to create InstructionSectionData table", error)
        );

        // InstructionData table creation
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS InstructionData (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                GUID TEXT NOT NULL,
                InstructionSectionGUID NOT NULL,
                Repetition INTEGER NOT NULL,
                YarnColor TEXT NOT NULL,
                SpecialInstruction TEXT,
                OrderIndex INTEGER NOT NULL,
                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`,
            [],
            () => console.log("InstructionData table created/already exists"),
            (_, error) => console.log("Failed to create InstructionData table", error)
        );

        //InstructionStepData table creation
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS InstructionStepData (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                GUID TEXT NOT NULL,
                InstructionGUID NOT NULL,
                Repetition INTEGER NOT NULL,
                Stitch TEXT NOT NULL,
                OrderIndex INTEGER NOT NULL,
                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`,
            [],
            () => console.log("InstructionStepData table created/already exists"),
            (_, error) => console.log("Failed to create InstructionStepData table", error)
        );
    });
};

deleteTables();
initializeDatabase();

export default db;