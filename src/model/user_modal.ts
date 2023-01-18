import sqlite from 'db/sqlite';
import { USER } from 'common/table_name';

(async () => {
  const hasTable = await sqlite.schema.hasTable(USER);

  !hasTable &&
    sqlite.schema
      .createTableIfNotExists(USER, (table) => {
        table.increments('id');
        table.string('username').unique().notNullable().comment('用户名, 唯一');
        table.string('password').notNullable().comment('密码');
      })
      .then();
})();
