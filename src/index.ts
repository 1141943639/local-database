import app from 'app';
import { map, each } from 'async';
import config from 'config';
import { createWriteStream } from 'fs';
import { ensureFileSync } from 'fs-extra';
import { isPlainObject } from 'lodash';
import moment from 'moment';
import { resolve } from 'path';
import { jsonStr } from 'utils/json';
import { v4 as uuid } from 'uuid';

const { APP_PORT } = config;

// app.listen(APP_PORT, () => {
//   console.log(`\x1B[32mhttp://localhost:${APP_PORT}`);
// });

const path = resolve('./test.json');
ensureFileSync(path);
const ws = createWriteStream(path);

ws.on('open', () => {
  console.log('open');
});

ws.on('close', () => {
  console.log('close');
});

const id = uuid();

(async () => {
  const startDate = moment();
  const data = await map(Array.from({ length: 1000000 }), (value, callback) => {
    const obj: {
      [props: string]: string;
    } = {};
    Array.from({ length: 1 }).forEach((v, index) => {
      obj[String(index)] = id;
    });
    callback(null, obj);
  });

  console.log(moment().diff(startDate, 'second'));
  let count = 0;
  const toBuffer = async (
    data: unknown[] | { [props: string]: unknown }
  ): Promise<Buffer> => {
    const objectData = data as { [props: string]: unknown };
    const arrayData = data as unknown[];
    const finalData = isPlainObject(data)
      ? await map(Object.keys(objectData as object), (key, callback) => {
          callback(null, [key, objectData[key]]);
        })
      : arrayData;
    let res = Buffer.from('');

    const t = moment();

    await each(finalData, async (value, callback) => {
      let buffer = Buffer.from('');

      try {
        buffer = Buffer.from(jsonStr(value));
      } catch (err) {
        buffer = Buffer.from(
          await toBuffer(value as { [props: string]: unknown })
        );
      }
      res = Buffer.concat([res, buffer]);
      count++;

      count % 500 === 0 && console.log(count);
      callback(null);
    });

    // console.log(moment().diff(t, 'second'));

    return res;
  };

  const second = moment();

  const str = await toBuffer(data);

  console.log(moment().diff(second, 'second'));

  console.log(str.length);
  // ws.write(str);
  ws.end();
})();

// ws.write(jsonStr(data));

export default app;
