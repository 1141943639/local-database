import knex from 'knex';

const sqlite = knex({
  client: 'sqlite3',
  connection: () => ({
    filename: process.env.SQLITE_FILE_NAME,
    asyncStackTraces: process.env.NODE_ENV === 'develop',
    debug: process.env.NODE_ENV === 'develop',
  }),
});

console.log(process.env.NODE_ENV);

export default {};
