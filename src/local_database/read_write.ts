import {
  ensureFileSync,
  createReadStream,
  ensureDirSync,
  ensureLink,
} from 'fs-extra';
import { join } from 'path';
import {
  cloneDeep,
  find,
  isArray,
  isEmpty,
  isFunction,
  last,
  omit,
  orderBy,
} from 'lodash';
import { readLine } from 'lei-stream';
import { jsonParse, jsonStr } from 'utils/json';
import {
  createWriteStream,
  readdirSync,
  readFile,
  stat,
  Stats,
  unlink,
} from 'fs';
import { each } from 'async';
import { FileDetailType, ReadOptionType } from './types/read_write_type';
import { FILE_FLAG } from './common/enum';
import HandleFile from './utils/handle_file';
import moment from 'moment';
import fsWrap from './utils/fs_wrap';
import es from 'event-stream';
import LocalDatabase from './local_database';

export default class ReadWrite<T> {
  FOLDER_PATH: string;
  ALL_FILES: FileDetailType<T>[] = [];
  MAX_ROWS = 5000;

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
    return readdirSync(this.FOLDER_PATH).filter((val) => /.json$/.test(val));
  }

  read = async (option?: ReadOptionType<T>): Promise<T[]> => {
    const { callback, fileNames } = option || {};
    const time = moment();
    const fileNameArr = (fileNames || this.readDir()).filter((val) => val);
    const filesPathArr = fileNameArr
      .filter((val) => !val.includes('temp'))
      .map((val) => join(this.FOLDER_PATH, val));
    const allData: T[] = [];

    await each(filesPathArr, async (path, cb) => {
      let detail = find(this.ALL_FILES, { path });
      const cbOption = {
        path,
      };

      if (!detail) {
        const obj = this.getDefaultFileDetail({
          path,
        });
        this.ALL_FILES?.push(obj);
        detail = obj;
      }

      (await fsWrap<[Buffer]>((cb) => readFile(path, cb)))
        .toString()
        .split('\n')
        .forEach((str) => {
          const data: T | undefined = jsonParse(str);

          if (!data) return;

          if (isFunction(callback)) {
            const isMatch = callback?.(data, cbOption);
            if (isMatch) {
              detail?.data.push(data);
            }
          }

          allData.push(data);

          (detail?.lines || detail?.lines === 0) && detail.lines++;
          (detail?.length || detail?.length === 0) &&
            (detail.length += str.length);
        });

      cb();
    });
    console.log('读取总时长', moment().diff(time) / 1000, '秒');
    await this._GC();
    return allData;
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

  getMaxRows(): number {
    return LocalDatabase.MAX_ROWS;
  }

  async add(data: T[] | T): Promise<T[] | T> {
    const time = moment();
    ensureDirSync(this.FOLDER_PATH);
    const lastFile = last(orderBy(this.readDir()));

    await this.read({
      fileNames: [lastFile as string],
    });
    const lastFileDetail = last(orderBy(this.ALL_FILES, 'path'));
    const finalData = isArray(data) ? (data as T[]) : [data as T];
    const maxRows = this.getMaxRows();

    console.log(maxRows);

    const getFileDetail = () => {
      let count = finalData.length;
      let fileList = [lastFileDetail].filter((val) => {
        if (!val) return false;
        if (!maxRows) return true;
        return val.lines < maxRows;
      });
      const arr: FileDetailType<T>[] = [];

      while (count) {
        if (isEmpty(fileList) && count) {
          fileList.push(this.addNewChunk());
        }
        const detail = fileList[0] as FileDetailType<T>;
        const remainingLines = maxRows && maxRows - detail.lines;
        const { dataCount, newCount } = (() => {
          if (!maxRows)
            return {
              dataCount: count,
              newCount: 0,
            };

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

      await fsWrap((cb) => ws.end(cb));

      console.log('单个文件写入时长', moment().diff(t, 'second'));
      callback();
    });

    console.log('写入总时长', moment().diff(time, 'second'));

    return data;
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
