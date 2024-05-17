import { db } from './connect';

// 返回id
export const insert = (sql: string, params: Record<string, any>) => {
  return db.prepare(sql).run(params).lastInsertRowid;
};

// 返回影响行数
export const del = (sql: string, params: Record<string, any>) => {
  return db.prepare(sql).run(params).changes;
};

// 返回影响行数
export const update = (sql: string, params: Record<string, any>) => {
  return db.prepare(sql).run(params).changes;
};

// 返回对象
export const selectOne = (sql: string, params: Record<string, any>) => {
  return db.prepare(sql).get(params);
};

export const selectList = (sql: string, params: Record<string, any>) => {
  return db.prepare(sql).all(params);
};
