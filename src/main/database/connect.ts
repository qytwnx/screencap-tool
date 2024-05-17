import Database, * as BetterSqlite3 from 'better-sqlite3';
import { resolve } from 'node:path';

const file = resolve('D:\\QY_Project\\2024\\screencap_db\\screencap.db');
const db: BetterSqlite3.Database = new Database(file, {});
db.pragma('journal_mode = WAL');

export { db };
