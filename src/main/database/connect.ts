import { is } from '@electron-toolkit/utils';
import Database, * as BetterSqlite3 from 'better-sqlite3';
import { app } from 'electron';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const db = (): BetterSqlite3.Database => {
  let dbFile = resolve(app.getPath('appData'), app.getName(), 'database');
  if (is.dev) {
    dbFile = resolve('D:\\QY_Project\\2024\\screencap_db');
  }
  // 不存在则创建文件夹
  if (!existsSync(dbFile)) {
    mkdirSync(dbFile);
  }
  const db: BetterSqlite3.Database = new Database(
    resolve(dbFile, 'screencap.db'),
    {}
  );
  db.pragma('journal_mode = WAL');
  return db;
};

export { db };
