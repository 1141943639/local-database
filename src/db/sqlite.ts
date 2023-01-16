import config from 'config';
import knex from 'knex';

const sqlite = knex({
  client: 'sqlite3',
  connection: () => ({
    filename: config.SQLITE_FILE_NAME,
    asyncStackTraces: config.NODE_ENV === 'develop',
    debug: config.NODE_ENV === 'develop',
  }),
});

export default sqlite;
