import LocalDatabase from './local_database';

class Database {
  constructor(localDatabase: LocalDatabase) {
    console.log(localDatabase.ROOT_FOLDER_NAME);
  }
}

export default Database;
