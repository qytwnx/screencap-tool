import { app } from 'electron';
import { db } from './connect';
import { resolve } from 'node:path';

export const initDatabase = () => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS setting (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    videoPath TEXT NOT NULL
  );
`);
  const exist = db.prepare('SELECT * FROM setting').get();
  if (exist) {
    return;
  }
  const defaultVideoPath = resolve(app.getPath('videos'), 'QVideo');
  db
    .prepare(`INSERT INTO setting (videoPath) VALUES(@videoPath)`)
    .run({ videoPath: defaultVideoPath }).lastInsertRowid;
};
