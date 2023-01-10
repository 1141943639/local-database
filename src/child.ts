import TestTable2 from 'model/test.model';
import { join, resolve } from 'path';
import { v4 as uuid } from 'uuid';
import Table from './local_database/table';

process.on('message', async (tablePath: string) => {
  const table = (await import(tablePath))?.default;
  await table.create(
    Array.from({
      length: 0,
    }).map(() => {
      const obj: { [props: string]: string } = {};

      Array.from({ length: 20 }).forEach((v, index) => {
        obj[`user_name_${index}`] = uuid();
      });

      return obj;
    })
  );

  process?.send?.('end');
});

export default {};
