import { ensureDirSync } from 'fs-extra';
import { join } from 'path';
import LocalDatabase from './local_database';
import Table from './table';
import { DefineDatabaseAttributesType } from './types/database_type';

class Database {
  private attributes?: DefineDatabaseAttributesType;
  public NAME: string;

  constructor(
    name: string,
    attr?: DefineDatabaseAttributesType,
    option?: object
  ) {
    this.attributes = attr;
    this.NAME = name;
  }

  init(): void {
    ensureDirSync(join(this.getPath()));
  }

  defineTable(name: string): Table {
    const table = new Table(this, name);

    return table;
  }

  getPath(): string {
    return join(LocalDatabase.getFolderPath(), this.NAME);
  }
}

export default Database;
