import { ensureDirSync } from 'fs-extra';
import { join } from 'path';
import LocalDatabase from './local_database';
import Table from './table';
import { DefineDatabaseAttributesType } from './types/database_type';

class Database {
  private attributes?: DefineDatabaseAttributesType;
  private localDB: LocalDatabase;
  public NAME: string;

  constructor(
    localDB: LocalDatabase,
    name: string,
    attr?: DefineDatabaseAttributesType,
    option?: object
  ) {
    this.attributes = attr;
    this.localDB = localDB;
    this.NAME = name;
  }

  init(): void {
    ensureDirSync(join(this.getPath()));
  }

  defineTable(name: string): Table {
    const table = new Table(this.localDB, this, name);

    return table;
  }

  getPath(): string {
    return join(this.localDB.getPath(), this.NAME);
  }
}

export default Database;
