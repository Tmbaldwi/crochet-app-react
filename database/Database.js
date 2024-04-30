import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('CrochetAppDatabase');

export default db;