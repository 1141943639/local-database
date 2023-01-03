import { resolve } from 'path';
import { LocalDatabasePropsType } from 'types/local_database/local_database_type';
import { ROOT_FOLDER_NAME } from './common/constant';
import Database from './database';

class LocalDatabase {
  public ROOT_PATH = resolve('./');
  public ROOT_FOLDER_NAME = ROOT_FOLDER_NAME;
  private props?: LocalDatabasePropsType;
  constructor(props?: LocalDatabasePropsType) {
    this.props = props;
  }

  async init(): Promise<void> {
    this.props?.rootFolderName &&
      (this.ROOT_FOLDER_NAME = this.props?.rootFolderName);
  }

  define(): Database {
    return new Database(this);
  }
}

export default LocalDatabase;
