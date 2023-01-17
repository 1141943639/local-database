import config from 'config';
import { ensureFileSync } from 'fs-extra';
import knex from 'knex';
import { resolve } from 'path';

const path = resolve('./', 'db', `${config.SQLITE_FILE_NAME}.sqlite3`);
ensureFileSync(path);

const sqlite = knex({
  client: 'sqlite3',
  connection: {
    filename: path,
  },
  useNullAsDefault: true,
  debug: config.NODE_ENV === 'develop',
  asyncStackTraces: config.NODE_ENV === 'develop',
});

(async () => {
  try {
    await sqlite.raw('SELECT 1');
    console.log('sqlite数据库连接成功');
  } catch (err) {
    console.log('sqlite数据库连接失败');
    console.error(err);
  }
})();

export default sqlite;
