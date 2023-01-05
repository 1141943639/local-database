import { join, resolve } from 'path';
import { LocalDatabaseOptionType } from 'local_database/types/local_database_type';
import {
  MAX_SIMULTANEOUS_WRITE_NUMBER,
  ROOT_FOLDER_NAME,
} from './common/constant';
import Database from './database';
import { ensureDirSync } from 'fs-extra';
import { DefineDatabaseAttributesType } from './types/database_type';

class LocalDatabase {
  public ROOT_PATH = resolve('./');
  public ROOT_FOLDER_NAME = ROOT_FOLDER_NAME;
  public option?: LocalDatabaseOptionType;
  constructor(option?: LocalDatabaseOptionType) {
    this.option = {
      maxSimultaneousWriteNumber: MAX_SIMULTANEOUS_WRITE_NUMBER,
      ...option,
    };
  }

  async init(): Promise<void> {
    ensureDirSync(join(this.getPath()));
  }

  defineDatabase(
    name: string,
    attributes?: DefineDatabaseAttributesType
  ): Database {
    const database = new Database(this, name, attributes);

    database.init();

    return database;
  }

  getPath(): string {
    return join(this.ROOT_PATH, this.ROOT_FOLDER_NAME);
  }
}

export default LocalDatabase;
