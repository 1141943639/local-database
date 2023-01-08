import { ensureFileSync, createReadStream, ensureDirSync } from 'fs-extra';
import { join } from 'path';
import { cloneDeep, find, isArray, isEmpty, last, omit, orderBy } from 'lodash';
import { readLine } from 'lei-stream';
import { jsonParse, jsonStr } from 'utils/json';
import { createWriteStream, readdirSync, stat, Stats, unlink } from 'fs';
import { each } from 'async';
import { FileDetailType, ReadOptionType } from './types/read_write_type';
import { FILE_FLAG } from './common/enum';
import HandleFile from './utils/handle_file';
import moment from 'moment';
import fsWrap from './utils/fs_wrap';
import es from 'event-stream';

export default class ReadWrite<T> {
  FOLDER_PATH: string;
  ALL_FILES: FileDetailType<T>[] = [];
  MAX_ROW = 200000;

  constructor(folderPath: string) {
    this.FOLDER_PATH = folderPath;
  }

  getDefaultFileDetail(
    defaultValue?: Partial<FileDetailType<T>>
  ): FileDetailType<T> {
    return cloneDeep({
      path: '',
      data: [],
      lines: 0,
      length: 0,
      ...defaultValue,
    });
  }

  readDir(): string[] {
    ensureDirSync(this.FOLDER_PATH);
    return readdirSync(this.FOLDER_PATH);
  }

  read = async (option?: ReadOptionType<T>): Promise<void> => {
    const { callback, fileNames } = option || {};
    const time = moment();
    const fileNameArr = (fileNames || this.readDir()).filter((val) => val);
    const filesPath = fileNameArr
      .filter((val) => !val.includes('temp'))
      .map((val) => join(this.FOLDER_PATH, val));
    const allRs: unknown[] = [];
    const detailArr: FileDetailType<T>[] = [];

    await each(filesPath, (path, close) => {
      const t = moment();
      const read = createReadStream(path);
      let detail = find(this.ALL_FILES, { path });
      const cbOption = {
        path,
      };

      allRs.push(read);

      if (!detail) {
        const obj = this.getDefaultFileDetail({
          path,
        });
        this.ALL_FILES?.push(obj);
        detail = obj;
      }

      read.pipe(es.split('\n')).pipe(
        es.map((str: string, cb) => {
          const data: T | undefined = jsonParse(str);

          if (data) {
            let count = 0;
            Object.keys(data).forEach(() => count++);
            cloneDeep(data);

            const isMatch = callback?.(data, cbOption);
            if (isMatch && data) {
              detail?.data.push(data);
            }

            (detail?.lines || detail?.lines === 0) && detail.lines++;
            (detail?.length || detail?.length === 0) &&
              (detail.length += str.length);
          }
          cb();
        })
      );

      read.on('end', () => {
        console.log('单份文件读取时长', moment().diff(t, 'second'), path);
        detail && detailArr.push(detail);
        close();
      });

      read.on('error', (err) => {
        console.error(err);
        close();
      });
    });
    console.log('读取总时长', moment().diff(time, 'second'));
    await this._GC();
  };

  getMinLinesFiles(): FileDetailType<T> {
    return this.getFilesDetailByAscOrder()[0];
  }

  getFilesDetailByAscOrder(): FileDetailType<T>[] {
    return orderBy(this.ALL_FILES, 'lines');
  }

  getNewFileName(): string {
    return `table_${this.readDir().length + 1}.json`;
  }

  addNewChunk(): FileDetailType<T> {
    const path = join(this.FOLDER_PATH, this.getNewFileName());
    ensureFileSync(path);
    const newFile = this.getDefaultFileDetail({
      path,
    });

    this.ALL_FILES.push(newFile);

    return newFile;
  }

  genTempFile(path: string): string {
    const newPath = path.replace(/(.json)$/, '.temp$1');
    ensureFileSync(newPath);
    return newPath;
  }

  async dataToString(
    data: T[],
    callback?: (str: string) => void | Promise<void>
  ): Promise<void> {
    await each(data, async (value, done) => {
      await callback?.(jsonStr(value));
      done();
    });
  }

  async add(data: T[] | T): Promise<void> {
    const time = moment();
    ensureDirSync(this.FOLDER_PATH);
    const lastFile = last(orderBy(this.readDir()));

    await this.read({
      fileNames: [lastFile as string],
    });
    const lastFileDetail = last(orderBy(this.ALL_FILES, 'path'));
    const finalData = isArray(data) ? (data as T[]) : [data as T];

    const getFileDetail = () => {
      let count = finalData.length;
      let fileList = [lastFileDetail].filter(
        (val) => val && val.lines < this.MAX_ROW
      );
      const arr: FileDetailType<T>[] = [];

      while (count) {
        if (isEmpty(fileList) && count) {
          fileList.push(this.addNewChunk());
        }
        const detail = fileList[0] as FileDetailType<T>;
        const remainingLines = this.MAX_ROW - detail.lines;
        const { dataCount, newCount } = (() => {
          if (remainingLines < count) {
            return {
              dataCount: remainingLines,
              newCount: count - remainingLines,
            };
          } else {
            return {
              dataCount: count,
              newCount: 0,
            };
          }
        })();

        arr.push({
          data: finalData.splice(0, dataCount),
          ...omit(detail, 'data'),
        });
        fileList.splice(0, 1);
        count = newCount;
      }

      return arr;
    };
    let fileDetail = getFileDetail();

    await each(fileDetail, async (option, callback) => {
      const t = moment();
      const ws = createWriteStream(option.path, {
        flags: FILE_FLAG.READ_APPEND,
      });

      await this.dataToString(option.data, async (str) => {
        ws.write(str + '\n');
      });

      ws.end();

      console.log(moment().diff(t, 'second'));
      callback();

      // const tempPath = this.genTempFile(option.path);
      // const rs = readLine(createReadStream(option.path));
      // const tempWs = writeLine(createWriteStream(option.path));

      // rs.on('data', (chunk) => {
      //   tempWs.write(chunk);
      //   rs.next();
      // });

      // await new Promise((resolve): void => {
      //   rs.on('end', async () => {
      //     await this.dataToString(option.data, (str) => {
      //       tempWs.write(str);
      //     });
      //     tempWs.end();
      //     resolve(undefined);
      //   });
      // });

      // tempWs.end();

      // const tempRs = createReadStream(tempPath);
      // const ws = createWriteStream(option.path);

      // setTimeout(() => {
      //   tempRs.pipe(ws);
      // }, 1000);
      // tempRs.on('close', clearAll);
    });

    console.log('写入总时长', moment().diff(time, 'second'));
  }

  async _GC(): Promise<void> {
    const fileNameArr = this.readDir();

    await each(fileNameArr, async (name, callback) => {
      const path = join(this.FOLDER_PATH, name);
      const [stats] = await fsWrap<[Stats]>((callback) => stat(path, callback));

      !stats.size && (await fsWrap((callback) => unlink(path, callback)));
      callback();
    });
  }
}
