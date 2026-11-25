import Database from 'better-sqlite3';

const db = new Database(process.env.DATABASE_PATH);
db.pragma('foreign_keys = ON');

export default db;
