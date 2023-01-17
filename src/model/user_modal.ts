import sqlite from 'db/sqlite';
import { USER } from 'common/table_name';

sqlite.schema
  .createTable(USER, (table) => {
    table.increments('id');
    table.string('username').unique().notNullable().comment('用户名, 唯一');
    table.string('password').notNullable().comment('密码');
  })
  .then();
