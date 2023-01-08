import Database from './database';
import LocalDatabase from './local_database';
import { join, resolve } from 'path';
import { isArray, isPlainObject } from 'lodash';
import ReadWrite from './read_write';
import { v4 as uuid } from 'uuid';
import { fork } from 'child_process';

class Table<T = unknown> {
  public NAME: string;
  public localDB: LocalDatabase;
  public database: Database;
  constructor(localDB: LocalDatabase, database: Database, name: string) {
    this.NAME = name;
    this.localDB = localDB;
    this.database = database;
  }

  getFolderPath(): string {
    return join(this.database.getPath(), `${this.NAME}`);
  }

  create(data: T | T[]): Table<T> {
    const objData = data as T;
    const arrData = data as T[];
    const finalData = (() => {
      if (isPlainObject(objData)) {
        return [objData];
      } else if (isArray(arrData)) {
        return arrData;
      }
    })();

    if (!finalData) return this;

    const readWrite = new ReadWrite<{
      [props: string]: string;
    }>(this.getFolderPath());

    // readWrite.read();

    // readWrite.add(
    //   Array.from({
    //     length: 100000,
    //   }).map(() => {
    //     const obj: { [props: string]: string } = {};

    //     Array.from({ length: 20 }).forEach((v, index) => {
    //       obj[`user_name_${index}`] = uuid();
    //     });

    //     return obj;
    //   })
    // );

    return this;
  }
}

export default Table;
