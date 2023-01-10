import LocalDatabase from 'local_database';

LocalDatabase.init();

const localDB = LocalDatabase.start();
export default localDB;
