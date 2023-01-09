import LocalDatabase from 'local_database';

LocalDatabase.init();

const localDB = LocalDatabase.go();
export default localDB;
