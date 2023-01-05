import Database from './database';
import LocalDatabase from './local_database';
import {
  ensureFileSync,
  readJsonSync,
  writeJson,
  writeJsonSync,
} from 'fs-extra';
import { join } from 'path';
import { chunk, isEmpty } from 'lodash';
import { MAX_SIMULTANEOUS_WRITE_NUMBER } from './common/constant';

class Table {
  public NAME: string;
  public localDB: LocalDatabase;
  public database: Database;
  private tempData: unknown[];
  constructor(localDB: LocalDatabase, database: Database, name: string) {
    this.NAME = name;
    this.localDB = localDB;
    this.database = database;

    const path = this.getPath();

    ensureFileSync(path);
    let data = readJsonSync(path, { throws: false });

    if (isEmpty(data)) {
      data = Array.from({ length: 1000000 }).map(() => {
        const obj: {
          [props: string]: number;
        } = {};

        Array.from({ length: 50 }).forEach((_, index) => {
          obj[String(index)] = index;
        });

        return obj;
      });

      writeJsonSync(path, data);
    }

    this.tempData = data;

    console.log(this.tempData.length);
  }

  getPath(): string {
    return join(this.database.getPath(), `${this.NAME}.json`);
  }
}

export default Table;
