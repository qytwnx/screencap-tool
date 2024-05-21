import { db } from './connect';

export const initDatabase = () => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS recordings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fileName TEXT NULL,
    filePath TEXT NULL,
    fileFormat TEXT NULL,
    duration TEXT NULL,
    resolution TEXT NULL,
    frameRate INTEGER NULL,
    createdTime TEXT NULL,
    updatedTime TEXT NULL
  );
`);
};
