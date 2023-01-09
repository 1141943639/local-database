import { join, resolve } from 'path';
import { LocalDatabaseOptionType } from 'local_database/types/local_database_type';
import {
  MAX_SIMULTANEOUS_WRITE_NUMBER,
  ROOT_FOLDER_NAME,
} from './common/constant';
import Database from './database';
import { ensureDirSync, remove } from 'fs-extra';
import { DefineDatabaseAttributesType } from './types/database_type';
import moment from 'moment';
import ReadWrite from './read_write';
import { v4 as uuid } from 'uuid';

class LocalDatabase {
  static ROOT_PATH = resolve('./');
  static ROOT_FOLDER_NAME = ROOT_FOLDER_NAME;
  // TODO  需要维护数据库配置项, 每次init都重新加载配置项
  static ROOT_CONFIG_FOLDER = 'database_config';

  static MAX_ROWS: number = 0;
  static option?: LocalDatabaseOptionType;
  private constructor() {}

  static init(option?: LocalDatabaseOptionType): LocalDatabase {
    ensureDirSync(join(this.getFolderPath()));

    this.option = option;

    return this;
  }

  static async go(): Promise<void> {
    await this.checkMaxRows();
  }

  static async checkMaxRows(): Promise<void> {
    let diffMillisecond = 0;
    // 1MB
    const unit = 1024 * 1024;
    const maxRowArr: number[] = [];
    let count = 0;

    while (count < 10) {
      const readwrite = new ReadWrite(this.getFolderPath());
      await readwrite.add([
        Array.from({
          length: unit,
        })
          .map(() => 'a')
          .join(''),
      ]);

      const startTime = moment();

      await readwrite.read();

      diffMillisecond = moment().diff(startTime);

      maxRowArr.push(Math.floor(((500 / diffMillisecond) * unit) / 1000));

      const newCreatedFilePath = readwrite.readDir()[0];

      newCreatedFilePath &&
        (await remove(join(this.getFolderPath(), newCreatedFilePath)));
      count++;
    }

    this.MAX_ROWS = Math.floor(
      maxRowArr.reduce((pre, v) => pre + v, 0) / maxRowArr.length
    );
  }

  static defineDatabase(
    name: string,
    attributes?: DefineDatabaseAttributesType
  ): Database {
    const database = new Database(name, attributes);

    database.init();

    return database;
  }

  static getFolderPath(): string {
    return join(this.ROOT_PATH, this.ROOT_FOLDER_NAME);
  }
}

export default LocalDatabase;
