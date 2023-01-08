import app from 'app';
import { map, each } from 'async';
import config from 'config';
import {
  createReadStream,
  createWriteStream,
  fstat,
  readdirSync,
  write,
} from 'fs';
import { ensureFileSync, copyFileSync, unlinkSync } from 'fs-extra';
import { isPlainObject, last, random } from 'lodash';
import moment from 'moment';
import { resolve } from 'path';
import through from 'through';
import { jsonParse, jsonStr } from 'utils/json';
import { v4 as uuid } from 'uuid';
import Parse from 'jsonparse';
import { readLine, writeLine } from 'lei-stream';
import User from 'model/user.model';

const parse = new Parse();

const { APP_PORT } = config;

User.create({});

// app.listen(APP_PORT, () => {
//   console.log(`\x1B[32mhttp://localhost:${APP_PORT}`);
// });

// const path = resolve('./database/test/testTable.json');
// const tempDataPath = resolve('./database/test/testTable.temp.json');
// ensureFileSync(path);
// ensureFileSync(tempDataPath);

// // const read = readLine(createReadStream(path));

// const ws = writeLine(createWriteStream(tempDataPath), {
//   cacheLines: 10000,
// });
// const ws2 = writeLine(createWriteStream(path), {
//   cacheLines: 10000,
// });

// let index = 0;

// const tt = moment();

// read.on('data', (value) => {
//   index++;

//   index % 1000 === 0 && console.log(index);
//   read.next();
// });

// read.on('end', () => {
//   console.log('end', moment().diff(tt, 'second'));
//   // const rs = createReadStream(tempDataPath);
//   // const tempWs = createWriteStream(path);
//   // const t = moment();
//   // rs.on('close', () => [console.log(moment().diff(t, 'second'))]);
//   // rs.pipe(tempWs);
//   // tempWs.on('close', () => {
//   //   unlinkSync(tempDataPath);
//   // });
//   // ws.end();
// });
// (async () => {
//   const t = moment();
//   await map(Array.from({ length: 20000 }), async (v, callback) => {
//     const obj: {
//       [props: string]: string;
//     } = {};
//     await map(Array.from({ length: 50 }), (v, callback) => {
//       const id = uuid();
//       obj[id] = id;
//       callback();
//     });
//     ws.write(jsonStr(obj));
//     ws2.write(jsonStr(obj));
//     callback();
//   });
//   ws.end();
//   console.log('end', moment().diff(t, 'second'));
// })();

// const arr: Buffer[] = [];

// let time = moment();

// // rs.on('open', () => {
// //   time = moment();
// // });

// rs.on('data', (chunk) => {
//   arr.push(chunk as Buffer);
//   parse.write(chunk);
// });

// rs.on('end', async () => {
//   console.log(moment().diff(time, 'second'));
//   return;
//   const t = moment();
//   const res = jsonParse(Buffer.concat(arr).toString()) as { id: string }[];
//   console.log(moment().diff(t, 'second'));
//   let bufArr: Buffer[] = [];
//   await each(res, (value, callback) => {
//     bufArr.push(Buffer.from(jsonStr(value) + ','));
//     callback();
//   });
//   Buffer.concat([Buffer.from('['), ...bufArr, Buffer.from(']')]);

//   // ws.write(Buffer.concat([Buffer.from('['), ...bufArr, Buffer.from(']')]));
//   // ws.end();
// });

// rs.on('close', () => {
//   console.log('rs: end');
// });

// ws.on('close', () => {
//   // unlinkSync(tempDataPath);
//   console.log('ws: end');
// });

// parse.onValue = (value) => {
//   if (isPlainObject(value)) {
//     let res;

//     Object.keys(value).forEach((key) => {
//       if (key === '25c4486d-c0fd-42f9-8cba-5daf6b64e300') {
//         res = key;
//       }
//     });

//     // console.log(res);
//     // rs.destroy();
//   }
// };

// ws.on('open', () => {
//   console.log('open');
// });

// ws.on('close', () => {
//   console.log('close');
// });

// const id = uuid();

// (async () => {
//   const startDate = moment();
//   const data = await map(Array.from({ length: 1000000 }), (value, callback) => {
//     const obj: {
//       [props: string]: string;
//     } = {};
//     Array.from({ length: 1 }).forEach((v, index) => {
//       obj[String(index)] = id;
//     });
//     callback(null, obj);
//   });

//   console.log(moment().diff(startDate, 'second'));
//   let count = 0;
//   const toBuffer = async (
//     data: unknown[] | { [props: string]: unknown }
//   ): Promise<Buffer> => {
//     const objectData = data as { [props: string]: unknown };
//     const arrayData = data as unknown[];
//     const finalData = isPlainObject(data)
//       ? await map(Object.keys(objectData as object), (key, callback) => {
//           callback(null, [key, objectData[key]]);
//         })
//       : arrayData;
//     let res = Buffer.from('');

//     const t = moment();

//     await each(finalData, async (value, callback) => {
//       let buffer = Buffer.from('');

//       try {
//         buffer = Buffer.from(jsonStr(value));
//       } catch (err) {
//         buffer = Buffer.from(
//           await toBuffer(value as { [props: string]: unknown })
//         );
//       }
//       res = Buffer.concat([res, buffer]);
//       count++;

//       count % 500 === 0 && console.log(count);
//       callback(null);
//     });

//     // console.log(moment().diff(t, 'second'));

//     return res;
//   };

//   const second = moment();

//   // const str = await toBuffer(data);

//   console.log(moment().diff(second, 'second'));

//   // console.log(str.length);
//   // ws.write(str);
//   ws.end();
// })();

// ws.write(jsonStr(data));

export default app;
