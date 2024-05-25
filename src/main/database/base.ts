import { db } from './connect';

export const BaseSql = () => {
  // 返回id
  const insert = (sql: string, params: Record<string, any>) => {
    return db().prepare(sql).run(params).lastInsertRowid;
  };

  // 返回影响行数
  const del = (sql: string, params: Record<string, any>) => {
    return db().prepare(sql).run(params).changes;
  };

  // 返回影响行数
  const update = (sql: string, params: Record<string, any>) => {
    return db().prepare(sql).run(params).changes;
  };

  // 返回对象
  const selectOne = (sql: string, params: Record<string, any>) => {
    return db().prepare(sql).get(params);
  };

  const selectList = (sql: string, params: Record<string, any>) => {
    return db().prepare(sql).all(params);
  };

  const selectTotal = (sql: string, params: Record<string, any>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return db().prepare(sql).get(params)?.total || 0;
  };

  return {
    insert,
    del,
    update,
    selectOne,
    selectList,
    selectTotal
  };
};
