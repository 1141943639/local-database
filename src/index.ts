import app from 'app';
import config from 'config';
import { v4 as uuid } from 'uuid';
import User from 'model/user.model';
import localDB from 'db/local_database';
import TestTable2 from 'model/test.model';
import TestTable3 from 'model/test3.model';
import cluster from 'cluster';
import { join, resolve } from 'path';
import { fork } from 'child_process';

const { APP_PORT } = config;

(async () => {
  await localDB;

  cluster.setupPrimary({
    exec: join(__dirname, 'child.ts'),
  });

  const arr = [
    resolve('src/model/user.model.ts'),
    // resolve('src/model/user.model.ts'),
    // resolve('src/model/user.model.ts'),
  ];

  arr.forEach((path) => {
    const work = cluster.fork();
    work.send(path);
    work.send(path);
    work.send(path);
  });
})();

// app.listen(APP_PORT, () => {
//   console.log(`\x1B[32mhttp://localhost:${APP_PORT}`);
// });

export default app;
