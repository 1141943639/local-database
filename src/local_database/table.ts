import Database from './database';
import LocalDatabase from './local_database';
import { join, resolve } from 'path';
import { isArray, isPlainObject } from 'lodash';
import ReadWrite from './read_write';
import { v4 as uuid } from 'uuid';
import { fork } from 'child_process';

class Table<T = unknown> {
  public NAME: string;
  public database: Database;
  constructor(database: Database, name: string) {
    this.NAME = name;
    this.database = database;
  }

  getFolderPath(): string {
    return join(this.database.getPath(), `${this.NAME}`);
  }

  async create(data: T | T[]): Promise<T | T[] | false> {
    const objData = data as T;
    const arrData = data as T[];
    const finalData = (() => {
      if (isPlainObject(objData)) {
        return [objData];
      } else if (isArray(arrData)) {
        return arrData;
      }
    })();

    if (!finalData) return false;

    const readWrite = new ReadWrite<typeof objData>(this.getFolderPath());

    await readWrite.read();
    // readWrite.read();

    // return readWrite.add(finalData);
    return [];
  }
}

export default Table;
